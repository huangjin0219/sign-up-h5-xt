/*
 * @Author: jiangruohui
 * @Date: 2022-08-29 16:16:35
 * @LastEditors: 曹双双
 * @LastEditTime: 2022-11-03 13:48:00
 * @Description:
 */
import wx from 'weixin-js-sdk'
import { useMainStore } from '@/store'
import { wxOriginAppId } from '@/config/index'
import XTJsBridge from '@/utils/xtJsBridge'

interface NavigateInfo {
  url: string
  type?: 'push' | 'replace' | 'switchTab'
}

export default function useNavigate() {
  const router = useRouter()
  const mainStore = useMainStore()

  /**
   * 路由跳转
   * @param h5 h5跳转信息（路径，方式）
   * @param minipro 小程序跳转信息（路径，方式）
   */
  const navigateTo = (h5: NavigateInfo, minipro: NavigateInfo) => {
    if (mainStore.uaEnv === 'minipro') {
      const { url, type } = minipro
      if (type === 'replace') {
        wx.miniProgram.redirectTo({ url })
      } else if (type === 'switchTab') {
        wx.miniProgram.switchTab({ url })
      } else {
        wx.miniProgram.navigateTo({ url })
      }
    } else {
      const { url, type } = h5
      if (type === 'replace') {
        router.replace(url)
      } else {
        router.push(url)
      }
    }
  }

  /**
   * app，企微和小程序环境跳转小程序
   * @param {path} 微信小程序路径
   */
  const navigateToMini = (url: string, type: 'push' | 'replace' | 'switchTab') => {
    switch (mainStore.uaEnv) {
      case 'app':
        XTJsBridge.bridgeH5CallNative(
          'openMiniProgram',
          {
            userName: wxOriginAppId,
            path: url
          },
          null
        )
        break
      case 'wxwork':
        break
      default:
        if (type === 'replace') {
          wx.miniProgram.redirectTo({ url })
        } else if (type === 'switchTab') {
          wx.miniProgram.switchTab({ url })
        } else {
          wx.miniProgram.navigateTo({ url })
        }
        break
    }
  }

  return {
    navigateTo,
    navigateToMini
  }
}
