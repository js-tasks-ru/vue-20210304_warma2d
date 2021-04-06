import Vue from './vendor/vue.esm.browser.js';

new Vue({
  el: '#app',
  data() {
    return {
      cnt: 0,
    };
  },

  methods: {
    count() {
      this.cnt++;
    },
  },
});
