import CryptoJS from 'crypto-js'

// 秘钥
const AES_KEY = ['0', '3', 'G', 'Y', '4', '5', 'G', 'B', '9', '3', 'U', 'F', '6', '5', 'J', 'F'].join('')
const key = CryptoJS.enc.Utf8.parse(AES_KEY)

export const encrypt = (str = '') => {
  const parseStr = CryptoJS.enc.Utf8.parse(str)
  const cipherData = CryptoJS.AES.encrypt(parseStr, key, {
    mode: CryptoJS.mode.ECB,
    padding: CryptoJS.pad.Pkcs7
  })
  const ciphertext = cipherData.toString()
  return ciphertext
}
export const decrypt = (str = '') => {
  str = str.toString()
  const plainData = CryptoJS.AES.decrypt(str, key, {
    mode: CryptoJS.mode.ECB,
    padding: CryptoJS.pad.Pkcs7
  })
  const plaintext = CryptoJS.enc.Utf8.stringify(plainData).toString()
  return plaintext
}

// const crypto = require('crypto')

// /**
//  * @util 加密、解密工具类
//  */
// class CryptoUtil {
//   /**
//      * 解密
//      * @param dataStr {string}
//      * @param key {string}
//      * @param iv {string}
//      * @return {string}
//      */
//   static Decrypt (dataStr = '', key = AES_KEY, iv = '') {
//     const cipherChunks = []
//     const decipher = crypto.createDecipheriv('aes-128-ecb', key, iv)
//     decipher.setAutoPadding(true)
//     cipherChunks.push(decipher.update(dataStr, 'base64', 'utf8'))
//     cipherChunks.push(decipher.final('utf8'))
//     return cipherChunks.join('')
//   }

//   /**
//      * 加密
//      * @param dataStr {string}
//      * @param key {string}
//      * @param iv {string}
//      * @return {string}
//      */
//   static Encrypt (dataStr = '', key = AES_KEY, iv = '') {
//     const cipherChunks = []
//     const cipher = crypto.createCipheriv('aes-128-ecb', key, iv)
//     cipher.setAutoPadding(true)
//     cipherChunks.push(cipher.update(dataStr, 'utf8', 'base64'))
//     cipherChunks.push(cipher.final('base64'))
//     // !process.client && console.log(process.memoryUsage())
//     return cipherChunks.join('')
//   }
// }

// export const encrypt = CryptoUtil.Encrypt
// export const decrypt = CryptoUtil.Decrypt
