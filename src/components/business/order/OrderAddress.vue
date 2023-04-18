<!--
 * @Author: jiangruohui
 * @Date: 2022-04-15 10:05:35
 * @LastEditors: jiangruohui
 * @LastEditTime: 2022-08-22 18:03:42
 * @Description: 订单地址
-->
<template>
  <div class="xt-block m-order-address" @click="handleItemClick">
    <div v-if="!name && enableChange" class="address-content no-address">
      <p class="to-add-address">无收货地址，去添加</p>
      <p class="address-describe">课程教材(赠品)将邮寄到此地址</p>
    </div>
    <div v-if="name" class="address-content">
      <div class="user-info flex-row">
        <p class="user-name">{{ name }}</p>
        <p class="user-mobile">{{ mobile }}</p>
        <div v-if="defaultFlag" class="default-tag">默认</div>
      </div>
      <p class="address-detail">{{ address }}</p>
    </div>
    <SvgIcon v-if="enableChange" class="icon-next" name="next" />
    <img class="address-divider" src="@/assets/images/order/address_divider@2x.png" />
  </div>
</template>

<script lang="ts" setup>
import SvgIcon from '@/components/SvgIcon.vue'

interface Props {
  name?: string // 收件人
  mobile?: string | undefined // 联系方式
  address?: string // 详细地址
  defaultFlag?: number // 是否是默认地址
  enableChange?: boolean // 是否支持修改地址
}

// 采用ts专有声明，有默认值
const props = withDefaults(defineProps<Props>(), {
  name: '',
  mobile: '',
  address: '',
  defaultFlag: 0,
  enableChange: false
})
const { name, mobile, address, defaultFlag, enableChange } = toRefs(props)
const emit = defineEmits(['click'])

const handleItemClick = () => {
  if (enableChange.value) {
    emit('click')
  }
}
</script>
<script lang="ts">
export default {
  name: 'OrderAddress'
}
</script>

<style lang="scss" scoped>
@import '@/styles/var.scss';
@import '@/styles/mixin.scss';

.m-order-address {
  position: relative;
  display: flex;
  align-items: center;
  padding: 13px 12px 13px 15px;

  .address-content {
    flex: 1;
    display: flex;
    flex-direction: column;
    justify-content: center;
    &.no-address {
      font-size: 18px;
      line-height: 25px;
      color: #333;
      .address-describe {
        margin-top: 8px;
        font-size: 12px;
        line-height: 16.5px;
        color: #999;
      }
    }
    .user-info {
      align-items: center;
      color: #333;
      @include font(16px, 22.5px, 500);
      .user-mobile {
        margin-left: 15px;
      }
      .default-tag {
        margin-left: 15px;
        padding: 0 3px;
        height: 16px;
        @include font(10px, 16px, normal);
        color: #fff;
        text-align: center;
        background: $orange;
        border-radius: 2.5px;
      }
    }
    .address-detail {
      margin-top: 9px;
      font-size: 13px;
      line-height: 18.5px;
      color: #666;
      word-break: break-all;
    }
  }
  .icon-next {
    flex-shrink: 0;
    font-size: 12px;
    color: #c4c4c4;
  }
  .address-divider {
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    width: 345px;
    height: 3px;
  }
}
</style>
