<!--
 * @Author: jiangruohui
 * @Date: 2022-04-20 16:09:11
 * @LastEditors: jiangruohui
 * @LastEditTime: 2023-03-10 10:50:25
 * @Description: 订单信息(价格)
-->
<template>
  <div class="xt-block order-info-block">
    <Cell
      class="original-price"
      :class="{ 'line-through': showCoupon }"
      title="原价"
      :value="$filters.currency(originalPrice, null, '￥', 2)"
      :border="false"
    />
    <template v-if="whetherAdjustAmount === WhetherAdjustAmountStatus.UnadjustedAmount">
      <!-- <Cell
        v-if="reduceAmount"
        class="activity-price"
        title="限时优惠"
        :value="$filters.currency(reduceAmount, null, '￥', 2)"
        :border="false"
      /> -->

      <Cell
        v-if="showCoupon"
        class="coupon-price"
        title="优惠券"
        :value="$filters.currency(-couponDeductionAmount, null, '￥', 2)"
        :border="false"
      />
    </template>
    <Cell
      v-if="whetherAdjustAmount === WhetherAdjustAmountStatus.AdjustmentAmount"
      class="coupon-price"
      title="专属优惠"
      :value="$filters.currency(-couponDeductionAmount, null, '￥', 2)"
      :border="false"
    />
    <Cell
      v-if="cashCouponDeductionAmount"
      class="coupon-price"
      title="学天红包"
      :value="$filters.currency(-cashCouponDeductionAmount, null, '￥', 2)"
      :border="false"
    />
    <div class="total-amount">
      <p>合计:</p>
      <p class="amount">
        ¥<span class="strong">{{ $filters.currency(realPrice, null, '', 2) }}</span>
      </p>
    </div>
    <!-- <template v-if="orderStatus === ORDER_STATUS_PAID">
      <Divider />
      <Cell
        v-if="+invoiceData.invoiceSupport === INVOICE_ORDER_SUPPORT"
        title="发票信息"
        :value="+invoiceData.invoiceTimeOut === INVOICE_TIME_OUT ? '订单已超出开票时限' : invoiceData.invoiceStatusDesc"
        is-link
        :border="false"
        @click="invoiceClick"
      />
      <Cell v-if="includeMaterialType" title="物流信息" :value="logisticsInfo" :border="false" />
    </template>
    <template v-if="orderStatus === ORDER_STATUS_PAID && payType">
      <Divider />
      <Cell title="支付方式" :value="payTypeLabel" :border="false" />
    </template> -->
  </div>
</template>

<script lang="ts" setup>
import { Cell } from 'vant'
import { WhetherAdjustAmountStatus } from '@/utils/enum'

interface Props {
  originalPrice?: number // 原价
  activityPrice?: number // 活动价 这期不做
  realPrice?: number // 合计
  couponDeductionAmount?: number // 优惠总金额
  showCoupon?: boolean // 是否显示优惠券信息
  whetherAdjustAmount?: number // 是否调整优惠金额
  cashCouponDeductionAmount?: number // 红包金额
}

// 采用ts专有声明，有默认值
const props = withDefaults(defineProps<Props>(), {
  originalPrice: 0,
  activityPrice: 0,
  realPrice: 0,
  couponDeductionAmount: 0,
  showCoupon: true,
  whetherAdjustAmount: 0,
  cashCouponDeductionAmount: 0
})
const { originalPrice } = toRefs(props)

// const reduceAmount = computed(() => {
//   return activityPrice.value - originalPrice.value
// })
</script>
<script lang="ts">
export default {
  name: 'OrderInfo'
}
</script>

<style lang="scss" scoped>
@import '@/styles/var.scss';
@import '@/styles/mixin.scss';

.order-info-block {
  display: flex;
  flex-direction: column;
  padding: 9px 15px 6px;
  font-size: 13px;
  line-height: 19px;
  color: #333;
  :deep(.van-cell) {
    padding: 6px 0;
    color: #666;
    .van-cell__title {
      flex: 0 0 60px;
    }
    .van-cell__value {
      color: #333;
    }
  }
  .van-divider {
    margin: 6px 0;
  }
  .total-amount {
    display: flex;
    justify-content: flex-end;
    margin-top: 6.5px;
    margin-bottom: 10px;
    .amount {
      margin-left: 10px;
      color: $primary;

      .strong {
        font-size: 16px;
      }
    }
  }

  .original-price.line-through :deep(.van-cell__value) {
    color: #999;
    text-decoration: line-through;
  }
  .coupon-price :deep(.van-cell__value) {
    color: $fuchsin;
  }
}
</style>
