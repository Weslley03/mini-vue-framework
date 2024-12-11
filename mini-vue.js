import { reactive, watchEffect } from "./reactivity.js";

export function createApp({ data, template, methods }) {
  const state = reactive(data());

  const app = document.querySelector('#app');
  app.innerHTML = template;

  watchEffect(() => {
    app.querySelectorAll('[data-bind]').forEach((node) => {
      const key = node.getAttribute('data-bind');
      node.textContent = state[key];  
    });
  });

  Object.entries(methods).forEach(([key, fn]) => {
    app.querySelectorAll(`[data-methods="${key}"]`).forEach((node) => {
      node.addEventListener('click', () => fn.call(state));     
    });
  });

  return { state };
}