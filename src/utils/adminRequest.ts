/* eslint-disable camelcase */
import axios from 'axios'
import { useAdminStore } from '@/store/index'
import { Toast } from 'vant'
import { encrypt, decrypt } from '@/utils/aes'
import { apiEnv, baseURL } from '@/config/admin'
import { signPlusByMd5, generateUUid } from '@/utils/md5'

// 是否加密 排除开发环境
const needEncrypt = sessionStorage.getItem('noEncrypt') === 'false' ? false : !['development', 'test'].includes(apiEnv)
// 不校验 权限
const NO_LOGIN_AUTH = true
// ================ 创建http服务 ======================

const codeMessage = {
  200: '服务器成功返回请求的数据',
  201: '新建或修改数据成功。',
  202: '一个请求已经进入后台排队（异步任务）',
  204: '删除数据成功。',

  400: '400:发出的请求有错误，服务器没有进行新建或修改数据的操作。',
  401: '客户端令牌 错误 或 过期 ，请重新登录。',
  403: '用户没有此 路由 或 操作 权限。',
  404: '404:发出的请求针对的是不存在的记录，服务器没有进行操作',
  406: '请求的格式不可得。',
  410: '请求的资源被永久删除，且不会再得到的。',
  422: '当创建一个对象时，发生一个验证错误。',

  500: '500:服务器发生错误，请检查服务器',
  502: '502:网关错误',
  503: '503:服务不可用，服务器暂时过载或维护',
  504: '504:网关超时'
}
/**
 * @description 获取公共请求头 - 默认加签
 * @param {Object} obj 默认是空对象。hasSign:是否加签（默认加签），data:config.data（默认为空对象）
 * @return {Object} headers
 */
const getHeaders = ({ data = {} } = {}) => {
  let headers: any = {
    xt_env_session_scene: 2,
    xt_env_request_from: 'pcweb',
    xt_skip_check_login: true,
    xt_original_request_out_trace_no: generateUUid()
  }

  // 登录之后的headers
  const adminStore = useAdminStore()
  if (adminStore.adminUser?.token) {
    const { token, currentStation } = adminStore.adminUser
    const { roleId } = currentStation
    // const path = router.history.current.path || '' // MENU_123 123是菜单id
    // const menuIdArr = path.replace(/\//g, '').split('MENU_')
    // const menuId = +menuIdArr[menuIdArr.length - 1] || ''
    headers = {
      ...headers,
      // 权限的
      xt_user_token: token,
      xt_role_id: roleId,
      // xt_menu_id: menuId || 1
      xt_menu_id: 1
      // 'xt_skip_check_perm': true,
    }
  }

  /** ***** 唯一标识 ******* */
  let xt_env_id: any = localStorage.getItem('xt_env_id')
  if (!xt_env_id) {
    xt_env_id = Date.now()
    localStorage.setItem('xt_env_id', xt_env_id)
  }
  headers.xt_env_id = xt_env_id // 唯一标识（pc和h5由前端生成保存本地,app端获取手机设备标识）
  /** ***** 唯一标识 ******* */

  /** ***** 登录权限 ******* */
  if (NO_LOGIN_AUTH) {
    headers.xt_non_auth = 1
  }
  /** ***** 登录权限 ******* */

  // 加签
  // console.info("加签名前参数", JSON.parse(JSON.stringify(data)))
  headers = {
    'Content-type': 'application/json;charset=UTF-8',
    ...headers,
    ...signPlusByMd5(data, {
      signKey: ['X', 'S', 'B', 'I', 'O', 'G', 'S', 'N', 'K', 'S', 'E', 'Y'].join('')
    })
  }
  /** ***** aes加密 ******* */
  if (needEncrypt) {
    headers.ck = 1
    // console.log("加密前参数", data)
    data = encrypt(JSON.stringify(data))
    // console.log("加密后参数", data)
  }
  /** ***** aes加密 ******* */
  return headers
}

/**
 * @description 获取对应系统的 axios 服务
 * @param {String} systemName business|order|knowledge等
 */
const createAxios = () => {
  // create an axios instance
  const service = axios.create({
    baseURL, // url = base url + request url
    // withCredentials: true, // send cookies when cross-domain requests
    timeout: 60000 // request timeout
  })

  // request interceptor
  service.interceptors.request.use(
    (config) => {
      // main-container
      // do something before request is sent

      // if (config.showLoading) {
      //   config.apiLoading = Loading.service({
      //     target: 'app-main',
      //     // fullscreen: false,
      //     lock: true,
      //     text: 'Loading',
      //     spinner: 'el-icon-loading',
      //     background: 'rgba(0, 0, 0, 0.1)'
      //   })
      // }

      config.headers = getHeaders({ data: config.data })
      return config
    },
    (error) => {
      // do something with request error
      // console.log(error) // for debug
      return Promise.reject(error)
    }
  )

  // response interceptor
  service.interceptors.response.use(
    /**
     * If you want to get http information such as headers or status
     * Please return  response => response
     */

    /**
     * Determine the request status by custom code
     * Here is just an example
     * You can also judge the status by HTTP Status Code
     */
    (response: any) => {
      // if (response.config.showLoading) {
      //   response.config.apiLoading.close()
      // }
      let { data } = response
      try {
        /** ***** aes解密 ******* */
        // 文件流不解密
        if (needEncrypt && !response.config.isFileStream) {
          const plaintext = decrypt(data)
          data = JSON.parse(plaintext)
        }
        /** ***** aes解密 ******* */
      } catch (error) {
        //
        // console.log('error', error)
      }
      // 解密后重新赋值data
      response.data = data
      // console.log(" 解密后data", data)

      const res = response.data
      if (res.code === 1) {
        res.success = true
      }
      // 如果是文件流 也是true
      // if (res && response.config.isFileStream) {
      //   res = {
      //     success: true,
      //     data: res,
      //     'content-disposition': response.headers['content-disposition']
      //   }
      // }
      if (!res.success) {
        const msg = res.message || res.resultMessage || 'Error'
        Toast({
          message: msg.substring(0, 5096),
          duration: 2000
        })

        if (res.resultCode && res.resultCode === 'login_error') {
          // removeUserInfo()
          // router.replace('/login')
        }
        return Promise.reject(res)
      }
      return res
    },
    (error) => {
      // error.config && error.config.apiLoading && error.config.apiLoading.close()
      // console.log('err:', error) // for debug

      Toast({
        message: codeMessage[error.request.status] || error.message,
        duration: 2000
      })
      switch (error.request.status) {
        case 403:
          break
        case 401:
          // removeUserInfo()
          // router.replace('/login')
          break
        default:
          break
      }
      return Promise.reject(error)
    }
  )
  return service
}

export default createAxios()
