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
