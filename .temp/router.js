import Vue from 'vue'
/* global Vue */
import Router from 'vue-router'
import home from '@/components/home'

Vue.use(Router)

module.exports = new Router({
  routes: [
    {
      path: '/',
      name: 'home',
      component: home
    }
  ]
})
