<script>
export default {
  name: 'NodesPagination',

  props: {
    page: {
      type: Number,
    },

    perPage: {
      type: Number,
    },
  },

  render: function (createElement) {

    if (!this.$slots.default) {
      return null
    }

    let cards = []
    let startKey = (this.page-1) * this.perPage
    let endKey = startKey + this.perPage

    for (let key = startKey; key < endKey; key++) {
      cards.push(this.$slots.default[key])
    }

    return createElement(
      'div',
      cards,
    )
  },
};
</script>
