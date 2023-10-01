import { createApp } from 'vue';
import App from './App.vue';
import Router from './route';
import ElementPlus from 'element-plus';
import 'element-plus/dist/index.css';
import 'element-plus/theme-chalk/dark/css-vars.css';

createApp(App).use(Router).use(ElementPlus).mount('#app');
