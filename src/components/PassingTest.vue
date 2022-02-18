<template>
  <div
      v-if="question && testTimeLimit"
      class="test-container" >
  <TestProgressBar
      :questions="currentTest.questions"
      :question-position="questionPosition"
      :seconds-left="testTimeLimit"
      @showQuestionByPosition="showQuestionByPosition"
    />

  <Block1 v-if="questionPosition === 0 || questionPosition === 1 || questionPosition === 2 "/>
  <Block2 v-if="questionPosition === 3"/>
  <Block3 v-if="questionPosition === 4 || questionPosition === 5 || questionPosition === 6"/>
  <Block4 v-if="questionPosition === 7 || questionPosition === 8 || questionPosition === 9"/>
  <Block5 v-if="questionPosition === 10 || questionPosition === 11"/>

  <div class="test-question" v-html="question.question"></div>
<!--    TODO: вынести в компонент радио батана-->
    <div
        class="app-radio"
        v-for="answer in question.answers"
        :key="answer.id">
      <label>
        <input
            type="radio"
            v-model="question.selected_answer"
            :id="answer.id"
            :value="answer.id"/>
        <i></i>

        <span>{{ answer.name }}</span>
      </label>
    </div>

  <TestFooter
      :has-go-left-button="questionPosition > 0"
      :has-go-right-button="questionPosition < currentTest.questions.length - 1"
      :has-complete-button="questionPosition === currentTest.questions.length - 1 && !!question.selected_answer"
      @goLeft="goLeft"
      @goRight="goRight"
      @complete="complete"
  />
  </div>
</template>

<script>
import { cloneDeep, find } from 'lodash';
import { test } from '../assets/data/testData';
import TestFooter from './TestFooter.vue';
import TestProgressBar from './TestProgressBar.vue';
import Block1 from './Block1.vue';
import Block2 from './Block2.vue';
import Block3 from './Block3.vue';
import Block4 from './Block4.vue';
import Block5 from './Block5.vue';
import moment from 'moment';
import axios from 'axios';

export default {
  name: 'passing-test',

  test,

  components: {
    TestProgressBar,
    TestFooter,
    Block1,
    Block2,
    Block3,
    Block4,
    Block5,
  },

  data: () => ({
    currentTest: null,
    question: null,
    questionPosition: null,

    timerId: 0,
    testTimeLimit: null,
  }),

  computed: {
    axiosHeader() {
      return {
        Authorization: localStorage.getItem('access_token_type') + " " + localStorage.getItem('access_token'),
        Accept: "application/json"
      };
    }
  },

  watch: {
    currentTest: {
      deep: true,
      handler() {
        // сохраняем статистику только если тест уже запущен, при любых изменениях ответов пользователя
        if (this.testTimeLimit) {
          this.saveResultTest();
        }
      }
    }
  },

  mounted() {
    this.currentTest = cloneDeep(this.$options.test);

    this.startTest();
    this.showQuestionByPosition(0);
  },

  methods: {
    async startTest() {
      try {
     /*   await axios.post(`/test/start`, {
              start_time: moment().format('YYYY-MM-DD HH:mm:ss'),
            }, { headers: this.axiosHeader }
        );*/
        // если первый раз проходим тест, то запускаем таймер с текущем временем
        this.stopTimer(moment());
      } catch (error) {
        if (error.response.status === 400) {
          // если тест уже был запущен, тогда запрашиваем статистику из уже начатого теста
          await this.setSelectedAnswers();
        }
      }
    },

    async saveResultTest() {
      try {
       /* await axios.post(`/test/result`, {
              test_answers: JSON.stringify(this.getTestAnswers()),
              test_result: this.getTestScores(),
              test_time: this.currentTest.time * 60 - this.testTimeLimit,
            }, { headers: this.axiosHeader }
        )*/
      } catch (e) {
        console.log(e);
      }
    },

    async setSelectedAnswers() {
      const response = await axios.get(`/test/status`, {
        headers: this.axiosHeader
      });
      const startTime = response.data.start_time;
      const isFinished = response.data.is_finished !== undefined ? response.data.is_finished === 1 : false;
      if (moment().diff(moment(startTime).subtract(1, 's'), 's') < this.currentTest.time * 60 && !isFinished) {
        // если тест уже запущен - заполняем тест сохраненными результатами
        const testAnswers = JSON.parse(response.data.test_answers);
        if (testAnswers) {
          this.currentTest.questions.forEach(question => {
            const answer = testAnswers[question.id];
            if (answer) {
              question.selected_answer = answer;
            }
          })
        }

        // и запускаем тест исходя из даты начала теста
        this.stopTimer(moment(startTime));
      } else {
        await this.$router.push({ name: 'expired-test' });
      }
    },

    getTestAnswers() {
      const answers = {};
      this.currentTest.questions.forEach(question => {
        if (question.selected_answer) {
          answers[question.id] = question.selected_answer;
        }
      })
      return answers;
    },

    getTestScores() {
      let scores = 0;
      this.currentTest.questions.forEach(question => {
        if (question.selected_answer === find(question.answers, answer => answer.correct).id) {
         scores += question.score;
        }
      })
      return scores;
    },

    showQuestionByPosition(index) {
      this.question = this.currentTest.questions[index];
      this.questionPosition = index;

      window.scrollTo(0, 0);
    },

    goLeft() {
      this.showQuestionByPosition(this.questionPosition - 1);
    },

    goRight() {
      this.showQuestionByPosition(this.questionPosition + 1);
    },

    async complete() {
      await this.saveResultTest();
      await this.$router.push({ name: 'result-test'});
    },

    stopTimer(startTime) {
      // устанавливаем текущее время и время завершения теста
      const testFinishTime = startTime.add(this.currentTest.time , 'm');

      this.testTimeLimit = this.currentTest.time * 60;
      if (this.testTimeLimit > 0) {
        this.timerId = setInterval(() => {
          this.testTimeLimit -= 1;

          // вычисляем оставшееся время в секундах через текущую дату и дату окончания таймера
          const realTimerResidue = testFinishTime.diff(moment().subtract(1, 's'), 's');

          // если таймер в шапке не совпадает с реальным оставшимся временем, то перезаписываем его и считаем дальше
          // такое возможно при сворачивании вкладки
          if (this.testTimeLimit !== realTimerResidue) {
            this.testTimeLimit = realTimerResidue;
          }

          if (this.testTimeLimit <= 0 || moment().isAfter(testFinishTime)) {
            clearInterval(this.timerId);
            this.timerId = 0;
            this.timeIsOver();
          }
        }, 1000);
      }
    },

    async timeIsOver() {
      await this.saveResultTest();
      await this.$router.push({ name: 'expired-test'});
    },
  }
}
</script>

<style lang="scss">
.test-question {
  font-style: normal;
  font-weight: normal;
  font-size: 18px;
  line-height: 27px;
  letter-spacing: -0.005em;
  margin-bottom: 48px;

  p {
    padding: 0;
    margin: 0;
  }
}

@media screen and (max-width: 768px) {
  .test-question {
    margin-bottom: 32px;
  }
}

.app-radio {
  position: relative;

  input[type='radio'] {
    display: none;

    &:checked ~ i {
      border-color: var(--primary);

      &:before {
        content: '';
        position: absolute;
        width: 18px;
        height: 18px;
        background: var(--primary);
        border-radius: 50%;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
      }
    }

    &:disabled ~ &:hover {
      cursor: auto;

      i {
        border-color: black;
      }
    }
  }

  label {
    display: flex;
    align-items: center;
    cursor: pointer;
    user-select: none;
    /*    flex-wrap: wrap;*/
    margin: 0 0 48px;

    i {
      display: flex;
      align-items: center;
      justify-content: center;
      position: relative;

      width: 32px;
      height: 32px;
      top: 0;

      background: white;
      border: 1px solid black;
      border-radius: 50%;
      margin-right: 16px;
      text-align: center;
    }

    span {
      font-size: 16px;
      line-height: 22px;
      letter-spacing: -0.005em;
      display: inline-block;
      width: calc(100% - 50px);
      word-break: break-word;
    }

    &:hover {
      i {
        border-color: var(--primary);
      }
    }
  }
}

@media screen and (max-width: 768px) {
  .app-radio label {
    margin-bottom: 24px;
  }
}

ol {
  li {
    list-style: auto;
    margin-top: 4px;

    &:before {
      display: none;
    }
  }
}
</style>