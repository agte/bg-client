import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import vuetify from './plugins/vuetify';
import './plugins/compositionApi';
import 'roboto-fontface/css/roboto/roboto-fontface.css';
import '@mdi/font/css/materialdesignicons.css';

Vue.config.productionTip = false;

store.dispatch('auth/authenticate')
  .catch((e) => {
    if (e.code === 401) return;
    throw e;
  })
  .then(() => {
    new Vue({
      router,
      store,
      vuetify,
      render(h) { return h(App); },
    }).$mount('#app');
  });
