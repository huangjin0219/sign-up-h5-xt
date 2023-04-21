import { setStore, getStore, removeStore } from '@/utils/store'

import { Dialog, Toast } from 'vant'
import Cookies from 'js-cookie'
import md5 from 'js-md5'

// 上次登录的signUpRecordId 的 localStore 的key
export const SING_UP_RECORD_ID_STORE_KEY = 'LASTSIGNUPRECORDID'
// 登录的状态 key
export const LOGIN_STATUS_STORE_KEY = 'LOGINSTATUS'

export function validPermissionRouter(to: any, from: any, next: any) {
  // 跳转错误页面，直接跳
  if (to.path === '/enrollSystem/error') {
    next()
    return
  }
  const { signUpRecordId, pid } = to.query
  if (!signUpRecordId) {
    Dialog({
      title: '错误',
      message: '链接有误，请联系销售重试'
    })
    return
  }
  // 带pid进入--销售进入修改信息，无需登录
  if (pid) {
    const personId = Cookies.get('staffId') || ''
    console.log('🚀 hj ~ file: permission.js ~ line 56 ~ validPermissionRouter ~ personId', personId)

    if (personId && md5(personId) === pid) {
      next()
    } else {
      Toast({ message: '需在登录后台系统的浏览器下访问该链接!' })
      // 去掉pid参数
      if (to.path !== '/enrollSystem/addInfo') {
        next({
          path: '/enrollSystem/home',
          query: {
            signUpRecordId: to.query.signUpRecordId,
            redirect: to.path
          }
        })
      }
    }
    return
  }

  // 不带pid进入
  // 判断登录-限制页面访问权限
  const currMd5Value = md5(`${SING_UP_RECORD_ID_STORE_KEY}${signUpRecordId}`)

  // 上次的id
  let lastId = getStore(SING_UP_RECORD_ID_STORE_KEY)

  if (!lastId) {
    setStore(SING_UP_RECORD_ID_STORE_KEY, currMd5Value)
    lastId = getStore(SING_UP_RECORD_ID_STORE_KEY)
  }
  // 将id md5 加密后校验
  const isNotSameId = lastId !== currMd5Value
  console.log('isNotSameId', isNotSameId)

  // 登录状态
  const loginStatus = getStore(LOGIN_STATUS_STORE_KEY)
  // 未登录状态
  const isNotLogin = loginStatus !== md5(`${LOGIN_STATUS_STORE_KEY}${signUpRecordId}`)

  // to.path不是登录页, 先校验id 的变更和是否登录
  if (to.path !== '/enrollSystem/home') {
    // debugger
    if (to.path === '/enrollSystem/addInfo' && !to.query.source) {
      const queryPath = {
        ...to.query,
        source: true
      }
      // console.log(query)
      next({ path: '/enrollSystem/home', query: queryPath })
      return
    }
    if (isNotSameId) {
      removeStore(LOGIN_STATUS_STORE_KEY)
      // 存储时也需md5
      setStore(SING_UP_RECORD_ID_STORE_KEY, currMd5Value)
      next({ path: '/enrollSystem/home', query: to.query })
      return
    }

    if (isNotLogin) {
      next({ path: '/enrollSystem/home', query: to.query })
      return
    }
  } else {
    // to.path == 登录页 && 已登录状态 -> 重定向到 userInfo 页面
    if (loginStatus && !isNotLogin) {
      next({ path: '/enrollSystem/userInfo', query: to.query })
      return
    }
    next()
  }

  next()
}
