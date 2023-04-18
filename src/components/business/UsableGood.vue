<template>
  <div class="u-package-item" @click="handleItemClick">
    <div class="package-item-top">
      <div v-if="pack.canUseConpons" class="mark">限量优惠券</div>
      <p class="package-name">{{ pack.name }}</p>
      <div class="feature-labels">
        <template v-for="(label, index) in pack?.markingLabels">
          <div v-if="index < 3" :key="index" class="feature-label">{{ label }}</div>
        </template>
      </div>
      <div v-if="pack.teacherModel && pack.teacherModel.length" class="teacher-blocks">
        <div v-for="(item, index) in pack.teacherModel" :key="item.teacherCode">
          <div v-if="index < 3" class="teacher-block">
            <img :src="item.teacherImageUrl || teacherAvatarPng" />
            <p class="teacher-name">{{ item.teacherName }}</p>
          </div>
        </div>
      </div>
      <div v-else class="teacher-blocks">
        <div class="teacher-block">
          <img src="@/assets/images/default/teacher_avatar.png" />
          <p class="teacher-name">学天名师</p>
        </div>
      </div>
    </div>
    <div class="package-item-bottom">
      <p class="apply-num">{{ pack.visitNum || '0' }}人已学习</p>
      <div class="package-price">
        <p class="price">
          <template v-if="pack.canUseConpons">
            <span class="original-price">￥{{ $filters.currency(pack.salePrice) }}</span>
            <span class="sale-price discount">
              ￥<span class="strong">{{ $filters.currency(pack.discountSalePrice) }}</span>
              <span>起</span>
            </span>
          </template>
          <span v-else class="sale-price">
            ￥<span class="strong">{{ $filters.currency(pack.salePrice) }}</span>
            <span>起</span>
          </span>
        </p>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import teacherAvatar from '@/assets/images/default/teacher_avatar.png'
import useNavigate from '@/common/use/useNavigate'
import { ProductGroupItem } from '@/typings/course'

interface Props {
  pack: ProductGroupItem
}
const { navigateTo } = useNavigate()
const props = withDefaults(defineProps<Props>(), {
  pack: () => {
    return { teacherModel: [] }
  }
})
const teacherAvatarPng = ref(teacherAvatar)
// 按钮点击
const handleItemClick = () => {
  const { productGroupCode } = props.pack
  navigateTo(
    { url: `/course/detail/${productGroupCode}` },
    { url: `/course/pages/productGroupDetail/index?code=${productGroupCode}` }
  )
}
</script>

<style lang="scss" scoped>
@import '@/styles/var.scss';
@import '@/styles/mixin.scss';

.u-package-item {
  position: relative;
  display: flex;
  flex-direction: column;
  margin: 15px 15px 0 15px;
  padding: 18px 15px 0;
  width: 345px;
  background: #fff;
  border-radius: $box-border-radius;
  box-sizing: border-box;

  .mark {
    position: absolute;
    top: 19px;
    right: 0;
    width: 68px;
    height: 22px;
    font-size: 12px;
    color: #fff;
    line-height: 22px;
    text-align: center;
    background: $gradient-fuchsin;
    border-radius: 50px 0 0 50px;
  }

  .package-name {
    margin-right: 30px;
    font-size: 16px;
    font-weight: $font-bold;
    color: #333;
    line-height: 22px;
    @include text-ellipsis;
  }

  .feature-labels {
    display: flex;
    align-items: center;
    margin-top: 10px;

    .feature-label {
      padding: 0 6px;
      margin-right: 8px;
      height: 20px;
      color: #767a88;
      font-size: 11px;
      line-height: 20px;
      text-align: center;
      background: #f2f2f2;
      border-radius: 2px;
    }
  }

  .package-item-bottom {
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 45px;
    font-size: 12px;
    line-height: 17px;
    color: #999;
    border-top: 1px solid $border-color;
  }

  .teacher-blocks {
    display: flex;
    flex-wrap: wrap;
    margin-top: 18px;
    margin-bottom: 18px;
    margin-left: -9px;
    height: 57px;
    overflow: hidden;

    .teacher-block {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      width: 72px;
      font-size: 12px;
      color: #666;
      line-height: 17px;

      img {
        margin-bottom: 4px;
        width: 36px;
        height: 36px;
        border-radius: 50%;
        background: linear-gradient(310deg, rgba(230, 232, 233, 0.97) 0%, #e8ebf3 0%, #f5f7fb 100%);
      }

      .teacher-name {
        width: 60px;
        text-align: center;
        @include ellipsis();
      }
    }
  }

  .package-price {
    flex: 1;
    display: flex;
    flex-direction: column;
    align-items: flex-end;

    .original-price {
      margin-right: 6px;
      text-decoration: line-through;
    }

    .sale-price {
      color: $primary;

      &.discount {
        color: $fuchsin;
      }

      .strong {
        font-size: 18px;
        line-height: 25px;
      }
    }
  }

  &.indiscount {
    .package-name {
      margin-right: 68px;
    }
    .package-item-bottom {
      height: 68px;
    }
  }
}
</style>
