import { MEETUP_ID, fetchMeetup } from './data.js';
import MeetupView from './MeetupView.js';

export default {
  name: 'MeetupPage',

  data() {
    return {
      meetup: null,
    };
  },

  components: {
    MeetupView,
  },

  mounted() {
    fetchMeetup(MEETUP_ID).then((jsonResponse) => {
      this.meetup = jsonResponse;
    });
  },

  template: `<div>
      <MeetupView v-if="meetup" :meetup="meetup"></MeetupView>
  </div>`,
};
