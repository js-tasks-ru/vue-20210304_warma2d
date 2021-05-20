export default {
  name: 'MeetupCalendarCell',

  data() {
    return {
    };
  },

  components: {

  },

  props: {
    dayDate: {
      type: Date,
    },

    meetups: {
      type: Array,
    },

    currentMonthDate: {
      type: Date,
    }
  },

  computed: {
    dayMeetups() {
      let arrDayMeetups = []
      let meetupDate = null
      for (let meetup of this.meetups) {
        meetupDate = new Date(meetup.date)

        if (this.dayDate.getFullYear() === meetupDate.getFullYear()
          && this.dayDate.getMonth() === meetupDate.getMonth()
          && this.dayDate.getDate() === meetupDate.getDate()) {
          arrDayMeetups.push(meetup)
        }
      }

      return arrDayMeetups
    },

    isActiveCell() {
      return this.currentMonthDate.getMonth() === this.dayDate.getMonth()
    }
  },

  mounted() {
  },

  template: `
  <div class="rangepicker__cell" v-bind:class="{ rangepicker__cell_inactive: !isActiveCell }">
    {{ dayDate.getDate() }}
    <a v-if="dayMeetups" v-for="meetup in dayMeetups" class="rangepicker__event">{{ meetup.title }}</a>
  </div>
`,
};
