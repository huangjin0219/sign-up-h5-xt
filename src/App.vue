<!--
 * @Author: jiangruohui
 * @Date: 2022-03-14 14:42:23
 * @LastEditors: jiangruohui
 * @LastEditTime: 2022-12-13 17:08:51
 * @Description: 
-->
<template>
  <router-view v-slot="{ Component }">
    <transition name="router-fade" mode="out-in">
      <keep-alive v-if="$route.meta.keepAlive">
        <component :is="Component" />
      </keep-alive>
      <component :is="Component" v-else />
    </transition>
  </router-view>
</template>

<script setup lang="ts">
import wx from 'weixin-js-sdk'
import XTJsBridge from '@/utils/xtJsBridge'
import { useMainStore } from '@/store/index'

/**
 * 判断当前浏览器环境
 * 为了使用方便，uaEnv存了两个地方，1.依赖注入(组件) 2.store(js文件)
 */
const useMain = useMainStore()
type UaEnvType = 'minipro' | 'app' | 'h5' | 'wxwork'
const uaEnv = ref<UaEnvType>('h5')
provide('uaEnv', uaEnv)

let uaEnvValue: UaEnvType = 'h5'
const ua = navigator.userAgent.toLowerCase()

onMounted(() => {
  // 初始化uuid
  useMain.refreshUuid()

  // 判断当前浏览器环境
  if (XTJsBridge.bridgeInjected) {
    uaEnvValue = 'app'
  }
  if (/wxwork/i.test(ua)) {
    uaEnvValue = 'wxwork'
  }
  uaEnv.value = uaEnvValue
  useMain.setUaEnv(uaEnvValue)

  wx?.miniProgram.getEnv(function (res: any) {
    if (res.miniprogram) {
      uaEnv.value = 'minipro'
      useMain.setUaEnv('minipro')
    }
  })
})

// this.SET_UA_ENV({ type: 'minipro', value: 1004 })
// this.SET_UA_ENV({ type: 'app', value: 1001 })
// this.SET_UA_ENV({ type: 'h5', value: 1005 })
</script>

<style lang="scss">
.router-fade-enter-active,
.router-fade-leave-active {
  transition: opacity 0.3s;
}
.router-fade-enter-from,
.router-fade-leave-active {
  opacity: 0;
}
</style>
