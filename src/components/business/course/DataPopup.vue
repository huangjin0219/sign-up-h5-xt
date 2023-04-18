<!--
 * @Author: jiangruohui
 * @Date: 2022-04-09 16:07:24
 * @LastEditors: jiangruohui
 * @LastEditTime: 2022-08-15 15:40:56
 * @Description: 配套资料弹窗
-->
<template>
  <XtPopup :show="show" title="配套资料" class="m-data-popup" btn-text="确定" @close="close" @btn-click="close">
    <div class="popup__content">
      <template v-for="product in selectedProduct" :key="product.productCode">
        <div v-if="product.paperLabels?.length || product.electronicLabels?.length" class="product-block">
          <Divider class="product-name">{{ product.abbreviationName }}</Divider>
          <div v-if="product.paperLabels?.length" class="data-block">
            <SvgIcon class="icon" name="paper" />
            <p class="title">纸质教材</p>
            <div class="labels">
              <span v-for="(label, index) in product.paperLabels" :key="index" class="label">{{ label }}</span>
            </div>
          </div>
          <div v-if="product.electronicLabels?.length" class="data-block">
            <SvgIcon class="icon" name="file" />
            <p class="title">电子资料</p>
            <div class="labels">
              <span v-for="(label, index) in product.electronicLabels" :key="index" class="label">{{ label }}</span>
            </div>
          </div>
        </div>
      </template>
    </div>
  </XtPopup>
</template>

<script lang="ts" setup>
import { Divider } from 'vant'
import XtPopup from '@/components/Popup.vue'
import { Product } from '@/typings/course'

interface Props {
  show: boolean
  selectedProduct: Array<Product>
}
withDefaults(defineProps<Props>(), {
  show: false,
  selectedProduct: () => {
    return []
  }
})
const emit = defineEmits(['update:show'])

const close = () => {
  emit('update:show', false)
}
</script>
<script lang="ts">
export default {
  name: 'CourseDataPopup'
}
</script>

<style lang="scss" scoped>
@import '@/styles/var.scss';
@import '@/styles/mixin.scss';

.m-data-popup {
  .popup__content {
    padding: 0 0 18px 15px;
    height: 386px;
    font-size: 16px;
    font-weight: $font-bold;
    color: #333;
    line-height: 22px;
    overflow-y: auto;
    .product-block {
      margin-top: 8px;
    }
    .product-name {
      margin: 0 56px 16px 41px;
    }
    .data-block {
      position: relative;
      padding-left: 31px;
      .icon {
        position: absolute;
        top: 2px;
        left: 0;
        font-size: 17px;
        color: $primary;
      }
      .labels {
        display: flex;
        flex-wrap: wrap;
        padding-top: 12px;
        padding-bottom: 4px;
      }
      .label {
        margin-right: 24px;
        margin-bottom: 12px;
        font-size: 14px;
        font-weight: 400;
        color: #666;
        line-height: 20px;
      }
    }
  }
}
</style>
