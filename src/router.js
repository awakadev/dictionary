import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'home',
      component: () => import(/* webpackChunkName: "add" */ './views/Add.vue')
    },
    {
      path: '/dictionary',
      name: 'dictionary',
      component: () => import(/* webpackChunkName: "about" */ './views/Dictionary.vue')
    },
    {
      path: '/statistics',
      name: 'statistics',
      component: () => import(/* webpackChunkName: "about" */ './views/Statistics.vue')
    }
  ]
})
