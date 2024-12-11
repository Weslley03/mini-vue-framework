import { createApp } from "./mini-vue.js";

createApp({
  data() {
    return { count: 0 };
  },

  template: `
    <div>
      <h1 data-bind="count"></h1>
      <button data-methods="increment"> increment </button>
      <button data-methods="decrement"> decrement </button>
      <button data-methods="reset"> reset </button>
    </div>
  `,

  methods: {
    increment() {
      this.count++;
    },

    decrement() {
      this.count--;
    },

    reset() {
      this.count = 0;
    },
  }
});