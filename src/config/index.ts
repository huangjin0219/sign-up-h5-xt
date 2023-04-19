/*
 * @Author: jiangruohui
 * @Date: 2022-03-24 14:33:19
 * @LastEditors: huangjin
 * @LastEditTime: 2023-04-19 14:42:13
 * @Description:
 */

export const bizType = '1009'
// 环境类型
export type EnvType = 'production' | 'development' | 'test'
export const APP_NAME = '学天服务中心'
export const BIZ_TYPE = 1008 // 业务线
export const APP_TYPE = 1005 // 应用类型， 1005 h5，微信授权登录appType传1002微信公众号
export const APP_TYPE_CODE = 'XtMWeb' // 应用类型编号
export const MINIPRO_APP_TYPE = 1004 // 应用类型
export const MINIPRO_APP_TYPE_CODE = 'XtClassRoom' // 应用类型编号
export const ANDROID_APP_DOWNLOAD_LINK = 'https://sj.qq.com/appdetail/com.xuetian.jiaoyu?&from_wxz=1'
export const IOS_APP_DOWNLOAD_LINK = 'https://apps.apple.com/cn/app/%E5%AD%A6%E5%A4%A9%E6%95%99%E8%82%B2/id1510507128'
export const SOURCE_THIRD_CHANNEL_CODE = '1f0c0c'
export const CRM_CHANNEL_FIRST = '公司运营' // CRM一级渠道  252895 公司运营
export const CRM_CHANNEL_SECOND = '平台' // CRM二级渠道 252921 平台
export const enum CrmChannelThird {
  H5 = 'M站',
  Special = '专题'
}
export const apiEnv: EnvType = (import.meta.env?.VITE_APP_ENV as EnvType) || 'development'
const wxAppIdMaps = {
  production: 'wx3164de3f9582d05a',
  test: 'wx3164de3f9582d05a',
  development: 'wx66254d6c863ecee5'
}
export const wxAppId = wxAppIdMaps[apiEnv]
export const AliAppId = '2018081861043823'

const wxConfigAppTypeMaps = {
  production: 'XtTeacherMp',
  development: 'XTH5',
  test: 'XTH5'
}
export const wxConfigAppType = wxConfigAppTypeMaps[apiEnv]

const wxOriginAppIdMaps = {
  production: 'gh_2e928f70e58f',
  test: 'gh_2e928f70e58f',
  development: 'gh_2e928f70e58f'
}
export const wxOriginAppId = wxOriginAppIdMaps[apiEnv]
/** ***************************  接口请求地址 start  ****************************** */
const baseUrlMap = {
  production: 'https://xtapi.xuetian.cn',
  test: 'https://testxtapi.xuetian.cn',
  development: 'https://devxtapi.xuetian.cn'
}
export const baseURL = baseUrlMap[apiEnv]

const dataServiceUrlMap = {
  development: 'https://devxtapi.xuetian.cn/data-service',
  test: 'https://testxtapi.xuetian.cn/data-service',
  production: 'https://dsw.xuetian.cn'
}
export const dataServiceUrl = dataServiceUrlMap[apiEnv]
/** ***************************  接口请求地址 end  ****************************** */

/** ***************************  Cookie相关 start  ****************************** */
const VERSION = 'V2.0.0' // 版本号与资讯m站要保持一致
export const storePrefix = `XT_SCHOOL_H5_${VERSION || ''}`

const cPrefix = {
  production: `${storePrefix}_PROD_`,
  development: `${storePrefix}_DEV_`,
  test: `${storePrefix}_TEST_`
}
export const cookiePrefix = cPrefix[apiEnv]
export const cookieDomain = import.meta.env?.VITE_NODE_ENV === 'production' ? '.xuetian.cn' : ''
/** ***************************  Cookie相关 end  ****************************** */

/** ***************************  广告位 start  ****************************** */
export const AD_POSITION = {
  // HOME_BANNER: 'MNEWS/HOME/BANNER', // 首页banner
  // HOME_ADV: 'MNEWS/HOME/ADV', // 首页项目下方广告
  COURSE_CENTER_BANNER: 'M/COURSE_CENTER/BANNER' // 选课中心banner
}
/** ***************************  广告位 end  ****************************** */
// 主站地址
const mSchoolUrlMap = {
  production: 'https://m.xuetian.cn',
  test: 'https://testm.xuetian.cn',
  development: 'https://devm.xuetian.cn'
}
export const mSchoolUrl = mSchoolUrlMap[apiEnv]
