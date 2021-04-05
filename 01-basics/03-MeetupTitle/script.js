import Vue from './vendor/vue.esm.browser.js';

new Vue({
  el: '#app',
  data() {
    return {
      selectedRadio: null,
      title: null,
      isLoading: false,
    };
  },

  computed: {
    currentTitle() {
      return this.title === null ? 'Митап не выбран'
        : this.isLoading ? 'Загрузка...' : this.title;
    }
  },

  methods: {
    getMeetup(id) {
      this.isLoading = true;
      fetch(`https://course-vue.javascript.ru/api/meetups/${id}`)
        .then(response => response.json())
        .then(jsonResponse => {
          this.isLoading = false;
          this.title = jsonResponse.title
        })
    },
  },

  watch: {
    selectedRadio(val, oldVal) {
      if (val && val != oldVal) {
        this.getMeetup(val);
      }
    }
  },
});
