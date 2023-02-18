<template>
  <div class="calendar-view">
    <div class="calendar-view__controls">
      <div class="calendar-view__controls-inner">
        <button
          class="calendar-view__control-left"
          type="button"
          aria-label="Previous month"
          @click="setPrevMonth()"
        ></button>
        <div class="calendar-view__date">
          {{ monthTitle }}
        </div>
        <button
          class="calendar-view__control-right"
          type="button"
          aria-label="Next month"
          @click="setNextMonth()"
        ></button>
      </div>
    </div>

    <div class="calendar-view__grid">
      <div
        v-for="item in calendarDays"
        :key="item.date+item.currentMonthDay"
        class="calendar-view__cell"
        :class="{'calendar-view__cell_inactive': !item.currentMonthDay}"
        tabindex="0"
      >
        <div class="calendar-view__cell-day">{{ item.day }}</div>
        <div class="calendar-view__cell-content">
          <a v-for="meetup in dateByMeetups.get(item.date)"
             :key="meetup.id"
             :href="'/meetups/' + meetup.id"
             class="calendar-event">
            {{ meetup.title }}
          </a>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'MeetupsCalendar',
  props: {
    meetups: {
      type: Array,
      required: true,
    },
  },
  data: () => {
    const currentDate = new Date();
    return {
      currentYear: currentDate.getFullYear(),
      currentMonth: currentDate.getMonth(),
    }
  },
  computed: {
    dateByMeetups() {
      const map = new Map();
      this.meetups.forEach(item => {
        const dateKey = this.shortDateFormat(new Date(item.date));
        const dayMeetups = map.get(dateKey);
        if (!dayMeetups) {
          map.set(dateKey, [item]);
        } else {
          dayMeetups.push(item);
        }
      });
      return map;
    },
    calendarDays() {
      const days = [];
      const firstDayOfMonth = new Date(this.currentYear, this.currentMonth);
      const lastDayOfMonth = this.lastDayOfCurrentMonth();
      const additionalPreviousMonthDays = this.getLocalWeekDay(firstDayOfMonth);
      const additionalNextMonthDays = 6 - this.getLocalWeekDay(lastDayOfMonth);
      for(let i = additionalPreviousMonthDays; i > 0; i--) {
        const prevMonthDay = this.addDaysToDate(firstDayOfMonth, -i);
        days.push({
          day: prevMonthDay.getDate(),
          date: this.shortDateFormat(prevMonthDay),
          currentMonthDay: false,
        });
      }
      for(let i = firstDayOfMonth.getDate(); i <= lastDayOfMonth.getDate(); i++) {
        days.push({
          day: i,
          date: this.shortDateFormat(new Date(this.currentYear, this.currentMonth, i)),
          currentMonthDay: true,
        });
      }
      for(let i = 1; i <= additionalNextMonthDays; i++) {
        const nextMonthDay = this.addDaysToDate(lastDayOfMonth, i);
        days.push({
          day: nextMonthDay.getDate(),
          date: this.shortDateFormat(nextMonthDay),
          currentMonthDay: false,
        });
      }
      return days;
    },
    monthTitle() {
      return new Date(this.currentYear, this.currentMonth).toLocaleDateString(navigator.language, {
        month: 'long',
        year: 'numeric',
      });
    },
  },
  methods: {
    setPrevMonth() {
      let newMonth = this.currentMonth - 1;
      if (newMonth < 0) {
        newMonth = 11;
        this.currentYear -= 1;
      }
      this.currentMonth = newMonth;
    },
    setNextMonth() {
      let newMonth = this.currentMonth + 1;
      if (newMonth > 11) {
        newMonth = 0;
        this.currentYear += 1;
      }
      this.currentMonth = newMonth;
    },
    getLocalWeekDay(date) {
      let day = date.getDay();
      if (day === 0) {
        day = 7;
      }
      return day - 1;
    },
    lastDayOfCurrentMonth() {
      const date = new Date(this.currentYear, this.currentMonth);
      date.setFullYear(date.getFullYear(), date.getMonth() + 1, 0);
      return date;
    },
    addDaysToDate(date, daysDelta) {
      const newDate = new Date(date);
      newDate.setDate(date.getDate() + daysDelta);
      return newDate;
    },
    shortDateFormat(date) {
      const day = (date.getDate() < 10 ? '0' : '') + date.getDate();
      const month = (date.getMonth() + 1 < 10 ? '0' : '') + (date.getMonth() + 1);
      return `${day}-${month}-${date.getFullYear()}`;
    },
  },
};
</script>

<style scoped>
.calendar-view {
}

.calendar-view__controls {
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

.calendar-view__controls-inner {
  max-width: 325px;
  width: 100%;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  text-transform: capitalize;
}

.calendar-view__controls-inner button {
  border: none;
  padding: 0;
}

.calendar-view__control-left,
.calendar-view__control-right {
  width: 30px;
  height: 30px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  cursor: pointer;
  transition: 0.3s all;
  background: url('@/assets/icons/icon-pill-active.svg') left center no-repeat;
  background-size: cover;
}

.calendar-view__control-left:hover,
.calendar-view__control-right:hover {
  opacity: 0.8;
}

.calendar-view__control-right {
  transform: rotate(180deg);
}

.calendar-view__grid {
  display: grid;
  grid-template-columns: repeat(1, 1fr);
}

.calendar-view__grid {
  border: 1px solid var(--grey);
  border-bottom: none;
}

.calendar-view__cell {
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

.calendar-view__cell.calendar-view__cell_inactive {
  background-color: var(--grey-light);
}

@media all and (max-width: 767px) {
  .calendar-view__cell:nth-child(5n + 1) {
    border-left: none;
  }
}

@media all and (min-width: 767px) {
  .calendar-view__grid {
    grid-template-columns: repeat(7, 1fr);
  }

  .calendar-view__cell {
    height: 144px;
  }

  .calendar-view__cell:nth-child(7n + 1) {
    border-left: none;
  }
}

.calendar-event {
  --max-lines: 2;
  --line-height: 16px;

  display: block;
  text-align: left;
  text-decoration: none;
  text-overflow: ellipsis;
  overflow: hidden;
  font-size: 14px;
  font-weight: 600;
  line-height: var(--line-height);
  color: var(--white);
  padding: 4px 6px;
  border-radius: 2px;
  background-color: var(--blue);
  margin-top: 4px;
}

@media all and (min-width: 767px) {
  .calendar-event {
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    max-height: calc(var(--max-lines) * var(--line-height) + 6px);
  }
}
</style>
