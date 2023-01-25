import { createApp, defineComponent } from './vendor/vue.esm-browser.js';

// Создайте Vue приложение
const App = defineComponent({
  name: 'App',
  data() {
    return {
      number1: 0,
      number2: 0,
      sign: 'sum',
    };
  },
  computed: {
    result() {
      return this.action(this.number1, this.number2).toFixed(2);
    },
  },
  methods: {
    action(a, b){
      switch (this.sign) {
        case 'sum': {
          return this.sum(a, b);
        }
        case 'subtract': {
          return this.subtract(a, b);
        }
        case 'multiply': {
          return this.multiply(a, b);
        }
        case 'divide': {
          return this.divide(a, b);
        }
      }
    },
    sum(a, b) {
      return a + b;
    },
    subtract(a, b) {
      return a - b;
    },
    multiply(a, b) {
      return a * b;
    },
    divide(a, b) {
      if (b === 0) {
        alert('Делить на 0 нельзя');
      } else {
        return a / b;
      }
    },
  },
});

const app = createApp(App);
const vm = app.mount('#app');
window.vm = vm;
