/* eslint-disable vue/no-v-html */ /* eslint-disable vue/no-lone-template */
<!--
 * @Author: liushuainan
 * @LastEditors: jiangruohui
 * @Date: 2022-04-07 15:42:30
 * @LastEditTime: 2022-12-15 15:41:08
 * @FilePath: \xuetian_service_center\src\components\CouponItem.vue
-->
<template>
  <div v-if="couponList && couponList.length" class="coupon-wrap">
    <div
      v-for="(item, index) in couponList"
      :key="index"
      :style="{ opacity: props.disabled ? 0.4 : 1 }"
      :class="['coupon-item', { 'coupon-item-discount': item.exchangeCoupons === ExchangeCoupon?.Exchange }]"
      @click="handleCuponChoose(item)"
    >
      <div class="coupon-content">
        <div class="content-left">
          <p>
            <span v-if="item.couponsType === CouponType.DirectReduction" class="mark">￥</span>
            <span v-if="item.couponsType === CouponType.DirectReduction" class="face-value">{{
              $filters.currency(item.couponsFaceValue)
            }}</span>
            <span v-else class="face-value">{{ item.couponsFaceValue }}</span>
            <span v-if="item.couponsType === CouponType.Discount">折</span>
          </p>
          <p class="full-minus">满{{ $filters.currency(item.useMoneyRestrict) || 0 }}可用</p>
        </div>
        <div class="content-right">
          <div class="content-title">{{ item.couponsName }}</div>
          <div class="content-right-center">
            <!-- <div v-if="item.exchangeCoupons === ExchangeCoupon?.Exchange" class="coupon-surplus">限量剩余5张</div> -->
            <div class="coupon-date">
              <span v-if="item.useValidTimeType === CouponEffectiveTime.FixedTime">
                {{ $filters.date(item.validStartTime, 'YY.MM.dd') }}至{{ $filters.date(item.validEndTime, 'YY.MM.dd') }}
              </span>
              <span v-else-if="item.useValidTimeType === CouponEffectiveTime.SlideTime && !item.useValidHour">
                {{ $filters.date(item.useStartTime, 'YY.MM.dd') }}至{{ $filters.date(item.useEndTime, 'YY.MM.dd') }}
              </span>
              <span v-else> {{ time(item.useValidHour * 60 * 60) }}内有效 </span>
            </div>
            <button v-if="buttonText" class="use-button" @click="handleEnter(item)">{{ buttonText }}</button>
          </div>
          <!-- 选中的优惠券 -->
          <SvgIcon
            v-if="isCuponChoose && item.couponsCode === couponsCode"
            class="iconfont cupon-choose"
            color="#F73265"
            name="cupon-choose"
          />
          <div v-if="isDescription" class="content-right-bottom" @click.stop="handleMoreInfo(index)">
            <div class="coupon-info">更多信息</div>
            <SvgIcon
              class="iconfont xt-arrow"
              :color="item.exchangeCoupons === ExchangeCoupon?.Exchange ? '#E7A466' : '#c2c2c2'"
              :name="isExpandArr.includes(index) ? 'circle-arrow-up' : 'circle-arrow-down'"
            />
          </div>
        </div>
      </div>
      <div v-if="isExpandArr.includes(index) && isDescription" class="coupon-detail" v-html="item.description"></div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { CouponType, CouponEffectiveTime, ExchangeCoupon } from '@/utils/enum'
import { Coupon } from '@/typings/coupon'

interface Props {
  couponList: Array<Coupon>
  isDescription?: boolean
  buttonText?: string
  disabled?: boolean
  isCuponChoose?: boolean
  couponsCode?: string | null // 选中的优惠券码
}
const props = withDefaults(defineProps<Props>(), {
  couponList: () => {
    return []
  },
  buttonText: '',
  isDescription: true,
  disabled: false,
  isCuponChoose: false,
  couponsCode: null
})
const isExpandArr = ref<Array<number>>([])
const emit = defineEmits(['change'])
// 更多信息
const handleMoreInfo = (item: number) => {
  const expandIndex = isExpandArr.value.indexOf(item)
  if (expandIndex !== -1) {
    isExpandArr.value.splice(expandIndex, 1)
  } else {
    isExpandArr.value.push(item)
  }
}
// 按钮点击
const handleEnter = (item: any) => {
  emit('change', item)
}
// 选择优惠券
const handleCuponChoose = (item: any) => {
  if (props.isCuponChoose) {
    emit('change', item)
  }
}

const time = (val: number | null): any => {
  if (!val) {
    return val
  }
  val = parseInt(`${val}`, 10)
  const days = parseInt(`${val / (3600 * 24)}`, 10)
  const h = parseInt(`${(val / 3600) % 24}`, 10)
  let time = ''
  if (days) {
    time = `${days}天`
  }
  if (h) {
    time += `${h}小时`
  }
  return time
}
</script>

<style lang="scss" scoped>
@import '@/styles/var.scss';
@import '@/styles/mixin.scss';

.coupon-item {
  width: 345px;
  margin: auto 15px;
  background: #fff;
  border-radius: 8px;
  margin-bottom: 15px;

  .coupon-content {
    border-radius: 8px;
    box-shadow: 0px 2px 9px 0px rgba(0, 0, 0, 0.08);
    height: 100%;
    display: flex;
    height: 100px;
    .content-left {
      width: 100px;
      background: url('https://oss.xuetian.cn/multimedia_knowledge/R1800308fdb90265_cupon_red@2x.png') no-repeat;
      background-size: 100%;
      color: #fff;
      font-size: 13px;
      text-align: center;
      display: flex;
      flex-direction: column;
      justify-content: center;
      .full-minus {
        font-size: 13px;
        line-height: 30px;
      }
      p:nth-child(1) {
        .mark {
          letter-spacing: 0;
          font-size: 13px;
        }
        .face-value {
          margin-left: -4px;
          @include font(32px, 34px, 500);
        }
      }
    }

    .content-right {
      position: relative;
      flex: 1;
      display: flex;
      flex-direction: column;
      padding: 0 12px;
      font-size: 12px;
      .cupon-choose {
        position: absolute;
        right: 0;
        top: 0;
        width: 32px;
        height: 32px;
      }
      .content-title {
        @include text-ellipsis(1);
        font-size: 16px;
        margin-top: 15px;
      }
      .content-right-center {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 11px;
        height: 28px;
        .use-button {
          width: 68px;
          height: 28px;
          background-color: #f73265;
          border-radius: 16px;
          font-size: 13px;
          color: #fff;
        }
        .coupon-surplus {
          color: #ff6f30;
        }

        .coupon-date {
          color: $font-light-gray;
        }
      }
      .content-right-bottom {
        display: flex;
        justify-content: space-between;
        color: $font-light-gray;
        border-top: 1px dashed #999;
        padding-top: 7px;
        .xt-arrow {
          width: 13px;
          height: 13px;
          color: #333 !important;
          // border: 1px solid red;
        }
      }
    }
  }

  .coupon-detail {
    padding: 15px;
    color: $font-light-gray;
    @include font(12px, 16px, 400);
  }
}

.coupon-item-discount {
  background: #ffedcb;
  .coupon-content {
    .content-left {
      background: url('https://oss.xuetian.cn/multimedia_knowledge/R1800872976902s7_cupon_golden@2x.png') no-repeat;
      background-size: 100%;
      .face-value {
        margin-left: 0 !important;
        @include font(32px, 34px, 500);
      }
    }
    .content-right {
      .content-right-bottom {
        border-top: 1px dashed #e7a466;
      }
    }
  }
}
</style>
