/*
 * @Description: 报名C端接口
 */
import request from '@/utils/request'

// 报名链接检查
export function enrollCheck(params) {
  return request({
    url: '/signUp/check',
    method: 'post',
    data: params,
    options: {
      domain: 'crm-business',
      toast: true
    }
  })
}

// 报名链接确定信息查询
export function acquireConfirmInfo(params) {
  return request({
    url: '/signUp/acquireConfirmInfo',
    method: 'post',
    data: params,
    options: {
      domain: 'crm-business',
      login: true,
      toast: true
    }
  })
}

// 报名信息确定
export function cmdConfirm(params) {
  return request({
    url: '/signUp/confirm',
    method: 'post',
    data: params,
    options: {
      domain: 'crm-business',
      login: true,
      toast: true
    }
  })
}

// 填写报名信息的template列表
export function queryTemplateList(params) {
  return request({
    url: '/signUp/acquireInputTemplate',
    method: 'post',
    data: params,
    options: {
      toast: true,
      domain: 'crm-business'
    }
  })
}

// 获取 补充资料的template列表
export function queryAddInfoTemplateList(params) {
  return request({
    url: '/signUp/acquireSupplement',
    method: 'post',
    data: params,
    options: {
      toast: true,
      domain: 'crm-business'
    }
  })
}

// 填写用户填写信息和审核结果信息
export function queryCustomerInfo(params) {
  return request({
    url: '/signUp/acquireCustomerInfo',
    method: 'post',
    data: params,
    options: {
      toast: true,
      domain: 'crm-business'
    }
  })
}

// 保存用户信息
export function saveCustomerInfo(params) {
  return request({
    url: '/signUp/submit',
    method: 'post',
    data: params,
    options: {
      toast: true,
      domain: 'crm-business'
    }
  })
}

// 提交 补充资料
export function submitAddInfo(params) {
  return request({
    url: '/signUp/supplement',
    method: 'post',
    data: params,
    options: {
      toast: true,
      domain: 'crm-business'
    }
  })
}
