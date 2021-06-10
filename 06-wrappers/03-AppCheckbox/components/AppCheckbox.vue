<template>
  <label class="checkbox">
    <input
      v-model="valueWithSetter"
      :value="value"
      v-on="localListeners"
      @change="handleChange"
      type="checkbox" />
    <slot></slot>
    <span></span>
  </label>
</template>

<script>
export default {
  name: 'AppCheckbox',
  inheritAttrs: false,

  computed: {
    valueWithSetter: {
      get() {
        //return this.value
        console.log(this.checked)
        return this.checked
      },
      set(value) {
        if (value && this.value) {
          this.$emit('change', this.value);
          //console.log(this.value)
        } else {
          this.$emit('change', value);
          //console.log(value)
        }
      },
    },

    localListeners() {
      let listeners = JSON.parse(JSON.stringify(this.$listeners))

      for(let key in listeners) {
        if (key === 'change') {
          delete listeners[key]
        }
      }
      return listeners
    },
  },

  data() {
    return {

    }
  },

  methods: {
    handleChange(event) {
      this.$emit('change', event.target.checked)
    },
  },

  model: {
    prop: 'checked',
    event: 'change',
  },

  props: {
    value: {
      type: String,
    },
  },
};
</script>

<style scoped>
.checkbox {
  display: inline-block;
  position: relative;
  padding-left: 44px;
  margin-bottom: 10px;
  text-align: left;
  cursor: pointer;
  font-size: 20px;
  line-height: 28px;
  transition: all 0.3s ease;
}

.checkbox > input {
  position: absolute;
  z-index: -1;
  opacity: 0;
  padding: 0;
}

.checkbox > a {
  text-decoration: none;
}

.checkbox > span {
  border: 2px solid var(--blue-light);
}

.checkbox > span {
  border-radius: 8px;
  background: 0 0;
  position: absolute;
  top: 0;
  left: 0;
  height: 28px;
  width: 28px;
}

.checkbox > input:checked ~ span:after {
  display: block;
}

.checkbox > span:after {
  content: '';
  position: absolute;
  display: none;
  top: 50%;
  left: 50%;
  width: 14px;
  height: 13px;
  background-image: url('~@/assets/icons/icon-check.svg');
  border: none;
  transform: translate(-50%, -50%);
}
</style>
