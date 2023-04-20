/*
 * @Author: HuZhangjie
 * @Date: 2020-07-11 15:19:41
 * @LastEditors: huangjin
 * @LastEditTime: 2023-04-19 17:14:41
 * @Description: 通用数据的请求
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
        res = res.value || null
        resolve(res)
      })
      .catch((err) => {
        reject(err)
      })
  })
}
// 查询省市区
export function getAreaList(params) {
  return request({
    url: '/data-config-api/dcArea/acquireListByLayers',
    method: 'post',
    data: params,
    options: {
      domain: 'setting',
      toast: true
    }
  })
}

// 查询民族
export function getNationList(params) {
  return request({
    url: '/data-config-api/dcDictionaryData/acquireList',
    method: 'post',
    data: params,
    options: {
      domain: 'setting'
    }
  })
}
