<!--
 * @Author: jiangruohui
 * @Date: 2022-07-26 09:31:56
 * @LastEditors: jiangruohui
 * @LastEditTime: 2022-12-06 15:44:06
 * @Description: 
-->
<template>
  <div class="pdf-container">
    <!-- <link rel="stylesheet" href="/pdfh5/style.css" />
    <link rel="stylesheet" href="/pdfh5/pdfh5.css" /> -->
    <div id="pdf-body"></div>
  </div>
</template>

<script lang="ts" setup>
/**
 * sdk demo https://gitee.com/pjjg/pdfh5#%E5%AE%9E%E4%BE%8B%E5%8C%96
 */
import Pdfh5 from 'pdfh5'
import { Toast } from 'vant'

interface Props {
  url?: string
}

const props = withDefaults(defineProps<Props>(), {
  url: ''
})

onMounted(() => {
  initAction()
})

const initAction = () => {
  if (!props.url) return

  // pdf实体
  const pdfEntity = new Pdfh5('#pdf-body', {
    pdfurl: props.url,
    scrollEnable: true,
    zoomEnable: true,
    scale: 1
  })

  pdfEntity.on('ready', () => {
    // console.log(`总页数：${pdfEntity.totalNum}`)
  })
  // pdfEntity.on('complete', (status: string, msg: string, time: string) => {
  pdfEntity.on('complete', (status: string) => {
    switch (status) {
      case 'success':
        break
      case 'error':
        Toast('文件加载失败')
        break

      default:
        break
    }
    // console.log(`状态：${status}，信息：${msg}，耗时：${time}毫秒，总页数：${pdfEntity.totalNum}`)
  })
}
</script>
<style lang="scss">
// @import '@/styles/pdfh5/style.css';
@import '@/styles/pdfh5/pdfh5.css';
</style>
<style lang="scss" scoped>
.pdf-container {
  width: 100%;
  height: 100%;
  #pdf-body {
    width: 100%;
    height: 100%;
  }
}
</style>
