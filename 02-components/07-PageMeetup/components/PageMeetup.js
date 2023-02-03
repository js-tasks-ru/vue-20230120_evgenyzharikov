import { defineComponent } from '../vendor/vue.esm-browser.js';
import MeetupView from './MeetupView.js'
import UiContainer from './UiContainer.js';
import UiAlert from './UiAlert.js';
import { fetchMeetupById } from '../meetupService.js';

export default defineComponent({
  name: 'PageMeetup',
  props: {
    meetupId: {
      type: Number,
      required: true
    }
  },
  components: {
    MeetupView,
    UiAlert,
    UiContainer,
  },
  data(){
    return {
      meetup: {
        result: {},
        error: false
      },
    }
  },
  watch: {
    meetupId(id){
      this.meetup.result = {};
      this.meetup.error = false;
      this.fetchMeetupResult(id);
    }
  },
  mounted() {
    this.fetchMeetupResult(this.meetupId);
  },
  methods: {
    fetchMeetupResult(id){
      fetchMeetupById(id).then(
        result => {
          this.meetup.result = result;
        },
        error => {
          this.meetup.error = true;
        })
    }
  },

  template: `
    <div class="page-meetup">
    <!-- meetup view -->
    <meetup-view v-if="Object.keys(meetup.result).length > 0" :meetup="meetup.result"></meetup-view>

    <UiContainer v-else-if="Object.keys(meetup.result).length === 0 && !meetup.error">
      <UiAlert>Загрузка...</UiAlert>
    </UiContainer>

    <UiContainer v-else-if="meetup.error" >
      <UiAlert>error</UiAlert>
    </UiContainer>
    </div>
    `,
});
