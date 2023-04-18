/*
 * @Author: jiangruohui
 * @Date: 2022-04-21 18:02:45
 * @LastEditors: jiangruohui
 * @LastEditTime: 2022-05-27 17:30:51
 * @Description: 获取验证码
 */

export default function useCaptcha() {
  const captchaCountdown = ref<number>(-1) // 获取验证码倒计时
  const enableGetCaptcha = ref<boolean>(true) // 是否允许获取验证码

  /**
   * 获取验证码
   */
  const getCaptcha = (fetchCaptcha: any, params: any, options = {}, time?: number, cb?: any, failCb?: any) => {
    enableGetCaptcha.value = false

    fetchCaptcha(params, { showSucMsg: true, sucMsg: '获取验证码成功', ...options })
      .then((res: any) => {
        captchaCountdown.value = time || 60
        const timer = setInterval(() => {
          if (captchaCountdown.value <= 0) {
            enableGetCaptcha.value = true
            clearInterval(timer)
          }
          captchaCountdown.value -= 1
          if (cb) {
            cb(res)
          }
        }, 1000)
      })
      .catch((err: any) => {
        captchaCountdown.value = -1
        enableGetCaptcha.value = true
        if (failCb) {
          failCb(err)
        }
      })
  }

  return {
    captchaCountdown,
    enableGetCaptcha,
    getCaptcha
  }
}
