<!--
 * @Author: jiangruohui
 * @Date: 2022-04-20 14:41:03
 * @LastEditors: jiangruohui
 * @LastEditTime: 2022-12-09 17:42:33
 * @Description: 订单商品
-->
<template>
  <div class="m-goods-item">
    <div class="goods-main">
      <Image class="goods-pic" fit="cover" :src="imageUrl || defaultCoursePic">
        <template #error>
          <img src="@/assets/images/default/course.png" alt="" />
        </template>
      </Image>
      <div class="goods-right">
        <div class="item-name">{{ productName }}</div>
        <div class="goods-item__bottom">
          <div class="item-price">
            <template v-if="realPrice !== originalPrice">
              <span class="sale-price"> ¥{{ $filters.currency(realPrice, null, '', 2) }} </span>
              <span class="original-price"> ¥{{ $filters.currency(originalPrice) }} </span>
            </template>
            <template v-else>
              <span class="sale-price"> ¥{{ $filters.currency(realPrice) }} </span>
            </template>
          </div>
          <div v-if="previewContract" class="contract" @click="checkContract">预览课程合同</div>
        </div>
      </div>
    </div>
    <div v-if="availableStatus && couponInfo" class="coupon flex-row">
      生效优惠券：
      <div class="coupon-desc">
        满{{ $filters.currency(couponInfo.useMoneyRestrict || 0)
        }}{{
          couponInfo.couponsType === CouponType.Discount
            ? '享' + couponInfo.couponsFaceValue + '折'
            : '减' + $filters.currency(couponInfo.couponsFaceValue)
        }}
      </div>
    </div>

    <!-- <div v-if="!noBottomBorder" class="bottom-border" /> -->
  </div>
</template>

<script lang="ts" setup>
import { Image } from 'vant'
import { Coupon } from '@/typings/coupon'
import { CouponType } from '@/utils/enum'
import { encrypt64 } from '@/utils/index'
import defaultCoursePic from '@/assets/images/default/course.png'

interface Props {
  enter?: 'confirmOrder' | 'orderDetail'
  originalPrice: number
  activityPrice: number
  realPrice: number
  imageUrl: string
  productName: string
  startClassTime?: number | null
  closeClassTime?: number | null
  availableStatus?: boolean // 是否能使用优惠券（确认订单页面）
  couponInfo?: Coupon | null // 优惠券（确认订单页面）
  productCode: string
  previewContract: boolean // 是否显示 预览课程合同 按钮
}
const props = withDefaults(defineProps<Props>(), {
  enter: 'orderDetail',
  availableStatus: false,
  startClassTime: null,
  closeClassTime: null,
  couponInfo: null,
  previewContract: false
})

const router = useRouter()

// const emit = defineEmits(['delete-goods'])

// const handleItemClick = () => {
//   emit('delete-goods')
// }
/**
 * 查看合同
 */
const checkContract = () => {
  const query = encrypt64({
    productCode: props.productCode,
    shouldPayAmount: props.realPrice
  }) as { data: string }
  router.push(`/user/contract/detail?data=${query.data}`)
}
</script>
<script lang="ts">
export default {
  name: 'OrderGoodsItem'
}
</script>
<style lang="scss" scoped>
@import '@/styles/var.scss';
@import '@/styles/mixin.scss';

.orange-tag {
  display: inline-block;
  height: 14px;
  margin-right: 5px;
  line-height: 14px;
  font-size: 10px;
  color: #ff6f30;
  padding: 0 2px;
  border: 1px solid #ff6f30;
  border-radius: 2px;
}

.m-goods-item {
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: 15px;
  background: #fff;
  // border-top: 1rpx solid #eee;
  border-radius: $box-border-radius;

  .goods-main {
    display: flex;
  }

  .goods-right {
    flex-grow: 1;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
  }

  .item-name {
    font-size: 15px;
    line-height: 20px;
    color: #333;
    @include text-ellipsis(2);
  }
  .goods-item__bottom {
    display: flex;
    justify-content: space-between;
    align-items: center;
    .contract {
      color: #999;
    }
    .item-price {
      .sale-price {
        font-size: 12px;
        line-height: 17px;
        color: $primary;
        letter-spacing: 1px;
      }
      .original-price {
        margin-left: 5px;
        font-size: 12px;
        color: #999;
        text-decoration: line-through;
      }
    }
  }

  .goods-pic {
    flex-shrink: 0;
    width: 99px;
    height: 66px;
    margin-right: 10px;
    border-radius: $pic-border-radius;
    background: #666;
    :deep(.van-image__img) {
      border-radius: 4px;
    }
    :deep(img) {
      width: 99px;
      height: 66px;
      border-radius: 4px;
    }
  }

  .coupon {
    margin-top: 12px;
    font-size: 11px;
    line-height: 16px;
    color: #999;

    .coupon-desc {
      padding: 0 4px;
      height: 14px;
      font-size: 10px;
      color: $orange;
      line-height: 14px;
      border-radius: 2px;
      border: 1px solid $orange;
    }
  }
}

.bottom-border {
  position: absolute;
  bottom: 0;
  left: 50%;
  transform: translateX(-50%);
  width: 315px;
  height: 1px;
  background: #eee;
}
</style>
