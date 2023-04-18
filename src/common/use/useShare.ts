/*
 * @Description:
 * @version: 1.0.0
 * @Author: 曹双双
 * @Date: 2023-03-23 10:29:26
 * @LastEditors: 曹双双
 * @LastEditTime: 2023-03-23 15:37:43
 */
import { useMainStore } from '@/store'
import wxJs from '@/utils/wxJs'
import XTJsBridge from '@/utils/xtJsBridge'
import { Toast } from 'vant'
import { envWeixinCheck, copyText } from '@/utils'

const isWeiXinEnv = envWeixinCheck()

const mainStore = useMainStore()

export interface ShareParams {
  title: string
  url: string
  content?: string
  image?: string // crm app的分享图标链接
  imageUrl?: string // 学天课堂app的分享图标链接
}

export default function (shareParams?: ShareParams) {
  // 小程序或者微信浏览器显示分享指引，组件在@/views/activity/components/ShareGuide
  const isShowShareGuide = ref(false)
  const { title, url, content, imageUrl } = shareParams || {}
  onMounted(() => {
    // 在组件初始化时执行，防止用户在浏览器或者小程序模式下不点击分享按钮，直接分享时分享参数错误
    wxJs.init(['updateAppMessageShareData']).then((wxObj: any) => {
      if (shareParams) {
        wxObj.updateAppMessageShareData({
          title,
          link: url,
          content,
          imageUrl
        })
      }
    })
  })
  const share = (isCrmApp = false, isList = false, ListshareParams?: ShareParams) => {
    if (isCrmApp) {
      // 调起crm app 分享方法
      XTJsBridge.bridgeH5CallNative('shareMessage', shareParams, (msg: any) => {
        if (msg.code === 1) {
          isShowShareGuide.value = false
        }
      })
    } else if (mainStore.uaEnv === 'app') {
      // 调起学天课堂 app分享方法
      XTJsBridge.bridgeH5CallNative('share', shareParams, (msg: any) => {
        if (msg.code === 1) {
          isShowShareGuide.value = false
        }
      })
    } else if (isWeiXinEnv || mainStore.uaEnv === 'minipro') {
      if (isList) {
        // 如果是列表项分享，组件初始化时还不知道分享参数，需要在点击分享按钮时执行初始化操作
        const { title, url, content, imageUrl } = ListshareParams || {}
        wxJs.init(['updateAppMessageShareData']).then((wxObj: any) => {
          wxObj.updateAppMessageShareData({
            title,
            link: url,
            content,
            imageUrl,
            success() {
              isShowShareGuide.value = true
            }
          })
        })
      } else {
        isShowShareGuide.value = true
      }
    } else {
      copyText(shareParams ? shareParams.url : window.location.href)
      Toast('链接已复制')
    }
  }

  return {
    isShowShareGuide,
    share
  }
}
