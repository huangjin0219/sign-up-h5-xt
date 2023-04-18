import request from '@/utils/request'

// 发送验证码
export function sendVerifyCode(params) {
  return request({
    url: '/verifyCode/sendLoginVerifyCode',
    method: 'post',
    data: params,
    options: {
      domain: 'uic'
    }
  })
}

// 登录
export function registerOrLogin(params, options = { toast: true }) {
  options = Object.assign(options, { domain: 'uic' })
  return request({
    url: '/user/registerOrLogin',
    method: 'post',
    data: params,
    options
  })
}

// 发送验证码-重置报名手机号
export function sendVerifyDxdkCode(params) {
  return request({
    url: '/verifyCode/sendDxdkCode',
    method: 'post',
    data: params,
    options: {
      domain: 'uic'
    }
  })
}
