/*
 * @Author: jiangruohui
 * @Date: 2022-05-10 16:13:38
 * @LastEditors: jiangruohui
 * @LastEditTime: 2022-11-30 15:06:28
 * @Description: 网签
 */
import { Toast } from 'vant'
import { getSignOrderByCode, onesign } from '@/common/api/learning-center/signonline'
import { useUserStore } from '@/store/index'

export default function useSignOnline() {
  const route = useRoute()
  const userStore = useUserStore()
  const orderCode = ref<string>('') // 是否是在iframe打开
  const isIframe = ref<boolean>(true) // 是否是在iframe打开
  const stepNum = ref<number>(1) // 第几步骤
  const authentication = ref<boolean>(false) // 是否已实名认证
  const certificationInfo = ref() // 实名信息
  const shortUrl = ref<string>('') // 网签链接
  const onesignError = ref<string>('') // 一步网签错误信息

  // 小程序打开当前页面，需要打开对应小程序页面
  if (route.query.env === 'minipro') {
    stepNum.value = 0
  }

  watch(stepNum, (value) => {
    if (value === 2) {
      // 签署方式为一步发起签署
      const { productCode, productVersion, userProductRightId, saleProductType, city, from } = route.query
      const fromString = from ? `from=${encodeURIComponent(from as string)}` : ''
      const extendsParams = productCode
        ? `productCode=${productCode}&productVersion=${productVersion}&userProductRightId=${userProductRightId}&saleProductType=${saleProductType}&city=${
            city === 'true'
          }&${fromString}`
        : fromString
      const loading = Toast.loading({ duration: 0 })
      try {
        onesign({ orderCode: orderCode.value, extend: extendsParams }, { hideErrMsg: true }).then(
          (res: any) => {
            loading.clear()
            shortUrl.value = res?.data?.shortUrl
          },
          (res) => {
            loading.clear()
            onesignError.value = res?.message
          }
        )
      } catch (error) {
        loading.clear()
      }
    }
  })

  onMounted(() => {
    // 网签回调地址会在iframe里打开。如果页面在iframe里打开，就认为网签成功，刷新页面
    if (window.self.location !== window.top?.location) {
      window.parent.location.href = window.self.location.href
      return
    }
    isIframe.value = false
    orderCode.value = route.query.orderCode as string
    checkAuthentication().then(() => {
      getSignOrderByCode({ orderCode: orderCode.value }, { hideErrMsg: true }).then(
        () => {
          // 已实名认证并网签
          stepNum.value = 3
        },
        () => {
          // 未网签
          if (route.query.cb) {
            // 实名认证回调页面
            stepNum.value = 1
          } else {
            stepNum.value = 2
          }
        }
      )
    })
  })
  /**
   * 下一步
   */
  const handleToNextStep = (value: number) => {
    stepNum.value = value
  }
  /**
   * 校验是否实名
   */
  const checkAuthentication = (options = { hideErrMsg: true }) => {
    return new Promise((resolve, reject) => {
      userStore
        .getUserInfoByToken(userStore.user?.userToken as string, { hideErrMsg: options.hideErrMsg })
        .then((res: any) => {
          authentication.value = res?.certificationType === 1 || res?.certificationType === 2
          if (authentication.value) {
            certificationInfo.value = res
            resolve(res)
          } else {
            // 未实名认证
            stepNum.value = 1
            reject()
          }
        })
    })
  }

  return {
    isIframe,
    stepNum,
    authentication,
    certificationInfo,
    shortUrl,
    onesignError,
    handleToNextStep
  }
}
