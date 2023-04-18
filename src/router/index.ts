/*
 * @Author: jiangruohui
 * @Date: 2022-03-15 13:54:07
 * @LastEditors: huangjin
 * @LastEditTime: 2023-04-18 16:01:40
 * @Description:
 */
import { createRouter, createWebHistory, RouteLocationNormalized, RouteRecordRaw } from 'vue-router'
import { useUserStore, useMainStore } from '@/store/index'
import { APP_NAME } from '@/config/index'
import { encrypt64 } from '@/utils/index'
import { shareArrive } from '@/common/api/index'
import signUpRouter from './modules/signUp'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'Home',
    component: () => import('@/views/enrollSystem/home/index.vue'),
    meta: {
      title: '学天服务中心'
      // requireAuth: true
    }
  },
  // {
  //   path: '/user',
  //   name: 'UserCenter',
  //   component: () => import('@/views/user/index.vue'),
  //   meta: {
  //     title: '学天服务中心'
  //   }
  // },
  ...signUpRouter,
  {
    path: '/:pathMatch(.*)*',
    name: 'not-found',
    component: () => import('@/views/404/index.vue'),
    meta: {
      title: '找不到页面'
    }
  }
]

const router = createRouter({
  history: createWebHistory('/bim/'),
  routes
})

router.beforeEach(async (to, from, next) => {
  // 修改页面title
  window.document.title = (to.meta.title || APP_NAME) as string
  // 如果是 iOS 设备，则使用如下 hack 的写法实现页面标题的更新
  if (navigator.userAgent.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/)) {
    const hackIframe = document.createElement('iframe')
    hackIframe.style.display = 'none'
    hackIframe.src = `./static/html/fixIosTitle.html?r=${Math.random()}`
    document.body.appendChild(hackIframe)
    setTimeout(() => {
      document.body.removeChild(hackIframe)
    }, 300)
  }

  const mainStore = useMainStore()
  const uuid = to.query.uuid && decodeURIComponent(to.query.uuid as string)
  const iuid = to.query.iuid && decodeURIComponent(to.query.iuid as string)
  const shareId = to.query.shareId && decodeURIComponent(to.query.shareId as string)
  const invitedStaffStationCode = to.query.staffStationCode && decodeURIComponent(to.query.staffStationCode as string)
  const ssc = to.query.ssc && decodeURIComponent(to.query.ssc as string) // 小程序码参数过长用缩写
  if (uuid) mainStore.saveUuid(uuid)
  // 保存注册参数
  if (iuid) mainStore.saveRegisterParams({ invitedUserId: iuid })
  if (invitedStaffStationCode) mainStore.saveRegisterParams({ invitedStaffStationCode })
  if (ssc) mainStore.saveRegisterParams({ invitedStaffStationCode: ssc })
  if (shareId) mainStore.saveRegisterParams({ shareId })
  // 分享触达
  if (shareId) shareArrive({ shareId })

  const userStore = useUserStore()
  const token = to.query.token && decodeURIComponent(to.query.token as string)
  if (token === 'null') {
    // 清除用户信息，小程序端已退出登陆
    userStore.removeUser()
  } else if (token && token !== userStore.user?.userToken) {
    // 路由携带token，且与当前用户token不一致，需要更新用户信息
    await userStore.getUserInfoByToken(token as string)
  }
  // 限制页面访问权限
  if (to.matched.some((record) => record.meta.requireAuth)) {
    if (userStore.user?.userToken) {
      next()
    } else if (to.query.token && to.query.token !== 'null') {
      next()
    } else if (to.query.env === 'minipro' && to.path === '/learning-center/signonline') {
      // 网签页面做特殊处理，小程序不登录允许访问
      next()
    } else {
      // 登录限制
      const query = encrypt64({ redirect: (to as RouteLocationNormalized & { href: string }).href }) as { data: string }
      next(`/login${query?.data ? `?data=${query.data}` : ''}`)
    }
  } else {
    next()
  }
})

// router.afterEach((to) => {
//   // 记录首次进入页面的url：ios url不变，wx签名时需要用第一次进入的url
//   const authUrl = `${window.location.origin}${to.fullPath}`
//   if (window.firstUrl === '' || window.firstUrl === undefined) {
//     window.firstUrl = authUrl // 将后面的参数去除
//   }

//   // ios微信浏览器内vue项目url不改变, 导致从微信浏览器跳转到手机浏览器时，不能打开指定页面。
//   const u = navigator.userAgent.toLowerCase()
//   if ((u.indexOf('like mac os x') !== -1 && u.includes('micromessenger'))) {
//     if (to.path !== global.location.pathname) {
//       location.assign(to.fullPath)
//     }
//   }
// })

export default router
