import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      redirect: '/dashboard'
    },
    {
      path: '/',
      component: () => import(/* webpackChunkName: "home" */ '../components/common/Home.vue'),
      meta: { title: '自述文件' },
      children: [
        {
          path: '/dashboard',
          component: () => import(/* wepackChunkName: "dashboard" */ '../components/page/Dashboard.vue'),
          meta: {title: '系统首页'}
        },
        {
          path: '/table',
          component: () => import(/* webpackChunkName: "table" */ '../components/page/BaseTable.vue'),
          meta: { title: '基础表格' }
        },
        {
          path: '/form',
          component: () => import(/* webpackChunkName: "form" */ '../components/page/BaseForm.vue'),
          meta: { title: '基本表单' }
        },
        {
          path: '/tabs',
          component: () => import(/* webpackChunkName: "form" */'../components/page/Tabs.vue'),
          meta: {title: 'tab选项卡'}
        }
      ]
    },
    {
      path: '/login',
      component: () => import(/* webpackChunkName: "form" */'../components/page/Login.vue'),
      meta: {title: '登录'}
    }
  ]})
