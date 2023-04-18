/*
 * @Author: jiangruohui
 * @Date: 2020-12-02 09:46:13
 * @LastEditors: jiangruohui
 * @LastEditTime: 2022-04-21 14:25:16
 * @Description:
 */

import request, { RequestConfigOptions } from '@/utils/request'

/**
 * @method: queryDefaultAddress
 * @description: 查询默认地址
 */
export function queryDefaultAddress(params = {}, options = <RequestConfigOptions>{}): Promise<any> {
  options = Object.assign(options, { login: true })
  return request({
    url: '/uic/address/getDefaultAddress',
    method: 'post',
    data: { ...params },
    options
  })
}

/**
 * @method: deleteAddress
 * @description: 删除地址
 * @param {Number} addressId 地址ID
 */
export function deleteAddress({ addressId = '' }, options = <RequestConfigOptions>{}): Promise<any> {
  return request({
    url: '/uic/address/deleteAddress',
    method: 'post',
    data: { addressId },
    options
  })
}

// 新增地址
export function addAddress(
  { name = '', mobile = '', provinceId = '', cityId = '', areaId = '', defaultFlag = '', address = '', userToken = '' },
  options = <RequestConfigOptions>{}
): Promise<any> {
  return request({
    url: '/uic/address/addAddress',
    method: 'post',
    data: {
      name,
      mobile,
      provinceId,
      cityId,
      areaId,
      defaultFlag,
      address,
      userToken
    },
    options
  })
}

// 地址列表
export function getAddressList(
  { pageNum = '', pageSize = '', userToken = '' },
  options = <RequestConfigOptions>{}
): Promise<any> {
  return request({
    url: '/uic/address/getAddressList',
    method: 'post',
    data: {
      pageNum,
      pageSize,
      userToken
    },
    options
  })
}

// 修改地址
export function updateAddress(
  { addressId = '', name = '', mobile = '', provinceId = '', cityId = '', areaId = '', defaultFlag = '', address = '' },
  options = <RequestConfigOptions>{}
): Promise<any> {
  return request({
    url: '/uic/address/updateAddress',
    method: 'post',
    data: {
      addressId,
      name,
      mobile,
      provinceId,
      cityId,
      areaId,
      defaultFlag,
      address
    },
    options
  })
}

// 获取全部地区
export function getAllArea(params = {}, options = <RequestConfigOptions>{}): Promise<any> {
  return request({
    url: '/uic/area/getAllArea',
    method: 'post',
    data: params,
    options
  })
}

// 获取省列表
export function getProvince(params = {}, options = <RequestConfigOptions>{}): Promise<any> {
  return request({
    url: '/uic/area/getProvince',
    method: 'post',
    data: params,
    options
  })
}

// 获取市列表
export function getCity({ provinceId = '' }, options = <RequestConfigOptions>{}): Promise<any> {
  return request({
    url: '/uic/area/getCity',
    method: 'post',
    data: { provinceId },
    options
  })
}

// 获取地区列表
export function getArea({ cityId = '' }, options = <RequestConfigOptions>{}): Promise<any> {
  return request({
    url: '/uic/area/getArea',
    method: 'post',
    data: { cityId },
    options
  })
}
