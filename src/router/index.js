import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

/* Layout */
import Layout from '../views/layout/Layout'

/**
* hidden: true                   if `hidden:true` will not show in the sidebar(default is false)
* redirect: noredirect           if `redirect:noredirect` will no redirect in the breadcrumb
* name:'router-name'             the name is used by <keep-alive> (must set!!!)
* meta : {
    title: 'title'               the name show in subMenu and breadcrumb (recommend set)
    icon: 'svg-name'             the icon show in the sidebar
    breadcrumb: false            if false, the item will hidden in breadcrumb(default is true)
  }
**/
export const constantRouterMap = [
  { path: '/login', component: () => import('@/views/login/index'), hidden: true },
  { path: '/404', component: () => import('@/views/404'), hidden: true },

  {
    path: '/',
    component: Layout,
    redirect: '/madsports',
    name: 'madsports',
    hidden: true,
    children: [{
      path: 'madsports',
      component: () => import('@/views/madsports/index')
    }]
  },
  {
    path: '/dashboard',
    hidden: true,
    component: Layout,
    redirect: '/madsports'
  },
  {
    path: '/mian',
    component: Layout,
    redirect: '/mian/mailmsg/index',
    name: 'Main',
    meta: { title: '主后台', icon: 'example' },
    children: [
      {
        path: 'mailmsg',
        name: 'mailmsg',
        component: () => import('@/views/main/mailmsg/index'),
        meta: { title: '站内信', icon: 'table' }
      },
      {
        path: 'exchange',
        name: 'exchange',
        component: () => import('@/views/main/risk/exchange'),
        meta: { title: '兑换审核', icon: 'tree' }
      },
      {
        path: 'userqzone',
        name: 'userqzone',
        component: () => import('@/views/main/risk/userqzone'),
        meta: { title: '用户后台', icon: 'tree' }
      }
    ]
  },
  {
    path: '/language',
    component: Layout,
    redirect: '/language/index',
    children: [
      {
        path: 'index',
        name: '多语言后台',
        component: () => import('@/views/language/index'),
        meta: { title: '多语言后台', icon: 'form' }
      }
    ]
  },
  { path: '*', redirect: '/404', hidden: true }
]

export default new Router({
  // mode: 'history', // 后端得配合
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRouterMap
})
