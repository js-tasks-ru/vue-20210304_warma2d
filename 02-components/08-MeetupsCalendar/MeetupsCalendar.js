import MeetupCalendarCell from './MeetupCalendarCell.js';

export const MeetupsCalendar = {
  name: 'MeetupsCalendar',

  components: {
    MeetupCalendarCell
  },

  data() {
    return {
      localMeetups: [],
      minMonthDate: null,
      maxMonthDate: null,
      currentMonthDate: null,
      minMeetupDate: null,
      maxMeetupDate: null,
      arrayDates: [],
    };
  },

  props: {
    meetups: {
      type: Array,
      required: true,
    }
  },

  created() {
    this.localMeetups = JSON.parse(JSON.stringify(this.meetups))

    this.localMeetups.sort((a,b) => {
      return a.date - b.date
    })

    let maxKey = this.localMeetups.length-1
    let minMeetupUnixDate = this.localMeetups[0].date
    let maxMeetupUnixDate = this.localMeetups[maxKey].date
    this.minMeetupDate = new Date(minMeetupUnixDate)
    this.maxMeetupDate = new Date(maxMeetupUnixDate)

    this.minMonthDate = new Date(this.minMeetupDate.getFullYear(), this.minMeetupDate.getMonth(), 1)
    this.maxMonthDate = new Date(this.maxMeetupDate.getFullYear(), this.maxMeetupDate.getMonth(), 1)

    this.currentMonthDate = new Date(this.minMeetupDate.getFullYear(), this.minMeetupDate.getMonth(), 1)

    this.calcData()
  },

  computed: {
    months() {
      return [
        'январь',
        'февраль',
        'март',
        'апрель',
        'май',
        'июнь',
        'июль',
        'август',
        'сентябрь',
        'октябрь',
        'ноябрь',
        'декабрь',
      ]
    },

    currentMonthTitle() {
      return this.capitalizeFirstLetter(this.months[this.currentMonthDate.getMonth()])+' '+this.currentMonthDate.getFullYear()
    },
  },

  methods: {
    calcData() {
      this.arrayDates = []
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
          this.arrayDates.push(date)
        }
      }

      let nextDate
      for (let days = 0; days < currentMonthMaxDayNumber; days++) {
        nextDate = new Date(currentMonthDate.getFullYear(), currentMonthDate.getMonth(), 1)
        nextDate.setDate(nextDate.getDate()+days)
        this.arrayDates.push(nextDate)
      }

      let lastCurrentDate = this.arrayDates[this.arrayDates.length-1]
      addDaysCounter = 7 - lastCurrentDate.getDay()
      if (addDaysCounter != 7) {
        for (let days = 1; days <= addDaysCounter; days++) {
          nextDate = new Date(currentMonthDate.getFullYear(), currentMonthDate.getMonth(), lastCurrentDate.getDate())
          nextDate.setDate(nextDate.getDate()+days)
          this.arrayDates.push(nextDate)
        }
      }

    },

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
      if (this.currentMonthDate > this.minMonthDate) {
        this.currentMonthDate = new Date(this.currentMonthDate.getFullYear(), this.currentMonthDate.getMonth()-1, 1)
        this.calcData()
      }
    },

    goRightMonth() {
      if (this.currentMonthDate < this.maxMonthDate) {
        this.currentMonthDate = new Date(this.currentMonthDate.getFullYear(), this.currentMonthDate.getMonth()+1, 1)
        this.calcData()
      }
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
