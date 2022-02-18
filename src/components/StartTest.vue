<template>
  <div class="test-container test-container--margin-top">
    <div class="test-header">
      <img src="../assets/images/break-out-new-logo.svg" class="logo" alt="">
    </div>
    <div class="question question--mobile-padding" v-html="$options.test.description"></div>
    <div class="time-attempts">
      <img src="../assets/images/clock.svg" alt="Clock">
      <span> {{ $options.test.time }} минут &nbsp;·&nbsp; {{ $options.test.attempt }} попытка</span>
    </div>

    <AppButton
        label="Начать тестирование"
        :link="{ name: 'passing-test'}"/>

    <app-alarm>
      <div>
        Обязательно проходи тест на компьютере, а не на телефоне.
      </div>
      <div>
        При прохождении с мобильного возможны технические
        проблемы и некорректное отображение вопросов.
      </div>
    </app-alarm>
  </div>
</template>

<script>
import { test } from '../assets/data/testData';
import AppButton from './app/Button.vue'
import AppAlarm from './app/Alarm.vue';

export default {
  name: 'start-test',

  components: {
    AppAlarm,
    AppButton,
  },

  test,
}
</script>

<style lang="scss">
.time-attempts {
  margin-top: -32px;
  margin-bottom: 32px;
  display: flex;
  align-items: center;
  font-size: 18px;
  line-height: 27px;
  font-weight: 400;
  letter-spacing: -0.005em;

  span {
    margin-left: 8px;
  }
}
</style>