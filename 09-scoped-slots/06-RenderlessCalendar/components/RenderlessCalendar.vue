<script>
export default {
  name: 'RenderlessCalendar',

  data() {
    return {
      currentMonthDate: null,
    };
  },

  props: {
    inputMonthDate: {
      type: Date,
    }
  },

  created() {
    if (this.inputMonthDate) {
      this.currentMonthDate = this.inputMonthDate
    } else {
      this.currentMonthDate = new Date()
    }
  },

  computed: {
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
    isInActiveDay(dayDate) {
      return !(this.currentMonthDate.getMonth() === dayDate.getMonth())
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

  render(h) {
    const content = this.$scopedSlots.default({
      arrayDates: this.arrayDates,
      currentMonthTitle: this.currentMonthTitle,
      isInActiveDay: this.isInActiveDay,
      goLeftMonth: this.goLeftMonth,
      goRightMonth: this.goRightMonth,
    })

    return content.length > 1 ? h('div', content) : content
  },
};
</script>
