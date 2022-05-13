import Vue from 'vue'
import Router from 'vue-router'
// import authRouter from './modules/demo'

Vue.use(Router)

const routes = [
  {
    path: '/enrollSystem/home',
    name: 'EnrollSystemHome',
    component: () => import('@/views/enrollSystem/home/index.vue')
  },
  {
    path: '/enrollSystem/userInfo',
    name: 'EnrollSystemUserInfo',
    component: () => import('@/views/enrollSystem/userInfo/index.vue')
  },
  {
    path: '/enrollSystem/promise',
    name: 'EnrollSystemPromise',
    component: () => import('@/views/enrollSystem/promise/index.vue')
  },
  {
    path: '/enrollSystem/basicInfo',
    name: 'BasicInfo',
    component: () => import('@/views/enrollSystem/basicInfo/index.vue')
  },
  {
    path: '/enrollSystem/error',
    name: 'ErrorPage',
    component: () => import('@/views/enrollSystem/error/index.vue')
  },
  {
    path: '/enrollSystem/addInfo',
    name: 'AddInfo',
    component: () => import('@/views/enrollSystem/addInfo/index.vue')
  }
]

const createRouter = () =>
  new Router({
    mode: 'history', // require service support
    base: '/bim', // 模式为 history 时，必须设置根路径
    scrollBehavior: () => ({ x: 0, y: 0 }),
    routes
  })

const router = createRouter()

// Detail see: https://github.com/vuejs/vue-router/issues/1234#issuecomment-357941465
export function resetRouter () {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher // reset router
}

export default router
