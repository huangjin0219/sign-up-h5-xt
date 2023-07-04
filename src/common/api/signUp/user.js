import request from '@/utils/request'

// 发送验证码
export function sendVerifyCode(params) {
  return request({
    url: '/uic/verifyCode/sendLoginVerifyCode',
    method: 'post',
    data: params
  })
}

// 登录
export function registerOrLogin(params, options = { toast: true }) {
  return request({
    url: '/uic/user/registerOrLogin',
    method: 'post',
    data: params,
    options
  })
}

// 发送验证码-重置报名手机号
export function sendVerifyDxdkCode(params) {
  return request({
    url: '/uic/verifyCode/sendDxdkCode',
    method: 'post',
    data: params
  })
}

// 获取全部地区
export function getAllArea(params = {}, options = {}) {
  return request({
    url: '/uic/area/getAllArea',
    method: 'post',
    data: params,
    options
  })
}

// 获取省列表
export function getProvince(params = {}, options = {}) {
  return request({
    url: '/uic/area/getProvince',
    method: 'post',
    data: params,
    options
  })
}

// 获取市列表
export function getCity(params = { provinceId: '' }, options = {}) {
  return request({
    url: '/uic/area/getCity',
    method: 'post',
    data: params,
    options
  })
}

// 获取地区列表
export function getArea(params = { cityId: '' }, options = {}) {
  return request({
    url: '/uic/area/getArea',
    method: 'post',
    data: params,
    options
  })
}
