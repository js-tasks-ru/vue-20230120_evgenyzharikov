import { defineComponent } from '../vendor/vue.esm-browser.js';

export default defineComponent({
  name: 'CounterButton',
  props: {
    count: { type: Number, default: 0 },
  },
  data(){
    return {
      innerCount: this.count
    }
  },
  emits: ['update:count'],
  watch: {
    count(value){
      this.innerCount = value
    }
  },
  computed: {
    counter: {
      get() {
        return this.innerCount
      },
      set(value) {
        this.$emit('update:count', this.innerCount = value)
      }
    }

  },

  // Компонент должен иметь входной параметр и порождать событие

  template: `<button type="button" @click="$emit('update:count', counter++)">{{ count }}</button>`,
});
