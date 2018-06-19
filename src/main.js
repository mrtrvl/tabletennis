import Vue from 'vue'
import VueResource from 'vue-resource'
import App from './App.vue'

import { store } from './store/store';

Vue.use(VueResource);

new Vue({
  el: '#app',
  store,
  beforeCreate() {
		this.$store.commit('initialiseStore');
	},
  render: h => h(App)
})
