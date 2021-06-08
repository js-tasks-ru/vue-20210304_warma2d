<template>
  <div
    class="input-group"
    :class="{ 'input-group_icon ': hasIcon, 'input-group_icon-left': hasLeftIcon, 'input-group_icon-right': hasRightIcon }"
  >
    <slot class="icon" name="left-icon"></slot>

    <component
      v-bind="$attrs"
      v-on="$listeners"
      :is="multiline ? 'textarea' : 'input'"
      class="form-control"
      :class="{ 'form-control_sm': small, 'form-control_rounded': rounded }"
      :value.prop="valueWithSetter"
      ref="input"
    ></component>

    <slot class="icon" name="right-icon"></slot>
  </div>
</template>

<script>
export default {
  name: 'AppInput',
  inheritAttrs: false,

  computed: {
    hasIcon() {
      return this.hasLeftIcon || this.hasRightIcon
    },

    valueWithSetter: {
      get() {
        // Значение в модель = значение параметра модели обёртки
        return (typeof this.value === 'string') ? this.value : this.value.data
      },
      set(value) {
        // Изменение значения из модели = порождение события обновления модели обёртки
        this.$emit('input', value);
        this.$emit('change', value);
      },
    },
  },

  data() {
    return {
      hasLeftIcon: false,
      hasRightIcon: false,
    }
  },

  mounted() {
    this.hasLeftRightIcon()
  },

  methods: {
    hasLeftRightIcon() {
      this.hasLeftIcon = !!this.$slots['left-icon']
      this.hasRightIcon = !!this.$slots['right-icon']
    },
  },

  updated() {
    this.hasLeftRightIcon()
  },

  model: {
    prop: 'value',
    event: 'input',
  },

  props: {
    small: {
      type: Boolean,
    },
    rounded: {
      type: Boolean,
    },
    multiline: {
      type: Boolean,
    },
    value: {
      type: [String, InputEvent],
    },
  },

};
</script>

<style scoped>
.form-control {
  padding: 12px 16px;
  height: 52px;
  border-radius: 8px;
  border: 2px solid var(--blue-light);
  font-family: 'Nunito', sans-serif;
  font-weight: 600;
  font-size: 20px;
  line-height: 28px;
  color: var(--body-color);
  transition: 0.2s all;
  background-color: var(--white);
  outline: none;
  box-shadow: none;
}

.form-control::placeholder {
  font-weight: 400;
  color: var(--blue-2);
}

.form-control:focus {
  border-color: var(--blue);
}

textarea.form-control {
  width: 100%;
  min-height: 211px;
}

.form-control.form-control_rounded {
  border-radius: 26px;
}

.form-control.form-control_sm.form-control_rounded {
  border-radius: 22px;
}

.form-control.form-control_sm {
  padding: 8px 16px;
  height: 44px;
  border-radius: 4px;
}

.input-group {
  position: relative;
}

.input-group .form-control {
  width: 100%;
}

.input-group.input-group_icon .form-control {
  padding-left: 50px;
}

.input-group.input-group_icon .icon {
  position: absolute;
  top: 50%;
  transform: translate(0, -50%);
}

.input-group.input-group_icon.input-group_icon-left .icon:first-child {
  left: 16px;
}

.input-group.input-group_icon.input-group_icon-right .icon:last-child {
  right: 16px;
}
</style>
