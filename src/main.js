import Vue from 'vue';
import axios from 'axios';
import VueAxios from 'vue-axios';
import Loading from 'vue-loading-overlay';
import $ from 'jquery';
import './bus';
import App from './App.vue';
import 'vue-loading-overlay/dist/vue-loading.css';
import router from './router';
import currencyFilter from './filters/currency';
import 'bootstrap';
import store from './store';

window.$ = $;
Vue.config.productionTip = false;
Vue.use(VueAxios, axios);
Vue.component('Loading', Loading);
Vue.filter('currency', currencyFilter);

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount('#app');
