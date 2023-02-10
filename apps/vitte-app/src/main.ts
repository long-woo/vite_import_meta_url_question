import { createApp, h } from 'vue';
import singleSpaVue from 'single-spa-vue';

import './style.css';
import App from './App.vue';

const vueLifecycles = singleSpaVue({
  createApp,
  appOptions: {
    render: () => h(App),
  },
  handleInstance(app) {},
});

export const bootstrap = vueLifecycles.bootstrap;
export const mount = vueLifecycles.mount;
export const unmount = vueLifecycles.unmount;
