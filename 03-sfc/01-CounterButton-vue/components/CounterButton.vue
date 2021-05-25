<template>
  <div>
    <button @click="$emit('increment', count+1)">{{ count }}</button>
  </div>
</template>

<script>
export default {
  props: {
    count: {
      type: Number,
      default: 0,
    }
  },
};
</script>

<style></style>
