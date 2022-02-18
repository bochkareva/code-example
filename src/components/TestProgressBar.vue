<template>
  <div class="test-progress-bar">
    <div class="test-progress-bar__items test-progress-bar-items">
      <div
          v-for="(question, index) in questions" :key="index"
          @click="$emit('showQuestionByPosition', index)"
          class="test-progress-bar-items__item"
          :class="{
            'test-progress-bar-items__item--active': questionPosition === index,
            'test-progress-bar-items__item--passed': question.selected_answer,
        }">
        <div class="test-progress-bar-items__tooltip">
          <span>{{ index + 1 }}</span>
        </div>
        <div class="test-progress-bar-items__line"></div>
      </div>
    </div>
    <div class="test-progress-bar__labels">
      <div class="test-progress-bar__time-left"
           :class="{ 'test-progress-bar__time-left--time-almost-up': timeAlmostUp }">
        <span>Осталось</span> {{ timeLeft }}
      </div>
      <div class="test-progress-bar__count-of-questions">{{ questions.length }} вопросов
      </div>
    </div>
  </div>
</template>

<script>

export default {
  name: 'test-progress-bar',

  props: {
    questions: {
      type: Array,
      required: true,
    },

    questionPosition: {
      type: Number,
      required: true,
    },

    secondsLeft: {
      type: Number,
      default: -1,
    },
  },

  computed: {
    timeLeft() {
      let parseTotalSeconds = parseInt(this.secondsLeft.toString(), 10);
      if (isNaN(parseTotalSeconds)) {
        return '00:00';
      }

      const hours = Math.floor(parseTotalSeconds / 3600);
      parseTotalSeconds %= 3600;
      const minutes = Math.floor(parseTotalSeconds / 60);
      const seconds = parseTotalSeconds % 60;

      if (hours > 0) {
        return `${ String(hours).padStart(2, '0') }:${ String(minutes).padStart(2, '0') }:${ String(seconds).padStart(2, '0') }`;
      }

      return `${ String(minutes).padStart(2, '0') }:${ String(seconds).padStart(2, '0') }`;
    },

    timeAlmostUp() {
      return this.secondsLeft >= 0 && this.secondsLeft <= 30;
    },
  },
};
</script>

<style lang="scss">
.test-progress-bar {
  padding-top: 14px;
  margin-bottom: 34px;
  overflow: hidden;

  &__items {
    margin: 0 -18px 12px -18px;
  }

  &__labels {
    display: flex;
    align-items: center;
    justify-content: flex-start;
  }

  &__time-left {
    font-size: 16px;
    line-height: 22px;
    margin-right: 32px;
    width: 144px;

    span {
      color: rgba(0, 22, 47, 0.6);
      margin-right: 16px;
    }

    &--time-almost-up {
      color: red;

      span {
        color: red;
      }
    }
  }

  &__count-of-questions {
    font-size: 16px;
    line-height: 22px;
  }
}

.test-progress-bar-items {
  overflow: hidden;
  padding: 24px 12px 0 12px;

  &__item {
    float: left;
    width: 100%;
    min-width: 20px;
    max-width: 36px;
    margin: 0 5px;
    padding-top: 20px;
    position: relative;
    z-index: 2;

    &:hover, &--active {
      .test-progress-bar-items__tooltip {
        display: block;
      }

      .test-progress-bar-items__line {
        visibility: hidden;
      }
    }

    &--passed {
      .test-progress-bar-items__tooltip {
        background: var(--primary);
        box-shadow: 0 4px 16px rgba(0, 0, 0, 0.1);

        &:before {
          border-top: 10px solid var(--primary);
        }
      }

      .test-progress-bar-items__line {
        background: var(--primary);
      }
    }
  }

  &__tooltip {
    display: none;
    cursor: pointer;
    position: absolute;
    top: -22px;
    left: 0;
    width: 100%;
    height: 26px;
    z-index: 4;
    text-align: center;
    background: rgba(0, 22, 47, 0.3);

    &:before {
      content: '';
      position: absolute;
      left: 0;
      bottom: -28px;
      border: 18px solid transparent;
      border-top: 10px solid rgba(0, 22, 47, 0.3);
    }

    span {
      font-weight: 900;
      font-size: 16px;
      margin-top: 4px;
      position: relative;
      z-index: 4;
      display: inline-block;
      height: 36px;
      color: white;
    }
  }

  &__line {
    position: absolute;
    top: 50%;
    left: 0;
    right: 0;
    background: rgba(0, 22, 47, 0.3);
    height: 4px;
    margin-top: -2px;
    z-index: 3;
    cursor: pointer;
  }
}

@media screen and (max-width: 420px) {
  .test-progress-bar {
    margin-bottom: 24px;
  }

  .test-progress-bar-items__item {
    max-width: 18px;

    &:hover {
      .test-progress-bar-items__tooltip {
        display: none;
      }

      .test-progress-bar-items__line {
        visibility: visible;
      }
    }


    &--active {
      max-width: 36px;

      &:hover {
        .test-progress-bar-items__tooltip {
          display: block;
        }

        .test-progress-bar-items__line {
          visibility: hidden;
        }
      }
    }
  }

  .test-progress-bar__labels {
    justify-content: space-between;
  }
}
</style>