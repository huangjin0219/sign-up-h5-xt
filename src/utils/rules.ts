/*
 * @Author: jiangruohui
 * @Date: 2022-03-29 16:13:15
 * @LastEditors: 曹双双
 * @LastEditTime: 2022-12-02 10:48:03
 * @Description:
 */
import type { FieldRule } from 'vant'

type RulesType = {
  [propName: string]: FieldRule[]
}

export const isMobile = /^1[3456789]\d{9}$/
export const rules: RulesType = {
  realName: [
    { required: true, message: '请输入姓名', trigger: 'onBlur' },
    {
      validator: (value) => {
        return value.length >= 2 && value.length <= 50
      },
      message: '请输入正确长度的姓名',
      trigger: 'onBlur'
    }
  ],
  mobile: [
    { required: true, message: '请输入手机号码', trigger: 'onBlur' },
    { pattern: isMobile, message: '手机号码格式不正确', trigger: 'onBlur' }
  ],
  captcha: [{ required: true, message: '请输入验证码', trigger: 'onBlur' }],
  idCard: [
    { required: true, message: '请输入身份证', trigger: 'onBlur' },
    { pattern: /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/, message: '身份证格式不正确', trigger: 'onBlur' }
  ],
  card: [{ required: true, message: '请输入卡号', trigger: 'onBlur' }],
  password: [{ required: true, message: '请输入密码', trigger: 'onBlur' }],
  age: [{ required: true, message: '请输入年龄', trigger: 'onBlur' }],
  wechatID: [{ required: true, message: '请输入微信号', trigger: 'onBlur' }],
  picker: [{ required: true, message: '请选择', trigger: 'onBlur' }]
}
