import MeetupCalendarCell from './MeetupCalendarCell.js';

export const MeetupsCalendar = {
  name: 'MeetupsCalendar',

  components: {
    MeetupCalendarCell
  },

  data() {
    return {
      currentMonthDate: null,
      minMeetupDate: null,
    };
  },

  props: {
    meetups: {
      type: Array,
      required: true,
    }
  },

  created() {
    let minMeetupUnixDate
    let maxMeetupUnixDate

    if (this.localMeetups.length > 0) {
      let maxKey = this.localMeetups.length-1
      minMeetupUnixDate = this.localMeetups[0].date
      maxMeetupUnixDate = this.localMeetups[maxKey].date
    } else {
      minMeetupUnixDate = new Date().getTime()
      maxMeetupUnixDate = new Date().getTime()
    }

    this.minMeetupDate = new Date(minMeetupUnixDate)

    this.currentMonthDate = new Date(this.minMeetupDate.getFullYear(), this.minMeetupDate.getMonth(), 1)
  },

  computed: {
    localMeetups() {
      return this.meetups.sort((a,b) => {
        return a.date - b.date
      })
    },

    currentMonthTitle() {
      return this.currentMonthDate.toLocaleDateString(navigator.language, {  month: 'long' })+' '+this.currentMonthDate.getFullYear()
    },

    arrayDates() {
      let arrayDates = []

      let currentMonthDate = new Date(this.currentMonthDate.getFullYear(), this.currentMonthDate.getMonth(), 1)

      let currentMonthFirstDay = this.getFirstDayDate(this.currentMonthDate).getDay()
      let currentMonthMaxDayNumber = this.getMaxDayMonth(this.currentMonthDate)

      let addDaysCounter = 0

      if (currentMonthFirstDay != 1) { //Проверка на "не понедельник"
        if (currentMonthFirstDay == 0) { //Проверка на "воскресенье"
          addDaysCounter = 6
        } else { //остальные дни
          addDaysCounter = currentMonthFirstDay - 1
        }

        let tempArr = []
        for (let days = 1; days <= addDaysCounter; days++) {
          let prevDate = new Date(currentMonthDate.getFullYear(), currentMonthDate.getMonth(), 1)
          prevDate.setDate(prevDate.getDate()-days)
          tempArr.push(prevDate)
        }

        tempArr.reverse();

        for (let date of tempArr) {
          arrayDates.push(date)
        }
      }

      let nextDate
      for (let days = 0; days < currentMonthMaxDayNumber; days++) {
        nextDate = new Date(currentMonthDate.getFullYear(), currentMonthDate.getMonth(), 1)
        nextDate.setDate(nextDate.getDate()+days)
        arrayDates.push(nextDate)
      }

      let lastCurrentDate = arrayDates[arrayDates.length-1]
      addDaysCounter = 7 - lastCurrentDate.getDay()
      if (addDaysCounter != 7) {
        for (let days = 1; days <= addDaysCounter; days++) {
          nextDate = new Date(currentMonthDate.getFullYear(), currentMonthDate.getMonth(), lastCurrentDate.getDate())
          nextDate.setDate(nextDate.getDate()+days)
          arrayDates.push(nextDate)
        }
      }

      return arrayDates
    },
  },

  methods: {


    capitalizeFirstLetter(string) {
      return string.charAt(0).toUpperCase() + string.slice(1);
    },

    getDatePrevMonth(date) {
      return new Date(date.getFullYear(), date.getMonth()-1, 1)
    },

    getMaxDayMonth(date) {
      return (new Date(date.getFullYear(), date.getMonth()+1, 0)).getDate()
    },

    getFirstDayDate(date) {
      let firstDayDate = new Date()
      firstDayDate.setTime(date.getTime())
      firstDayDate.setDate(1)
      firstDayDate.setMonth(date.getMonth())
      firstDayDate.setFullYear(date.getFullYear())

      return firstDayDate
    },

    goLeftMonth() {
      this.currentMonthDate = new Date(this.currentMonthDate.getFullYear(), this.currentMonthDate.getMonth()-1, 1)
    },

    goRightMonth() {
      this.currentMonthDate = new Date(this.currentMonthDate.getFullYear(), this.currentMonthDate.getMonth()+1, 1)
    },
  },

  template: `
  <div class="rangepicker">
    <div class="rangepicker__calendar">
      <div class="rangepicker__month-indicator">
        <div class="rangepicker__selector-controls">
          <button @click="goLeftMonth" class="rangepicker__selector-control-left"></button>
          <div>{{ currentMonthTitle }}</div>
          <button @click="goRightMonth" class="rangepicker__selector-control-right"></button>
        </div>
      </div>
      <div class="rangepicker__date-grid">
        <MeetupCalendarCell v-for="dayDate in arrayDates"
            :meetups="localMeetups"
            :dayDate="dayDate"
            :currentMonthDate="currentMonthDate"
        ></MeetupCalendarCell>
      </div>
    </div>

  </div>`,
};
