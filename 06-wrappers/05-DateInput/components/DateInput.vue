<template>
  <app-input
    v-bind="localAttrs"
    v-on="localListeners"
    @change="changeMethod"
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
    localAttrs() {
      let attrs = { ...this.$attrs }
      attrs['type'] = this.type

      return attrs
    },

    localListeners() {
      let listeners = { ...this.$listeners }

      for(let key in listeners) {
        if (key === 'input' || key === 'change') {
          delete listeners[key]
        }
      }
      return listeners
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
