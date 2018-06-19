import Vue from 'vue'
import App from './App.vue'

import { store } from './store/store';
import VueFlashMessage from 'vue-flash-message';

Vue.use(VueFlashMessage);
Vue.use(require('vue-moment'));

new Vue({
  el: '#app',
  store,
  beforeCreate() {
		this.$store.commit('initialiseStore');
	},
  render: h => h(App)
})
