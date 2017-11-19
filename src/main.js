// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import index from './components/index.vue'
import spider from './components/spider.vue'
import VueRouter from 'vue-router'
import store from './store/index'
Vue.use(VueRouter)
let router = new VueRouter({
  mode: 'history',
  routes: [
    {
      path: '/:db',
      component: spider
    }
  ]
})

/* eslint-disable no-new */
let mazey = new Vue({
  el: '#app',
  router,
  store,
  template: '<index/>',
  components: { index }
})

Vue.use(mazey)
