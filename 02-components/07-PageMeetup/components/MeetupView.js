import { defineComponent } from '../vendor/vue.esm-browser.js';
import UiAlert from './UiAlert.js';
import UiContainer from './UiContainer.js';
import MeetupCover from "./MeetupCover.js";
import MeetupDescription from "./MeetupDescription.js";
import MeetupAgenda from "./MeetupAgenda.js";
import MeetupInfo from "./MeetupInfo.js";

export default defineComponent({
  name: 'MeetupView',

  components: {
    MeetupInfo,
    MeetupAgenda,
    MeetupDescription,
    MeetupCover,
    UiAlert,
    UiContainer,
  },

  props: {
    meetup: {
      type: Object,
      required: true,
    },
  },

  template: `
    <div>
    <!-- meetup cover-->
    <meetup-cover :title="meetup.title" :image="meetup.image"></meetup-cover>

    <UiContainer>
      <div class="meetup">
        <div class="meetup__content">
          <h3>Описание</h3>
          <!-- meetup description -->
          <meetup-description :description="meetup.description"></meetup-description>

          <h3>Программа</h3>
          <!-- meetup agenda -->
          <meetup-agenda v-if="meetup.agenda" :agenda="meetup.agenda"></meetup-agenda>
          <UiAlert v-else>Программа пока пуста...</UiAlert>
        </div>
        <div class="meetup__aside">
          <!-- meetup info -->
          <meetup-info
            :organizer="meetup.organizer"
            :date="meetup.date"
            :place="meetup.place"
          ></meetup-info>
        </div>
      </div>
    </UiContainer>
    </div>
    `,
});
