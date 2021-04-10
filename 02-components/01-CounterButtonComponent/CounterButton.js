export default {
  name: 'CounterButton',

  // Компонент должен иметь входной параметр
  props: {
    inputCounter: Number,
  },

  // Компонент должен иметь модель
  data() {
    return {
      localCounter: 0,
    };
  },

  // Шаблон лучше держать максимально простым, а логику выносить в методы
  methods: {
    doIncrement() {
      this.$emit('increment', ++this.localCounter);
    },
  },

  // Шаблон потребуется отредактировать
  template: `<button
              type="button"
              @click="doIncrement"
             >{{ localCounter }}</button>`,
};
