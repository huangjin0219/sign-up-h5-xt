const API_ENV = process.env.VUE_APP_ENV || 'development'
const NODE_ENV = process.env.NODE_ENV

export const bizType = '1009'

/** ***************************  Cookie相关 start  *******************************/
let cPrefix = ''
let cDomain = ''

// 本地开发环境
if (NODE_ENV === 'development' && API_ENV === 'development') {
  cPrefix = 'BIM_LOCAL_'
  cDomain = 'xuetian.cn'
}
// 本地测试环境
if (NODE_ENV === 'development' && API_ENV === 'testing') {
  cPrefix = 'BIM_LOCAL_'
  cDomain = 'xuetian.cn'
}
// 本地正式环境
if (NODE_ENV === 'development' && API_ENV === 'production') {
  cPrefix = 'BIM_LOCAL_'
  cDomain = 'xuetian.cn'
}
// 线上开发环境
if (NODE_ENV === 'production' && API_ENV === 'development') {
  cPrefix = 'BIM_DEV_'
  cDomain = 'xuetian.cn'
}
// 线上测试环境
if (NODE_ENV === 'production' && API_ENV === 'testing') {
  cPrefix = 'BIM_TEST_'
  cDomain = 'xuetian.cn'
}
// 线上正式环境
if (NODE_ENV === 'production' && API_ENV === 'production') {
  cPrefix = 'BIM_PROD_'
  cDomain = 'xuetian.cn'
}

export const cookiePrefix = cPrefix
export const cookieDomain = cDomain
