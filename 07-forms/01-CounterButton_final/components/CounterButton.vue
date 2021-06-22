<template>
  <button @click="handleClick">{{ localCount }}</button>
</template>

<script>
export default {
  name: 'CounterButton',

  data() {
    return {
      localCount: null,
    }
  },

  model: {
    prop: 'count',
    event: 'increment',
  },

  props: {
    count: {
      type: Number,
      default: 0,
    },
  },

  methods: {
    handleClick() {
      this.$emit('increment', (this.localCount+1));
      this.localCount++
    }
  },

  watch: {
    count(val) {
      this.localCount = val
    },
  },

  mounted() {
    this.localCount = this.count
  },
};
</script>
