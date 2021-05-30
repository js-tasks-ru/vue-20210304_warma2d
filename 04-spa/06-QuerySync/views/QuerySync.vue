<template>
  <meetups-view
    :view="view"
    :date="date"
    :participation="participation"
    :search="search"
    @update:view="buttonUpdateView"
    @update:date="buttonUpdateDate"
    @update:participation="buttonUpdateParticipation"
    @update:search="buttonUpdateSearch"
  />
</template>

<script>
import MeetupsView from '../components/MeetupsView';

const NAVIGATION_DUPLICATED_ERROR_NAME = 'NavigationDuplicated'

export default {
  name: 'QuerySync',
  components: { MeetupsView },

  computed: {

  },

  data() {
    return {
      view: 'list',
      date: 'all',
      participation: 'all',
      search: '',
    }
  },

  methods: {
    buttonUpdateView(view) {
      this.view = view

      let query = this.$route.query
      query.view = view
      console.log(query)
      this.$router.push({ path: this.$route.path, query }).catch((err) => {
        if (err.name === NAVIGATION_DUPLICATED_ERROR_NAME) {
          console.log(err)
        } else {
          throw err
        }
      });
    },

    buttonUpdateDate(date) {
      this.date = date

      let query = this.$route.query
      query.date = date
      this.$router.push({ path: this.$route.path, query }).catch((err) => {
        if (err.name !== NAVIGATION_DUPLICATED_ERROR_NAME) {
          throw err
        }
      });
    },

    buttonUpdateParticipation(participation) {
      this.participation = participation

      let query = this.$route.query
      query.participation = participation
      this.$router.push({ path: this.$route.path, query }).catch((err) => {
        if (err.name !== NAVIGATION_DUPLICATED_ERROR_NAME) {
          throw err
        }
      });
    },

    buttonUpdateSearch(search) {
      this.search = search

      let query = this.$route.query
      query.search = search
      this.$router.push({ path: this.$route.path, query }).catch((err) => {
        if (err.name !== NAVIGATION_DUPLICATED_ERROR_NAME) {
          throw err
        }
      });
    },

    setParamsFromUrl() {
      this.view = this.$route.query.view
      this.date = this.$route.query.date
      this.participation = this.$route.query.participation
      this.search = this.$route.query.search
    },
  },

  mounted() {
    this.setParamsFromUrl()
  },

  watch: {
    $route(to, from) {
      console.log('watched!!!')
      console.log(to)
      console.log(from)
      this.setParamsFromUrl()
    },
  },

};
</script>
