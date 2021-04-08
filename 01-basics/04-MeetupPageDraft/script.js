import Vue from './vendor/vue.esm.browser.js';

/** URL адрес API */
const API_URL = 'https://course-vue.javascript.ru/api';

/** ID митапа для примера; используйте его при получении митапа */
const MEETUP_ID = 6;

/**
 * Возвращает ссылку на изображение по идентификатору, например, изображение митапа
 * @param imageId {number} - идентификатор изображения
 * @return {string} - ссылка на изображение
 */
function getImageUrlByImageId(imageId) {
  return `${API_URL}/images/${imageId}`;
}

/**
 * Функция, возвращающая словарь заголовков по умолчанию для всех типов пунктов программы
 */
const getAgendaTypes = () => ({
  registration: 'Регистрация',
  opening: 'Открытие',
  break: 'Перерыв',
  coffee: 'Coffee Break',
  closing: 'Закрытие',
  afterparty: 'Afterparty',
  talk: 'Доклад',
  other: 'Другое',
});

/**
 * Функция, возвращая словарь иконок для для всех типов пунктов программы.
 * Соответствует имени иконок в директории /assets/icons
 */
const getAgendaIcons = () => ({
  registration: 'key',
  opening: 'cal-sm',
  talk: 'tv',
  break: 'clock',
  coffee: 'coffee',
  closing: 'key',
  afterparty: 'cal-sm',
  other: 'cal-sm',
});

new Vue({
  el: '#app',
  data() {
    return {
      meetup: null,
      isLoading: false,
    };
  },

  computed: {
    imageUrl() {
      if (this.meetup && this.meetup.imageId) {
        return getImageUrlByImageId(this.meetup.imageId);
      } else return null;
    },

    localeDate() {
      if (this.meetup && this.meetup.date) {
        const options = { year: 'numeric', month: 'long', day: 'numeric' };
        let meetupDate = new Date(this.meetup.date);
        return meetupDate.toLocaleDateString('ru-RU', options);
      }
      return null;
    },
  },

  watch: {},

  mounted() {
    this.getMeetup(MEETUP_ID);
  },

  methods: {
    getMeetup(id) {
      this.isLoading = true;
      fetch(API_URL + `/meetups/${id}`)
        .then((response) => response.json())
        .then((jsonResponse) => {
          this.isLoading = false;
          this.meetup = jsonResponse;
        });
    },

    getAgendaIcon(type) {
      return getAgendaIcons()[type];
    },

    getAgendaType(type) {
      return getAgendaTypes()[type];
    },
  },
});
