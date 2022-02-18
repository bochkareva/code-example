<template>
  <div class="test-footer">
    <div
        v-if="hasGoLeftButton"
        class="test-footer__left">
      <app-button
          :is-text-button="true"
          @buttonClick="$emit('goLeft')">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M15 18L9 12L15 6" stroke="#054A97" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
        Назад
      </app-button>
    </div>

    <div
        v-if="hasCompleteButton"
        class="test-footer__complete">
      <AppButton
          @buttonClick="$emit('complete')"
          label="Завершить тест"/>
    </div>

    <div
        v-if="hasGoRightButton"
        class="test-footer__right">
      <app-button
          @buttonClick="$emit('goRight')">
        Далее
        <svg width="25" height="24" viewBox="0 0 25 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M9.78943 18L15.7894 12L9.78943 6" stroke="white" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
      </app-button>
    </div>
  </div>
</template>

<script>
import AppButton from './app/Button';

export default {
  name: 'test-footer',

  components: {
    AppButton,
  },

  props: {
    hasGoLeftButton: {
      type: Boolean,
      default: false,
    },

    hasGoRightButton: {
      type: Boolean,
      default: false,
    },

    hasCompleteButton: {
      type: Boolean,
      default: false,
    },
  },
};
</script>


<style lang="scss">
.test-footer {
  position: fixed;
  bottom: 0;
  left: 0;
  width: calc(100% - 48px);
  height: 48px;
  z-index: 100;
  padding: 12px 24px;
  background: #EEF0F4;

  &__left {
    position: absolute;
    left: 24px;
  }

  &__right {
    position: absolute;
    right: 24px;

    .button {
      padding: 0 12px 0 48px;
    }
  }

  &__complete {
    position: absolute;
    left: 50%;
    transform: translate(-50%, 0);
  }
}

@media screen and (max-width: 768px) {
  .test-footer__left {
    left: 16px;
  }

  .test-footer__right {
    right: 16px;
  }

  .test-footer__complete {
    right: 16px;
    left: auto;
    transform: none;
  }
}
</style>

