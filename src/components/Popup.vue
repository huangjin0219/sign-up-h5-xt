<!--
 * @Author: jiangruohui
 * @Date: 2022-04-14 10:11:09
 * @LastEditors: jiangruohui
 * @LastEditTime: 2022-04-24 14:17:24
 * @Description: 
-->
<template>
  <VanPopup :show="props.show" :position="props.position" class="m-popup" @close="close">
    <div class="popup-container" :class="{ 'has-footer': btnText }">
      <SvgIcon class="icon-close" name="close-fill" @click="close" />
      <div v-if="title" class="popup__header">{{ title }}</div>
      <slot />
      <div v-if="btnText" class="popup__footer">
        <div class="confirm-btn" :class="btnClass" @click="onFooterClick">{{ btnText }}</div>
      </div>
    </div>
  </VanPopup>
</template>

<script lang="ts" setup>
// import type { PopupProps } from 'vant'
import { PopupPosition } from 'vant'

interface Props {
  show: boolean
  position?: PopupPosition
  title?: string
  btnText?: string
  btnClass?: string
}

// 采用ts专有声明，有默认值
const props = withDefaults(defineProps<Props>(), {
  show: true,
  position: 'bottom',
  title: '',
  btnText: '',
  btnClass: ''
})
const emit = defineEmits(['update:show', 'close', 'btn-click'])

const close = () => {
  emit('close')
  emit('update:show', false)
}
const onFooterClick = () => {
  emit('btn-click')
}
</script>
<script lang="ts">
export default {
  name: 'XtPopup'
}
</script>

<style lang="scss" scoped>
@import '@/styles/var.scss';
@import '@/styles/mixin.scss';

:deep(.van-popup) {
  border-radius: 12px 12px 0 0;
}
.m-popup {
  .popup-container {
    width: 100%;
    height: 456px;
    padding-bottom: constant(safe-area-inset-bottom);
    padding-bottom: env(safe-area-inset-bottom);
    overflow: hidden;

    &.has-footer {
      padding-bottom: calc(58px + constant(safe-area-inset-bottom));
      padding-bottom: calc(58px + env(safe-area-inset-bottom));
    }
  }
  .icon-close {
    position: absolute;
    padding: 7px;
    top: 8px;
    right: 8px;
    font-size: 34px;
    color: #d8d8d8;
    z-index: 100;
  }
  .popup__header {
    position: relative;
    height: 50px;
    line-height: 50px;
    text-align: center;
    font-weight: $font-bold;
    font-size: 18px;
    color: #333;
    background: #fff;
  }
  .popup__footer {
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    padding: 7px 15px;
    padding-bottom: calc(constant(safe-area-inset-bottom) + 7px);
    padding-bottom: calc(env(safe-area-inset-bottom) + 7px);

    .confirm-btn {
      width: 345px;
      height: 44px;
      font-size: 16px;
      color: #fff;
      line-height: 44px;
      text-align: center;
      background: $primary;
      border-radius: 22px;
    }

    .btn.disable {
      background: #ccc;
    }
  }
}
</style>
