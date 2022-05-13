/*
 * @Author: HuZhangjie
 * @Date: 2020-07-11 15:19:41
 * @LastEditors: HuZhangjie
 * @LastEditTime: 2020-07-14 16:46:51
 * @Description: 通用数据的请求
 */
import request from '@/utils/request'

// 查询省市区
export function getAreaList (params) {
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
export function getNationList (params) {
  return request({
    url: '/data-config-api/dcDictionaryData/acquireList',
    method: 'post',
    data: params,
    options: {
      domain: 'setting'
    }
  })
}
