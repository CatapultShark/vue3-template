import { createApp } from 'vue';
import App from './App.vue';
import './assets/css/index.less';

import ElementPlus from 'element-plus';
import 'element-plus/dist/index.css';

import router from '@/router';

import { createPinia } from 'pinia';
import type { Pinia } from 'pinia';
const store: Pinia = createPinia();

const app = createApp(App);

app.use(ElementPlus);
app.use(router);
app.use(store);

app.mount('#app');
