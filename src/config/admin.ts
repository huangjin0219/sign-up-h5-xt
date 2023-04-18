/*
 * @Author: jiangruohui
 * @Date: 2022-07-23 15:16:46
 * @LastEditors: jiangruohui
 * @LastEditTime: 2023-03-10 20:03:32
 * @Description:
 */
export type EnvType = 'production' | 'development' | 'test'
export const apiEnv: EnvType = (import.meta.env?.VITE_APP_ENV as EnvType) || 'development'
export const APP_CODE = 'XtManageWeb'

/** ***************************  接口请求地址 start  ****************************** */
const baseUrlMap = {
  production: 'https://xtbossapi.xuetian.cn',
  test: 'https://testxtbossapi.xuetian.cn',
  development: 'https://devxtbossapi.xuetian.cn'
}
export const baseURL = baseUrlMap[apiEnv]
/** ***************************  接口请求地址 end  ****************************** */
