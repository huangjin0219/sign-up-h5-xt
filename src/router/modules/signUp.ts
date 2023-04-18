/*
 * @Author: jiangruohui
 * @Date: 2022-04-07 10:08:46
 * @LastEditors: huangjin
 * @LastEditTime: 2023-04-18 15:53:24
 * @Description: crmapp 路由
 */
const signUpRouter = [
  {
    path: '/enrollSystem/home',
    name: 'EnrollSystemHome',
    component: () => import('@/views/enrollSystem/home/index.vue')
    // meta: {
    //   title: '报名'
    // }
  }
  // {
  //   path: '/enrollSystem/userInfo',
  //   name: 'EnrollSystemUserInfo',
  //   component: () => import('@/views/enrollSystem/userInfo/index.vue')
  // },
  // {
  //   path: '/enrollSystem/promise',
  //   name: 'EnrollSystemPromise',
  //   component: () => import('@/views/enrollSystem/promise/index.vue')
  // },
  // {
  //   path: '/enrollSystem/basicInfo',
  //   name: 'BasicInfo',
  //   component: () => import('@/views/enrollSystem/basicInfo/index.vue')
  // },
  // {
  //   path: '/enrollSystem/error',
  //   name: 'ErrorPage',
  //   component: () => import('@/views/enrollSystem/error/index.vue')
  // },
  // {
  //   path: '/enrollSystem/addInfo',
  //   name: 'AddInfo',
  //   component: () => import('@/views/enrollSystem/addInfo/index.vue')
  // }
]

export default signUpRouter
