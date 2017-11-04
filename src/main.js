// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import index from './components/index.vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

let RouterObj = new VueRouter({
  mode: 'history',
  routes: [
    {
      path: '/:dbname',
      component: index
    }
  ]
})

/* eslint-disable no-new */
let mazey = new Vue({
  el: '#app',
  RouterObj,
  template: '<index/>',
  components: { index }
})

Vue.use(mazey)
