<template>
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
        <div
          v-for="dayDate in arrayDates"
          :key="dayDate.getTime()"
          class="rangepicker__cell"
          :class="{ rangepicker__cell_inactive: !(currentMonthDate.getMonth() === dayDate.getMonth()) }"
        >
          {{ dayDate.getDate() }}
          <slot
            v-for="item in items"
            :item="item"
            :dayDate="dayDate"
          ></slot>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'CalendarView',

  data() {
    return {
      currentMonthDate: null,
    };
  },

  props: {
    items: {
      type: Array,
      required: true,
    },
  },

  created() {
    this.currentMonthDate = new Date()
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
};
</script>

<style scoped>
.rangepicker {
  position: relative;
  margin: 32px 0 0;
}

.rangepicker__selector {
  display: flex;
  background-color: var(--white);
  flex-direction: row;
  justify-content: space-between;
  flex: 1 0 100%;
}

.rangepicker__calendar {
  flex-grow: 1;
}

.rangepicker__month-indicator {
  text-align: center;
  font-weight: 700;
  font-size: 24px;
  line-height: 1;
  color: var(--blue);
  background-color: var(--blue-extra);
  padding: 24px;
  display: flex;
  justify-content: center;
}

.rangepicker__selector-controls {
  max-width: 325px;
  width: 100%;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  text-transform: capitalize;
}
.rangepicker__selector-controls button {
  border: none;
  padding: 0;
}

.rangepicker__selector-control-left,
.rangepicker__selector-control-right {
  width: 30px;
  height: 30px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  cursor: pointer;
  transition: 0.3s all;
  background: url('~@/assets/icons/icon-pill-active.svg') left center no-repeat;
  background-size: cover;
}

.rangepicker__selector-control-left:hover,
.rangepicker__selector-control-right:hover {
  opacity: 0.8;
}

.rangepicker__selector-control-right {
  transform: rotate(180deg);
}

.rangepicker__date-grid {
  display: grid;
  grid-template-columns: repeat(1, 1fr);
}

/* Dates */
.rangepicker__date-grid {
  border: 1px solid var(--grey);
  border-bottom: none;
}

.rangepicker__cell {
  position: relative;
  height: auto;
  padding: 6px 8px;
  background-color: var(--white);
  color: var(--grey-8);
  font-weight: 400;
  font-size: 16px;
  line-height: 24px;
  border-bottom: 1px solid var(--grey);
  border-left: 1px solid var(--grey);
  text-align: right;
}

.rangepicker__cell.rangepicker__cell_inactive {
  background-color: var(--grey-light);
}

@media all and (max-width: 767px) {
  .rangepicker__cell:nth-child(5n + 1) {
    border-left: none;
  }
}

@media all and (min-width: 767px) {
  .rangepicker__date-grid {
    grid-template-columns: repeat(7, 1fr);
  }

  .rangepicker__cell {
    height: 144px;
  }

  .rangepicker__cell:nth-child(7n + 1) {
    border-left: none;
  }
}
</style>
