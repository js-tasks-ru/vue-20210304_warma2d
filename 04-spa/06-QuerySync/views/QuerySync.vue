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
const DEFAULT_VIEW_VALUE = 'list'
const DEFAULT_DATE_VALUE = 'all'
const DEFAULT_PARTICIPATION_VALUE = 'all'
const DEFAULT_SEARCH_VALUE = ''

export default {
  name: 'QuerySync',
  components: { MeetupsView },

  computed: {

  },

  data() {
    return {
      view: DEFAULT_VIEW_VALUE,
      date: DEFAULT_DATE_VALUE,
      participation: DEFAULT_PARTICIPATION_VALUE,
      search: DEFAULT_SEARCH_VALUE,
    }
  },

  methods: {
    buttonUpdateView(view) {
      this.view = view

      let query = JSON.parse(JSON.stringify(this.$route.query))
      query.view = view

      if (view === DEFAULT_VIEW_VALUE) {
        delete query.view
      }

      this.$router.push({ path: this.$route.path, query }).catch((err) => {
        if (err.name !== NAVIGATION_DUPLICATED_ERROR_NAME) {
          throw err
        }
      });
    },

    buttonUpdateDate(date) {
      this.date = date

      let query = JSON.parse(JSON.stringify(this.$route.query))
      query.date = date

      if (date === DEFAULT_DATE_VALUE) {
        delete query.date
      }

      this.$router.push({ path: this.$route.path, query }).catch((err) => {
        if (err.name !== NAVIGATION_DUPLICATED_ERROR_NAME) {
          throw err
        }
      });
    },

    buttonUpdateParticipation(participation) {
      this.participation = participation

      let query = JSON.parse(JSON.stringify(this.$route.query))
      query.participation = participation

      if (participation === DEFAULT_PARTICIPATION_VALUE) {
        delete query.participation
      }

      this.$router.push({ path: this.$route.path, query }).catch((err) => {
        if (err.name !== NAVIGATION_DUPLICATED_ERROR_NAME) {
          throw err
        }
      });
    },

    buttonUpdateSearch(search) {
      this.search = search

      let query = JSON.parse(JSON.stringify(this.$route.query))
      query.search = search

      if (search === DEFAULT_SEARCH_VALUE) {
        delete query.search
      }

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
    $route() {
      this.setParamsFromUrl()
    },
  },

};
</script>
