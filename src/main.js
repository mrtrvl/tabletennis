import Vue from 'vue'
import VueResource from 'vue-resource'
import App from './App.vue'

import { store } from './store/store';
import VueFlashMessage from 'vue-flash-message';

Vue.use(VueFlashMessage);
Vue.use(VueResource);
Vue.use(require('vue-moment'));

new Vue({
  el: '#app',
  store,
  beforeCreate() {
		this.$store.commit('initialiseStore');
	},
  render: h => h(App)
})
