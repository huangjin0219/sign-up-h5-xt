import { BIZ_TYPE } from '@/config'
import request, { RequestConfigOptions } from '@/utils/request'

/**
 * @method: addTalent
 * @description: 人才信息 - 登记
 * @param {*} params 请求参数
 * @param {RequestConfigOptions} options 配置
 * @return {*}
 */
export function addTalent(params = {}, options = <RequestConfigOptions>{}) {
  options = Object.assign(options, { login: true })
  return request({
    url: '/oa-business/talent/addTalent',
    method: 'post',
    data: {
      bizType: BIZ_TYPE,
      ...params
    },
    options
  })
}

/**
 * @method: addTalent
 * @description: 人才信息 - 登记
 * @param {*} params { mobile } 请求参数
 * @param {RequestConfigOptions} options 配置
 * @return {*}
 */
export function sendMobileCode(params = {}, options = <RequestConfigOptions>{}) {
  options = Object.assign(options, { login: true })
  return request({
    url: '/oa-business/talent/sendMobileCode',
    method: 'post',
    data: {
      bizType: BIZ_TYPE,
      ...params
    },
    options
  })
}

export default {}
