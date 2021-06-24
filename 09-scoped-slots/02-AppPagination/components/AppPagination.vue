<template>
  <div>
    <slot
      v-for="item in paginatedItems"
      :item="item"
    ></slot>
  </div>
</template>

<script>
export default {
  name: 'AppPagination',

  props: {
    page: {
      type: Number,
    },

    perPage: {
      type: Number,
    },

    items: {
      type: Array,
    },
  },

  computed: {
    paginatedItems() {
      if (!this.items) {
        return []
      }

      let items = []
      let startKey = (this.page-1) * this.perPage
      let endKey = startKey + this.perPage

      for (let key = startKey; key < endKey; key++) {
        if (typeof this.items[key] === 'undefined') {
          break;
        }
        items.push(this.items[key])
      }

      return items
    }
  },
};
</script>

<style></style>
