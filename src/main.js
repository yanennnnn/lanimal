import Vue from 'vue';
import Loading from 'vue-loading-overlay';
import App from './App.vue';
import 'vue-loading-overlay/dist/vue-loading.css';
import router from './router';
import store from './store';

Vue.config.productionTip = false;
Vue.component('Loading', Loading);

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount('#app');
