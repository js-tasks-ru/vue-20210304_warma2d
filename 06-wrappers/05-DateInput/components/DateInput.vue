<template>
  <app-input
    v-bind="$attrs"
    v-on="localListeners"
    :type="type"
    @input.native="changeMethod"
    :value="localValue"
  >
    <slot v-for="slot in Object.keys($slots)" :name="slot" :slot="slot"/>
  </app-input>
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

      if (typeof this.value === 'string' || !this.value) {
        return String(this.value)
      } else if (typeof this.value === 'number') {
        date = new Date(this.value)
      } else if (this.value instanceof Date){
        date = this.value
      }

      if (this.type === 'date') {

        return date.toISOString().slice(0, 10)
      } else if (this.type === 'datetime-local') {

        return date.toISOString().slice(0, 10)+'T'+this.getHhmm(date)
      } else if (this.type === 'time') {
        let seconds = date.getUTCSeconds()

        let isMultiplicity = null

        if (this.$attrs.step) {
          // seconds += Number(this.$attrs.step)
          isMultiplicity = seconds % 60 === 0;
        }
        seconds = String(seconds)
        if (seconds.length < 2) {
          seconds = '0'+seconds
        }
        // let tempDate = new Date(date.getTime()+Number(seconds)*1000)
        let tempDate = new Date(date.getTime())

        if (isMultiplicity === true || isMultiplicity === null) {
          return this.getHhmm(tempDate)
        } else {
          return this.getHhmm(tempDate)+':'+seconds
        }
      }

      return String(this.value)
    },
  },

  mounted() {

  },

  methods: {
    changeMethod(event) {
      if (!event.target.value) {
        this.$emit('change', null)
      }

      if (typeof this.value === 'string') {
        this.$emit('change', event.target.value)
      } else if (typeof this.value === 'number') {
        this.$emit('change', event.target.valueAsNumber)
      } else if (this.value instanceof Date){
        this.$emit('change', new Date(event.target.valueAsNumber))
      }
    },

    getHhmm(date) {
      let hours = String(date.getUTCHours())

      if (hours.length < 2) {
        hours = '0'+hours
      }

      let minutes = String(date.getUTCMinutes())

      if (minutes.length < 2) {
        minutes = '0'+minutes
      }

      return hours+':'+minutes
    }
  },
};
</script>
