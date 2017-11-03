// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import router from 'vue-router'
import index from './components/index'

Vue.use(router)

/* eslint-disable no-new */
let mazey = new Vue({
  el: '#app',
  router,
  template: '<index/>',
  components: { index }
})
Vue.use(mazey)
