/*
 * @Author: jiangruohui
 * @Date: 2020-10-16 16:51:27
 * @LastEditors: jiangruohui
 * @LastEditTime: 2020-10-16 17:06:54
 * @Description: 校验方法
 */

/**
 * @method: 验证手机格式
 * @description: 只校验基本的格式，以1开头的11位数字
 * @param {String} phone 手机号码
 * @return {Boolean}
 */
export const verifyPhone = (phone: string) => {
  const re = /^1\d{10}$/
  return re.test(phone)
}

/**
 * @method: 校验密码格式
 * @description: 密码由6-20位字符（字母、数字、符号）组合而成， 不能只使用一种字符。
 * @param {String} psd 密码
 * @return {Boolean}
 */
const passwordReg = /^(?![\d]+$)(?![a-zA-Z]+$)(?![^\da-zA-Z]+$).{6,20}$/
export const verifyPsd = (psd = '') => {
  // psd = psd.toString().trim()
  // 能匹配的组合为：数字+字母，数字+特殊字符，字母+特殊字符，数字+字母+特殊字符组合，而且不能是纯数字，纯字母，纯特殊字符
  // 验证用户密码: ^(?![\d]+$)(?![a-zA-Z]+$)(?![^\da-zA-Z]+$).{6,20}$
  return passwordReg.test(psd)
}

/**
 * @method: 校验邮箱格式
 * @description:
 * @param {String} mail 邮箱
 * @return {Boolean}
 */
const mailReg = /^[A-Za-z0-9\u4E00-\u9FA5]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/
export const verifyMail = (mail = '') => {
  return mailReg.test(mail)
}

/**
 * @method: 校验抬头名称
 * @description: 抬头名称：限制输入50个字，不支持空格输入；
 * @param {String} invoiceTitle 抬头名称
 * @return {Boolean}
 */
const invoiceTitleReg = /^[\u4E00-\u9FA5]{1,50}[^\s]*$/
export const verifyinvoiceTitle = (invoiceTitle = '') => {
  return invoiceTitleReg.test(invoiceTitle)
}

/**
 * @method: 校验开户银行
 * @description: 开户银行：非必填项，限制填写30个字；
 * @param {String} bank 开户银行
 * @return {Boolean}
 */
const bankReg = /^[\u4E00-\u9FA5]{1,30}[^\s]*$/
export const verifyBank = (bank = '') => {
  return bankReg.test(bank)
}

/**
 * @method: 校验银行卡号
 * @description: 银行账号：非必填项，限制填写30个字符；
 * @param {String} bankNum 银行卡号
 * @return {Boolean}
 */
const bankNumReg = /^\d{1,30}[^\s]*$/
export const verifyBankNum = (bankNum = '') => {
  return bankNumReg.test(bankNum)
}
