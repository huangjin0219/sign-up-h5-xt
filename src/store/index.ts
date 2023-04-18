/*
 * @Author: jiangruohui
 * @Date: 2022-03-29 20:24:47
 * @LastEditors: jiangruohui
 * @LastEditTime: 2023-03-13 16:58:37
 * @Description:
 */
import { SOURCE_THIRD_CHANNEL_CODE } from '@/config/index'
import {
  registerOrLogin as queryRegisterOrLogin,
  weChatAuthorization,
  authorizationBindAccount,
  fetchLogout,
  queryUserInfo
} from '@/common/api/user'
import type { RegisterOrLoginParams, WxLoginParams, BindPhoneParams } from '@/common/api/user'
import { queryCategoryList } from '@/common/api/index'
import { getUserInfo, setUserInfo, removeUserInfo, setStore, getStore, removeStore, cookie } from '@/utils/store'
import { generateUUid } from '@/utils/md5'

const store = createPinia()
export type User = {
  mobile: string
  headImage: string
  userName: string
  nickName: string
  userToken: string
  userIdentification: string
  userNo: string
  userId: string
  userVerifyAuthenticationType: number
  userType: 1 | 2 | 3 // 用户类型（1、普通用户 2、销售 3、代理商）
  realName: string
  intentionProjectCode: string
  newRegUser: number // 新注册用户(1是，0否)
  incompleteMobile: string
  isBindMobile: number
}

export type RegisterParams = {
  activityId?: string
  activityName?: string
  invitedUserId?: string
  invitedStaffStationCode?: string
  sourceThirdChannelCode?: string
  sourceIntentionCodes?: string[]
  shareId?: string
}

export const useUserStore = defineStore('user', function () {
  const mainStore = useMainStore()
  const user = ref<User | undefined>(getUserInfo())
  /**
   * @Author: jiangruohui
   * @method: registerOrLogin
   * @description: 注册或登录
   * @param {*} params
   * @return {promise}
   */
  const registerOrLogin = ({
    mobile,
    verificationCode,
    password,
    loginVerificationType,
    // intentionProjectCode,
    loginOperationType
  }: any) => {
    return new Promise((resolve, reject) => {
      const registerParams = { ...useMainStore().registerParams }
      if (!registerParams.sourceIntentionCodes || !registerParams.sourceIntentionCodes.length) {
        const projectCode = useMainStore().project?.code
        registerParams.sourceIntentionCodes = projectCode ? [projectCode] : ['T182686ed71308nv']
      }
      const params = <RegisterOrLoginParams>{
        ...registerParams,
        mobile,
        verificationCode,
        password,
        loginVerificationType,
        loginOperationType
        // intentionProjectCode
      }
      params.sourceThirdChannelCode = params.sourceThirdChannelCode || SOURCE_THIRD_CHANNEL_CODE
      // const userIntentParams = userIntent.get() || {}
      // if (userIntentParams) {
      //   params = Object.assign({}, userIntentParams)
      //   params.intentionProjectCode = intentionProjectCode || params.intentionProjectCode
      // }
      queryRegisterOrLogin(params)
        .then((res: any) => {
          saveUser(res.data)
          useMainStore().clearRegisterParams()
          resolve(res.data)
        })
        .catch((error: Error) => {
          reject(error)
        })
    })
  }

  /**
   * @Author: jiangruohui
   * @method: wxLogin
   * @description: 微信登陆
   * @return {*}
   */
  const wxLogin = (params: WxLoginParams) => {
    return new Promise((resolve, reject) => {
      params = <WxLoginParams>{
        ...useMainStore().registerParams,
        ...params
      }
      params.sourceThirdChannelCode = params.sourceThirdChannelCode || SOURCE_THIRD_CHANNEL_CODE
      weChatAuthorization(params)
        .then((res: any) => {
          const { needBindMobile, userAuthsId, loginRegisterInfo } = res && res.data
          if (needBindMobile) {
            setStore('temporaryUserInfo', res.data, 'session')
            const params = window.location.href.split('?')[1] || ''
            window.location.href = `${window.location.origin}/xtm/login/bind-phone?userAuthsId=${userAuthsId}&${params}`
          } else {
            saveUser(loginRegisterInfo)
            useMainStore().clearRegisterParams()
            resolve(loginRegisterInfo)
          }
        })
        .catch((error) => {
          reject(error)
        })
    })
  }

  /**
   * @Author: jiangruohui
   * @method: bindPhone
   * @description: 绑定手机
   * @return {promise}
   */
  const bindPhone = (params: BindPhoneParams) => {
    return new Promise((resolve, reject) => {
      authorizationBindAccount(params)
        .then((res: any) => {
          useMainStore().clearRegisterParams()
          saveUser(res.data)
          resolve(res.data)
        })
        .catch((error) => {
          reject(error)
        })
    })
  }

  /**
   * @Author: jiangruohui
   * @method: logout
   * @description: 退出登录
   * @return {promise}
   */
  const logout = () => {
    return new Promise((resolve, reject) => {
      if (user.value && user.value.userToken) {
        fetchLogout({ userToken: user.value?.userToken })
          .then(() => {
            removeUser()
            resolve(true)
          })
          .catch((error) => {
            reject(error)
          })
      }
    })
  }

  const removeUser = () => {
    removeUserInfo() // must remove  token  first
    user.value = undefined
    mainStore.refreshUuid() // 重置uuid
  }

  const getUserInfoByToken = (userToken: string, options?: any) => {
    return new Promise((resolve, reject) => {
      queryUserInfo({ userToken }, { hideErrMsg: options?.hideErrMsg })
        .then((res: any) => {
          saveUser(res.data)
          resolve(res.data)
        })
        .catch((error: Error) => {
          reject(error)
        })
    })
  }

  const saveUser = (value: any) => {
    setUserInfo(value)
    user.value = { ...value }
    // 重置uuid
    mainStore.refreshUuid()
  }

  return {
    user,
    registerOrLogin,
    wxLogin,
    bindPhone,
    logout,
    removeUser,
    getUserInfoByToken,
    saveUser
  }
})

export const useMainStore = defineStore('main', function () {
  const registerParamsStoreKey = 'registerParams'
  const registerParams = ref<RegisterParams | undefined>(getStore(registerParamsStoreKey)) // 注册参数
  const uaEnv = ref<string>('h5') // 浏览器环境（h5, 小程序，app）
  const uuid = ref<string>(cookie.get('uuid') as string)
  const categoryDict = ref<any>(getStore('categoryDict')) // 类目字典
  const category = ref<any>(getStore('category')) // 选课中心选中的项目
  const project = computed(() => {
    return category.value?.project
  })

  const saveRegisterParams = (value: RegisterParams) => {
    registerParams.value = { ...registerParams.value, ...value }
    setStore(registerParamsStoreKey, registerParams.value)
  }

  const clearRegisterParams = () => {
    removeStore(registerParamsStoreKey)
    registerParams.value = {}
  }

  const setUaEnv = (value: string) => {
    uaEnv.value = value
  }

  /**
   * 保存uuid
   */
  const saveUuid = (value: string) => {
    cookie.set('uuid', value)
    uuid.value = value
  }

  /**
   * 刷新uuid
   */
  const refreshUuid = () => {
    saveUuid(generateUUid())
  }

  /**
   * 获取uuid
   */
  const getUuid = () => {
    if (!uuid.value) {
      refreshUuid()
    }
    return uuid.value
  }

  /**
   * 项目字典
   */
  const getCategoryDict = () => {
    return new Promise((resolve, reject) => {
      if (categoryDict.value) {
        resolve(categoryDict.value)
      } else {
        queryCategoryList().then((res: any) => {
          categoryDict.value = res?.data
          resolve(res?.data)
        })
      }
    })
  }

  /**
   * 保存选课中心选中的项目
   */
  const saveCategory = (value: any) => {
    setStore('category', value)
    category.value = value
  }

  const setCategory = (projectCode?: string) => {
    if (!categoryDict.value?.length || (!projectCode && project.value)) {
      return
    }
    if (!projectCode) {
      const category = categoryDict.value[0]
      saveCategory({
        name: category.name,
        code: category.code,
        level: category.level,
        parentCode: category.parentCode,
        project: category.childCategoryList?.length ? category.childCategoryList[0] : null
      })
      return
    }
    let isFind = false
    for (let i = 0; i < categoryDict.value.length; i += 1) {
      if (isFind) {
        break
      }
      const category = categoryDict.value[i]
      if (category.childCategoryList) {
        for (let j = 0; j < category.childCategoryList.length; j += 1) {
          const projectData = category.childCategoryList[j]
          if (projectCode && projectCode === projectData.code) {
            saveCategory({
              name: category.name,
              code: category.code,
              level: category.level,
              parentCode: category.parentCode,
              project: projectData
            })
            isFind = true
            break
          }
        }
      }
    }
  }

  return {
    registerParams,
    saveRegisterParams,
    clearRegisterParams,
    uaEnv,
    setUaEnv,
    saveUuid,
    refreshUuid,
    getUuid,
    categoryDict,
    getCategoryDict,
    category,
    project,
    saveCategory,
    setCategory
  }
})

export const useAdminStore = defineStore('admin', function () {
  const adminUserStoreKey = 'adminUser'
  const adminUser = ref<any>(getStore(adminUserStoreKey)) // 销售的用户信息

  const saveAdminUser = (value: RegisterParams) => {
    setStore(adminUserStoreKey, value, 'session')
    adminUser.value = { ...value }
  }

  return {
    adminUser,
    saveAdminUser
  }
})

export default store
