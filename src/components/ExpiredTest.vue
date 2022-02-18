<template>
  <div class="test-container">
    <div class="test-header">
      <img src="../assets/images/break-out-new-logo.svg" class="logo" alt="">
    </div>
    <div class="test-modal">
      <img src="../assets/images/clock.png" alt="clock">
      <p>Извини, время на тест закончилось!
      </p>
      <p>
        Благодарим тебя за участие.<br>
        Твой результат уже в личном кабинете.
      </p>
      <AppButton
          label="вернуться в личный кабинет"
          :link="{ name: 'account'}"/>
    </div>
  </div>
</template>

<script>
import AppButton from './app/Button.vue'

export default {
  name: 'expired-test',

  components: {
    AppButton,
  },
}
</script>