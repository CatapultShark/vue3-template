import { createApp } from 'vue';
import App from './App.vue';
import './assets/css/index.less';

import ElementPlus from 'element-plus';
import 'element-plus/dist/index.css';
import * as ElementPlusIconsVue from '@element-plus/icons-vue';

import router from '@/router';

import { createPinia } from 'pinia';
import type { Pinia } from 'pinia';
const store: Pinia = createPinia();

import 'virtual:svg-icons-register';

const app = createApp(App);

for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component);
}

app.use(ElementPlus);
app.use(router);
app.use(store);

app.mount('#app');
