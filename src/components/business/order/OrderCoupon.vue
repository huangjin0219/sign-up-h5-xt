<!--
 * @Author: jiangruohui
 * @Date: 2022-04-20 15:45:27
 * @LastEditors: jiangruohui
 * @LastEditTime: 2022-04-27 16:24:44
 * @Description: 订单优惠券
-->
<template>
  <div class="xt-block">
    <Cell title="优惠券" icon="shop-o" @click="onClick">
      <template #icon>
        <SvgIcon class="icon-coupon" name="coupon-o" />
      </template>
      <template #value>
        <span v-if="couponInfo" class="price">{{ $filters.currency(-couponDeductionAmount, null, '￥', 2) }}</span>
        <span v-else>点击使用</span>
      </template>
      <template v-if="editable" #right-icon>
        <SvgIcon class="icon-next" name="next" />
      </template>
    </Cell>
  </div>
</template>

<script lang="ts" setup>
import { Coupon } from '@/typings/coupon'
import { Cell } from 'vant'

interface Props {
  couponInfo?: Coupon // 优惠券
  couponDeductionAmount?: number // 优惠金额
  editable?: boolean // 是否可编辑
}

withDefaults(defineProps<Props>(), {
  couponInfo: undefined,
  couponDeductionAmount: 0
})

const emit = defineEmits(['click'])

const onClick = () => {
  emit('click')
}
</script>
<script lang="ts">
export default {
  name: 'OrderCoupon'
}
</script>

<style lang="scss" scoped>
@import '@/styles/var.scss';
@import '@/styles/mixin.scss';

:deep(.van-cell) {
  padding: 13px 15px;
  color: #333;
  border-radius: $box-border-radius;
  .van-cell__title {
    flex: 0 0 60px;
  }
  .van-cell__value {
    color: #999;
  }
}
.icon-coupon {
  margin: 3px 8px 3px 0;
  font-size: 17px;
  color: $fuchsin;
}
.icon-next {
  margin: 6px 0 6px 7px;
  font-size: 12px;
  color: #999;
}
.price {
  color: $fuchsin;
}
</style>
