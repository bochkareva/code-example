<template>
  <button
      v-if="!link"
      @click="$emit('buttonClick')"
      type='button'
      :disabled="isDisabled"
      :class="classes">
    <slot/>
    {{ label }}
  </button>
  <router-link
      v-else
      :to="link"
      :disabled="isDisabled"
      :class="classes">
    {{ label }}
  </router-link>
</template>

<script>
export default {
    name: "app-button",

    props: {
        label: {
          type: String,
          default: null,
        },

        link: {
          type: Object,
          default: null,
        },

        isDisabled:  {
          type: Boolean,
          default: false,
        },

        isTextButton:  {
          type: Boolean,
          default: false,
        },
    },

    computed:{
        classes() {
            const classes = ['app-button'];

            if (this.isDisabled) {
                classes.push('app-button--disabled');
            }

            if (this.isTextButton) {
                classes.push('app-button--text-button');
            }

            return classes;
        }
    },
};
</script>


<style lang="scss">
.app-button {
  background: var(--primary);
  box-shadow: 0 0 16px rgba(0, 22, 47, 0.16);
  padding: 0 32px;
  font-style: italic;
  font-weight: normal;
  font-size: 18px;
  line-height: 25px;
  color: white;
  cursor: pointer;
  position: relative;
  text-align: center;
  text-decoration: none;
  width: max-content;
  text-transform: uppercase;
  height: 48px;
  border: none;

  display: flex;
  align-items: center;
  justify-content: center;

  &:hover {
    color: var(--hover);

    svg {
      path {
        stroke: var(--hover);
      }
    }
  }

  svg {
    margin-left: 12px;
  }

  &:disabled {
    border: none;
    cursor: not-allowed;
    background: rgba(0, 22, 47, 0.3);

    &:hover {
      border: none;
      cursor: not-allowed;
      background: var(--gray);
      color: white;
    }
  }
}

.app-button--text-button {
  background: none;
  color: var(--primary);
  box-shadow: none;
  padding: 0;

  svg {
    margin-left: 0;
    margin-right: 8px;
    fill: none;
  }
}

@media screen and (max-width: 420px) {
  .app-button {
    font-size: 14px;
    line-height: 20px;
  }
}
</style>
