<template>
  <div class="test-container">
    <div class="test-header">
      <img src="../assets/images/break-out-new-logo.svg" class="logo" alt="">
    </div>
    <div class="test-modal">
      <img src="../assets/images/check.svg" alt="check">
      <p>Спасибо за прохождение теста!
      </p>
      <p>
        Ты только что завершил тест. Поздравляем с его окончанием и благодарим за участие. <br>
        Ответы уже проверены и ждут тебя в личном кабинете.
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
  name: 'result-test',

  components: {
    AppButton,
  },
}
</script>