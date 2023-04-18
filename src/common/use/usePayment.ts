/*
 * @Author: jiangruohui
 * @Date: 2022-04-21 18:02:45
 * @LastEditors: jiangruohui
 * @LastEditTime: 2022-12-08 11:52:52
 * @Description: 选择地址
 */
import { Toast } from 'vant'
import wxJsSDK from 'weixin-js-sdk'
import { wxAppId, AliAppId } from '@/config/index'
import { envWeixinCheck, envAliPayCheck, encrypt64 } from '@/utils/index'
import { getOrderPaymentFlowCode, paymentOrder, paymentPrePay, queryPayChannel } from '@/common/api/order'
import { PayChannel, PayScene, PayWay } from '@/utils/enum'
import { PayChannelParam } from '@/typings/pay'
import { LocationQueryRaw } from 'vue-router'
import wxJs from '@/utils/wxJs'
import { useMainStore } from '@/store'

export default function usePayment() {
  const router = useRouter()
  const route = useRoute()
  const mainStore = useMainStore()
  const payChannelParamList = ref(<{ [propName: string]: PayChannelParam }>{})
  const isWeiXinEnv = envWeixinCheck() // 是否是微信环境
  const isAliPayEnv = envAliPayCheck() // 是否是支付宝环境
  let wx: any = null // 微信
  let wxpayPackageData: any = null // 微信支付组包

  const getPaySuccessUrl = (params: any) => {
    return `/pay/success${params.orderCode ? `?orderCode=${params.orderCode}` : ''}`
  }
  /**
   * 进入支付页面
   */
  const enterPay = (params: { orderCode: string; amount: number }, curPage?: string) => {
    // 生成收银台流水号
    getOrderPaymentFlowCode(params).then(
      (res: any) => {
        const { orderFlowCode } = res.data
        if (mainStore.uaEnv === 'minipro') {
          // 小程序
          const url = `/user/pages/pay/index?orderCode=${params.orderCode}&flow=${orderFlowCode}&curPage=${curPage}`
          if (curPage === 'confirmOrder') {
            wxJsSDK.miniProgram.redirectTo({ url })
          } else {
            wxJsSDK.miniProgram.navigateTo({ url })
          }
        } else if (isWeiXinEnv) {
          // 微信环境下微信授权， 重定向到选择支付方式页面
          const redirectUrl = `${window.location.origin}/xtm/pay/${params.orderCode}?flow=${orderFlowCode}`
          const openUrl = `https://open.weixin.qq.com/connect/oauth2/authorize?appid=${wxAppId}&redirect_uri=${encodeURIComponent(
            redirectUrl
          )}&response_type=code&scope=snsapi_base&state=123#wechat_redirect`
          window.location.href = openUrl
        } else {
          router.push(`/pay/${params.orderCode}?flow=${orderFlowCode}`)
        }
      },
      () => {
        // 确认订单页面创建流水失败，就进入订单详情页，避免反复创建订单
        if (curPage === 'confirmOrder') {
          if (mainStore.uaEnv === 'minipro') {
            wxJsSDK.miniProgram.redirectTo({ url: `/user/pages/order/detail/index?orderCode=${params.orderCode}` })
          } else {
            router.push(`/user/order/${params.orderCode}`)
          }
        }
      }
    )
  }

  /**
   * 进入预支付页面
   */
  const enterPrePay = (prePaymentNo: string) => {
    // 微信环境下微信授权， 重定向到选择支付方式页面
    if (isWeiXinEnv) {
      const redirectUrl = `${window.location.origin}/xtm/prePay/pay/${prePaymentNo}`
      const openUrl = `https://open.weixin.qq.com/connect/oauth2/authorize?appid=${wxAppId}&redirect_uri=${encodeURIComponent(
        redirectUrl
      )}&response_type=code&scope=snsapi_base&state=123#wechat_redirect`
      window.location.href = openUrl
    } else {
      router.push(`/prePay/pay/${prePaymentNo}`)
    }
  }

  /**
   * 获取支付方式
   * @param userToken ios内嵌支付页带userToken
   */
  const getPayChannel = (payScene?: number, appCode?: string, userToken?: string) => {
    /**
     * 支付方式与支付场景对应关系（场景 - 支付方式 - 备注）
     * 微信H5支付 - 微信JSAPI支付 或者 兴业银行公众号支付
     * H5支付 - 支付宝手机网站支付 - 通过浏览器唤起支付宝客户端进行付款
     * 支付宝h5 - 兴业银行服务窗支付
     */
    if (!payScene) {
      payScene = PayScene.H5
      if (isWeiXinEnv) {
        payScene = PayScene.WechatJsApi
      } else if (isAliPayEnv) {
        payScene = PayScene.AliPayAuthH5
      }
    }
    queryPayChannel({
      payScene,
      appCode,
      userToken
    }).then((res: any) => {
      payChannelParamList.value = res.data?.payChannelParamList || []
      res.data?.payChannelParamList.forEach((item: PayChannelParam) => {
        if (item.payWay === PayWay.WechatJSAPI) {
          initWxPay()
        }
      })
    })
  }

  /** 支付 */
  const pay = (params: any, payChannelParam: PayChannelParam) => {
    if (payChannelParam.payChannel === PayChannel.Wechat) {
      if (payChannelParam.payWay === PayWay.XingYeWechatJSAPI) {
        xingYeWechatPay(params, payChannelParam)
      } else {
        wechatPay(params, payChannelParam)
      }
    } else if (payChannelParam.payChannel === PayChannel.Alipay) {
      if (payChannelParam.payWay === PayWay.XingYeAlipayH5) {
        xingYeAliPay(params, payChannelParam)
      } else {
        aliPay(params, payChannelParam)
      }
    }
  }

  /**
   * 支付宝支付
   */
  const aliPay = (params: any, payChannelParam: PayChannelParam) => {
    getPayPackage(params, payChannelParam).then((res: any) => {
      router.push({
        path: '/pay/alipay-guide',
        query: encrypt64({
          ...params,
          packageData: res.data.packageData
        }) as LocationQueryRaw
      })
    })
  }
  /**
   * 支付宝支付(兴业银行)
   */
  const xingYeAliPay = (params: any, payChannelParam: PayChannelParam) => {
    ;(window as any).ap.getAuthCode(
      {
        appId: AliAppId,
        scopes: ['auth_base']
      },
      function (res: any) {
        getPayPackage({ ...params, thirdCode: res.authCode }, payChannelParam).then((res: any) => {
          const { packageData } = res.data
          const { pay_info: PayInfo } = JSON.parse(packageData) || {}
          const { tradeNO } = JSON.parse(PayInfo) || {}
          ;(window as any).ap.tradePay(
            {
              tradeNO
            },
            function (resultCode: string) {
              if (resultCode !== '9000') Toast(`交易结果：${resultCode}`)
              // router.push(getPaySuccessUrl(params))
            }
          )
        })
      }
    )
  }
  /**
   * 微信支付API初始化
   */
  const initWxPay = () => {
    wxJs.init(['chooseWXPay']).then((wxObj: any) => {
      wx = wxObj
    })
  }
  /**
   * 微信支付
   */
  const wechatPay = async (params: any, payChannelParam: PayChannelParam) => {
    if (!wxpayPackageData) {
      await getWxPayPackage(params, payChannelParam)
    }

    const { appId, timeStamp: timestamp, nonceStr, signType, paySign } = wxpayPackageData
    wx?.chooseWXPay({
      appId,
      timestamp,
      nonceStr,
      package: wxpayPackageData?.package,
      signType,
      paySign,
      success(res: any) {
        if (res.errMsg === 'chooseWXPay:ok') {
          // 处理成功
          router.push(getPaySuccessUrl(params))
        } else {
          Toast('支付失败')
        }
      },
      cancel() {
        Toast('支付失败')
      }
    })
  }
  /**
   * 微信支付(兴业银行)
   */
  const xingYeWechatPay = async (params: any, payChannelParam: PayChannelParam) => {
    if (!wxpayPackageData) {
      await getWxPayPackage(params, payChannelParam)
    }

    const { appId, timeStamp: timestamp, nonceStr, signType, paySign } = wxpayPackageData
    ;(window as any).WeixinJSBridge?.invoke(
      'getBrandWCPayRequest',
      {
        appId,
        timeStamp: timestamp,
        nonceStr, // 随机串
        package: wxpayPackageData?.package,
        signType,
        paySign
      },
      function (res: any) {
        if (res.err_msg === 'get_brand_wcpay_request:ok') {
          // 使用以上方式判断前端返回,微信团队郑重提示：
          // res.err_msg将在用户支付成功后返回ok，但并不保证它绝对可靠。
          router.push(getPaySuccessUrl(params))
        } else {
          Toast('支付失败')
        }
      }
    )
  }

  /**
   * 构造入参
   * @param inApp ios内嵌页面，回调地址不同
   */
  const genParams = (params: any, payChannelParam: PayChannelParam, inApp?: boolean) => {
    const { appCode, payChannel, payRouteId, payScene } = payChannelParam
    const paramsObj = {
      ...params,
      payKernelParam: {
        appCode,
        payChannel,
        payRouteId,
        payScene,
        returnUrl: inApp
          ? `${window.location.origin}/xtm/app/pay/success`
          : `${window.location.origin}/xtm${getPaySuccessUrl(params)}`
      }
    }
    return paramsObj
  }

  /**
   * 获取微信支付组包
   */
  const getWxPayPackage = (params: any, payChannelParam: PayChannelParam) => {
    return new Promise((resolve, reject) => {
      if (route.query.code) {
        const paramsObj = genParams(params, payChannelParam)
        paramsObj.thirdCode = route.query.code as string
        if (params.orderCode) {
          paymentOrder(paramsObj)
            .then((res: any) => {
              wxpayPackageData = JSON.parse(res.data.packageData)
              resolve(wxpayPackageData)
            })
            .catch(() => {
              reject()
            })
        } else if (params.prePaymentNo) {
          paymentPrePay(paramsObj)
            .then((res: any) => {
              wxpayPackageData = JSON.parse(res.data.packageData)
              resolve(wxpayPackageData)
            })
            .catch(() => {
              reject()
            })
        }
      } else {
        reject()
      }
    })
  }

  /**
   * 获取支付宝支付组包
   * @param inApp ios内嵌页面，回调地址不同
   */
  const getPayPackage = (params: any, payChannelParam: PayChannelParam, inApp?: boolean) => {
    return new Promise((resolve, reject) => {
      const paramsObj = genParams(params, payChannelParam, inApp)
      if (params.orderCode) {
        paymentOrder(paramsObj)
          .then((res) => {
            resolve(res)
          })
          .catch(() => {
            reject()
          })
      } else if (params.prePaymentNo) {
        paymentPrePay(paramsObj)
          .then((res) => {
            resolve(res)
          })
          .catch(() => {
            reject()
          })
      }
    })
  }

  return {
    payChannelParamList,
    getPayChannel,
    getPayPackage,
    enterPay,
    enterPrePay,
    pay
  }
}
