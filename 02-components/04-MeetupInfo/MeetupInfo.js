export default {
  name: 'MeetupInfo',

  props: {
    organizer: {
      type: String,
      required: true,
    },

    place: {
      type: String,
      required: true,
    },

    date: {
      type: Date,
      required: true,
    },
  },

  computed: {
    humanDate() {
      const options = { year: 'numeric', month: 'long', day: 'numeric' };
      // return this.date.toLocaleDateString('ru-RU', options); //человеческий формат авто тест не принимает
      return this.date.toLocaleDateString('en-EN', options); // пришлось вернуть en-EN формат
    },

    robotDate() {
      return this.date.toISOString().split('T')[0];
    },
  },

  template: `
    <ul class="info-list">
      <li>
        <img class="icon info-list__icon" alt="icon" src="/assets/icons/icon-user.svg" />
        {{ organizer }}
      </li>
      <li>
        <img class="icon info-list__icon" alt="icon" src="/assets/icons/icon-map.svg" />
        {{ place }}
      </li>
      <li>
        <img class="icon info-list__icon" alt="icon" src="/assets/icons/icon-cal-lg.svg" />
        <time :datetime="robotDate">{{ humanDate }}</time>
      </li>
    </ul>`,
};
