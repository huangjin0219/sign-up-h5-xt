/*
 * @Description: 报名C端接口
 */
import service from '@/utils/request'

/**
 * @method: request
 * @description: 这里直接返回 res.data
 * @param {Object}
 * @return: Promise
 */
function request(config) {
  return new Promise((resolve, reject) => {
    service(config)
      .then((res) => {
        res = res.data || null
        resolve(res)
      })
      .catch((err) => {
        reject(err)
      })
  })
}
// 报名链接检查
export function enrollCheck(params) {
  return request({
    url: '/sign-up-business/newSignUp/check',
    method: 'post',
    data: params,
    options: {
      toast: true
    }
  })
}

// 报名链接确定信息查询
export function acquireConfirmInfo(params) {
  return request({
    url: '/sign-up-business/newSignUp/acquireConfirmInfo',
    method: 'post',
    data: params,
    options: {
      login: true,
      toast: true
    }
  })
}

// 报名信息确定
export function cmdConfirm(params, options = {}) {
  options = Object.assign(options, { login: true, toast: true })
  return request({
    url: '/sign-up-business/newSignUp/confirm',
    method: 'post',
    data: params,
    options
  })
}

// 填写报名信息的template列表
export function queryTemplateList(params) {
  return request({
    url: '/sign-up-business/newSignUp/acquireInputTemplate',
    method: 'post',
    data: params,
    options: {
      toast: true
    }
  })
}

// 获取规则详情
export function getRuleDetail(params) {
  return request({
    url: '/sign-up-business/newSignUp/ruleDetail',
    method: 'post',
    data: params,
    options: {
      toast: true
    }
  })
}

// 获取 补充资料的template列表
export function queryAddInfoTemplateList(params) {
  return request({
    url: '/sign-up-business/newSignUp/acquireSupplement',
    method: 'post',
    data: params,
    options: {
      toast: true
    }
  })
}

// 填写用户填写信息和审核结果信息
export function queryCustomerInfo(params) {
  return request({
    url: '/sign-up-business/newSignUp/acquireCustomerInfo',
    method: 'post',
    data: params,
    options: {
      toast: true
    }
  })
}

// 保存用户信息
export function saveCustomerInfo(params) {
  return request({
    url: '/sign-up-business/newSignUp/submit',
    method: 'post',
    data: params,
    options: {
      toast: true
    }
  })
}

// 获取订单上的用户信息
export function queryInfoFromOrder(params) {
  return request({
    url: '/sign-up-business/newSignUp/queryInfoFromOrder',
    method: 'post',
    data: params,
    options: {
      toast: true
    }
  })
}

// 提交 补充资料
export function submitAddInfo(params) {
  return request({
    url: '/sign-up-business/newSignUp/supplement',
    method: 'post',
    data: params,
    options: {
      toast: true
    }
  })
}
