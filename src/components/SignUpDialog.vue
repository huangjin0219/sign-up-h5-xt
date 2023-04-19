<!--
 * @Author: HuZhangjie
 * @Date: 2020-07-02 10:08:43
 * @LastEditors: huangjin
 * @LastEditTime: 2023-04-19 11:17:31
 * @Description: 基础弹窗组件
-->

<template>
  <transition name="fade">
    <div class="base-dialog">
      <div class="dialog-content">
        <img class="dialog-close__icon" src="@/assets/images/icon_close@2x.png" @click="handleClose" />
        <slot></slot>
      </div>
    </div>
  </transition>
</template>

<script lang="ts" setup>
interface Props {
  show?: boolean
}
const props = withDefaults(defineProps<Props>(), {
  show: false
})
const { show } = toRefs(props)
const emit = defineEmits(['close'])
const handleClose = () => {
  show.value = false
  emit('close')
}
</script>

<style lang="scss" scoped>
.base-dialog {
  display: flex;
  justify-content: center;
  align-items: center;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  overflow: auto;
  z-index: 9999;
  background: rgba(0, 0, 0, 0.7);
  .dialog-content {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    position: relative;
    width: 270px;
    min-height: 246px;
    max-height: 430px;
    overflow: auto;
    background-color: #fff;
    .dialog-close__icon {
      position: absolute;
      top: 10px;
      right: 10px;
      width: 17px;
      height: 17px;
    }
  }
}
</style>
