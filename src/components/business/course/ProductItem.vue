<!--
 * @Author: jiangruohui
 * @Date: 2022-07-26 09:31:56
 * @LastEditors: jiangruohui
 * @LastEditTime: 2022-08-15 15:41:09
 * @Description: 
-->
<template>
  <div v-if="product" class="product-block">
    <div class="left">
      <img :src="product?.imageUrl" alt="" class="img" />
    </div>
    <div class="right">
      <div class="name">{{ product.productName }}</div>
      <div v-if="product.paperLabels" class="option-block">
        <div class="label">配套资料</div>
        <div class="value">
          {{ [...product.paperLabels, ...product.electronicLabels].join(' · ') }}
          <SvgIcon name="more" class="more-pic" @click="showDataPopup = true" />
        </div>
      </div>
    </div>
    <!-- 配套资料弹窗 -->
    <DataPopup v-model:show="showDataPopup" :selected-product="product ? [product] : []" />
  </div>
</template>

<script lang="ts" setup>
import { Product } from '@/typings/course'
import SvgIcon from '@/components/SvgIcon.vue'
import DataPopup from '@/components/business/course/DataPopup.vue'

interface Props {
  product: Product | null
}

withDefaults(defineProps<Props>(), {
  product: null
})
const showDataPopup = ref<boolean>(false) // 是否显示配套资料弹窗
</script>
<style lang="scss" scoped>
@import '@/styles/var.scss';
@import '@/styles/mixin.scss';
.product-block {
  background-color: white;
  width: 100%;
  display: flex;
  padding: 15px;
  .right {
    flex: 1;
    padding-left: 12px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    .name {
      @include text-ellipsis(2);
      font-weight: $font-bold;
      font-size: 16px;
    }
    .option-block {
      line-height: 17px;
      .label {
        font-weight: $font-bold;
        margin-bottom: 4px;
      }
      .value {
        padding-right: 30px;
        position: relative;
        @include text-ellipsis(1);
        .more-pic {
          position: absolute;
          right: 0;
          top: 2px;
        }
      }
    }
  }
  .img {
    width: 98px;
    height: 98px;
    border-radius: 4px;
  }
}
</style>
