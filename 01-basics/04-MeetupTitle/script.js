// import { createApp } from './vendor/vue.esm-browser.js';

import { createApp, defineComponent } from '../03-MarkedList/vendor/vue.esm-browser';

const API_URL = 'https://course-vue.javascript.ru/api';

function fetchMeetupById(meetupId) {
  return fetch(`${API_URL}/meetups/${meetupId}`).then((response) => {
    if (response.ok) {
      return response.json();
    } else {
      return response.json().then((error) => {
        throw error;
      });
    }
  });
}

// Требуется создать Vue приложение
const App = defineComponent({
  name: 'App',
  data() {
    return {
      checked: 1,
      meetup: {}
    };
  },
  watch: {
    checked(id) {
      this.meetup = fetchMeetupById(id).then();
    },
  },
  mounted() {
    this.meetup = fetchMeetupById(this.checked).then();
  }
});

const app = createApp(App);
const vm = app.mount('#app');
window.vm = vm;
