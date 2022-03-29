import { createApp } from 'vue';
import App from './App.vue';
import './index.less';
import router from './router';
import axios from 'axios';
import { createPinia } from 'pinia';
import { AxiosStatic } from 'axios';

const app = createApp(App);
const pinia = createPinia();
axios.defaults.baseURL = 'http://127.0.0.1:7001';
app.config.globalProperties.$http = axios;

app.use(router);
app.use(pinia);
app.mount('#app');

// 声明axios类型
declare module '@vue/runtime-core' {
  interface ComponentCustomProperties {
    $http: AxiosStatic;
  }
}
