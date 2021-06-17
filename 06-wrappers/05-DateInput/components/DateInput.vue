<template>
  <app-input
    v-bind="$attrs"
    v-on="localListeners"
    :type="type"
    @change="changeMethod"
    :value="localValue"
  ><slot></slot></app-input>
</template>

<script>
import AppInput from './AppInput';

export default {
  name: 'DateInput',
  inheritAttrs: false,

  components: { AppInput },

  model: {
    prop: 'value',
    event: 'change',
  },

  props: {
    type: {
      type: String,
      default: 'date',
    },

    value: {
      type: [Number, Date, String],
    }
  },

  computed: {
    localListeners() {
      let listeners = { ...this.$listeners }

      for(let key in listeners) {
        if (key === 'input' || key === 'change') {
          delete listeners[key]
        }
      }
      return listeners
    },

    localValue() {
      let date;

      if (typeof this.value === 'string') {
        return this.value
      } else if (typeof this.value === 'number') {
        date = new Date(this.value)
      } else if (this.value instanceof Date){
        date = this.value
      }

      if (this.type === 'date' || this.type === 'datetime-local') {
        return date.toISOString().slice(0, 10)
      } else if (this.type === 'time') {
        let seconds = date.getUTCSeconds()

        if (this.$attrs.step) {
          seconds += Number(this.$attrs.step)
        }
        return date.getUTCHours() + ':' + date.getUTCMinutes() + ':' + seconds
      }

      return this.value
    },
  },

  mounted() {

  },

  methods: {
    changeMethod(event) {
      this.$emit('change', event.target.value)
    },
  },

};
</script>
