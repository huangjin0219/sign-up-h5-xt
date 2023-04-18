<!--
 * @Description: 
 * @version: 1.0.0
 * @Author: 曹双双
 * @Date: 2023-02-24 15:34:36
 * @LastEditors: 曹双双
 * @LastEditTime: 2023-03-23 11:15:48
-->
<template>
  <div class="share-guide" @click="emit('close')">
    <img class="guide-pic" src="https://oss.xuetian.cn/multimedia_knowledge/R186825fd2bc0030_caozuozhiyin.png" alt="" />
    <div class="guide-text">
      <p>第一步 点击右上角“...”</p>
      <p>第二步 选择“转发给朋友”</p>
    </div>
  </div>
</template>
<script lang="ts" setup>
const emit = defineEmits(['close'])
</script>
<style lang="scss" scoped>
.share-guide {
  position: fixed;
  left: 0;
  top: 0;
  width: 100vw;
  height: 100vh;
  background: rgba(0, 0, 0, 0.6);

  .guide-pic {
    position: absolute;
    top: 30px;
    right: 30px;
    width: 100px;
  }

  .guide-text {
    position: absolute;
    top: 240px;
    left: 50px;
    color: #fff;
    font-size: 16px;
    line-height: 30px;
    font-weight: 500;
  }
}
</style>
