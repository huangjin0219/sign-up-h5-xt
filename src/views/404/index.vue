<!--
 * @Author: jiangruohui
 * @Date: 2020-07-17 09:27:22
 * @LastEditors: jiangruohui
 * @LastEditTime: 2022-03-15 16:46:14
 * @Description: 404
-->
<template>
  <div>
    <img class="not-found-img" src="@/assets/images/404.png" alt="404" />
  </div>
</template>

<script lang="ts">
export default {
  name: 'NotFound'
}
</script>

<style lang="scss" scoped>
.not-found-img {
  width: 300px;
  position: fixed;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -100%);
}
</style>
