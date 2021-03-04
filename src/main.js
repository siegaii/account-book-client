import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import { timestampToString } from './utils/date';
import { registerElement } from './utils/element-ui';

Vue.config.productionTip = false;

Vue.filter('timestampToString', timestampToString);
registerElement();

new Vue({
  router,
  store,
  render: (h) => h(App)
}).$mount('#app');
