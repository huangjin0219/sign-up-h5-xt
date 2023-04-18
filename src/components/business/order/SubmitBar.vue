<!--
 * @Author: jiangruohui
 * @Date: 2022-04-24 15:33:04
 * @LastEditors: jiangruohui
 * @LastEditTime: 2023-01-07 17:52:56
 * @Description: 提交栏
-->
<template>
  <div class="m-submit-bar">
    <!-- <div class="submit-bar-height"> -->
    <div v-if="editable" class="edit-block">
      <Field
        v-model="inputValue"
        :placeholder="`请输入支付金额，最低¥${$filters.currency(lowestRefundAmount, null, '', 2)}`"
        type="number"
        :formatter="formatter"
        format-trigger="onBlur"
      >
        <template #left-icon>¥</template>
        <!-- <template #right-icon><SvgIcon name="close-fill" /></template> -->
      </Field>
    </div>
    <div v-if="!editable" class="order-price">
      <span class="symbol">￥</span>
      <span class="strong">{{ $filters.currency(price, 'integer') }}</span>
      <span class="symbol">.{{ $filters.currency(price, 'decimal') }}</span>
    </div>
    <div class="action-btns">
      <VanButton type="primary" round class="submit-btn" @click="handleSubmitClick">去支付</VanButton>
    </div>
    <!-- </div> -->
  </div>
</template>

<script lang="ts" setup>
import { Field, Toast } from 'vant'
import filters from '@/common/filters/index'

interface Props {
  price: number
  editable?: boolean
  lowestRefundAmount?: number
}
const props = withDefaults(defineProps<Props>(), {
  price: 0,
  editable: false,
  lowestRefundAmount: 0
})
const { price } = toRefs(props)
const emit = defineEmits(['click'])
// const inputValue = ref<number>(price.value / 100)
const inputValue = ref<number>(0)
const { editable, lowestRefundAmount } = toRefs(props)

const formatter = (value: string) => {
  const val = +value
  if (val * 100 >= lowestRefundAmount.value && val * 100 <= price.value) {
    return value
  }
  return ''
}

/**
 * 购买按钮点击事件
 */
const handleSubmitClick = () => {
  if (editable.value && inputValue.value * 100 < lowestRefundAmount.value) {
    const price = filters.currency(lowestRefundAmount.value, null, '', 2)
    Toast(`请输入支付金额，最低¥${price}`)
    return false
  }
  emit('click')
}

defineExpose({ inputValue })
</script>
<script lang="ts">
export default {
  name: 'SubmitBar'
}
</script>

<style lang="scss" scoped>
@import '@/styles/var.scss';
@import '@/styles/mixin.scss';
.m-submit-bar {
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 15px;
  height: calc($submit-bar-height + constant(safe-area-inset-bottom));
  height: calc($submit-bar-height + env(safe-area-inset-bottom));
  background: #fff;
  box-shadow: 0 -3px 9px 0 rgba(0, 0, 0, 0.04);
  padding-bottom: constant(safe-area-inset-bottom);
  padding-bottom: env(safe-area-inset-bottom);

  .van-cell {
    display: flex;
    align-items: flex-end;
    padding: 0;
    color: $fuchsin;
    :deep(.van-field__left-icon) {
      font-size: 13px;
    }
    :deep(.van-field__control) {
      font-size: 25px;
      color: $fuchsin;
      line-height: 36px;
      &::-webkit-input-placeholder {
        font-size: 13px;
      }
    }
  }
  .edit-block .van-cell {
    padding-left: 8px;
    padding-right: 8px;
    background: #f5f5f6;
    color: #333;
    :deep(.van-field__left-icon) {
      line-height: 36px;
    }
    :deep(.van-field__control) {
      color: #333;
      &::-webkit-input-placeholder {
        position: absolute;
        padding: 10px 0;
        vertical-align: middle;
      }
    }
  }
  .order-price {
    display: flex;
    align-items: baseline;
    font-size: 14px;
    line-height: 20px;
    color: $fuchsin;
    .symbol {
      font-size: 13px;
    }
    .strong {
      font-size: 24px;
    }
  }
  .action-btns {
    display: flex;
  }

  .submit-btn {
    margin-left: 20px;
    width: 115px;
    height: 41px;
    font-size: 16px;
  }
}
</style>
