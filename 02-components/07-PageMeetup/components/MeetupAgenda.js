import { defineComponent } from '../vendor/vue.esm-browser.js';
import MeetupAgendaItem from './MeetupAgendaItem.js';

export default defineComponent({
  name: 'MeetupAgenda',
  components: {
    MeetupAgendaItem
  },
  props: {
    agenda: {
      type: Object,
      default: () => {}
    }
  },

  template: `
    <ul class="agenda">
      <li v-for="item in agenda" class="agenda__item">
        <meetup-agenda-item :agenda-item="item"></meetup-agenda-item>
      </li>
    </ul>`,
});
