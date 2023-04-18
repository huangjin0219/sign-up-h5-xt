<!--
 * @Description:
 * @version: 1.0.0
 * @Author: 曹双双
 * @Date: 2022-09-05 16:32:01
 * @LastEditors: 曹双双
 * @LastEditTime: 2023-01-06 16:58:02
-->
<template>
  <div class="tab">
    <div class="left">
      <span class="desc">活动场景:</span>
      <span
        v-for="tab in tabs"
        :key="tab.value"
        class="tab-item"
        :class="{ active: modelValue === tab.value }"
        @click="handleClick(tab.value)"
        >{{ tab.name }}</span
      >
    </div>
    <div v-if="showRight" class="right" @click="enterNextView">已参加活动</div>
  </div>
</template>
<script lang="ts" setup>
import { ActivityTypeEnum } from '@/utils/enum'

const tabs = [
  {
    name: '免费资料',
    value: ActivityTypeEnum.FreeSpell
  },
  {
    name: '课程拼团',
    value: ActivityTypeEnum.PaidSpell
  }
]

interface Props {
  modelValue: number
  showRight?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  modelValue: ActivityTypeEnum.FreeSpell,
  showRight: true
})
const { modelValue } = toRefs(props)
const emit = defineEmits(['update:modelValue', 'go-participate'])

/**
 * 如果点击的不是当前tab，则emit
 * @param tab tab的value
 */
const handleClick = (tab: number) => {
  if (tab === modelValue.value) {
    return
  }
  emit('update:modelValue', tab)
}

/**
 * 跳转至已参加活动页面
 */
const enterNextView = () => {
  emit('go-participate')
}
</script>
<style lang="scss" scoped>
@import '@/styles/var.scss';

.tab {
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
  font-size: 13px;

  .left {
    .desc {
      margin-right: 16px;
      color: $font-gray;
    }

    .tab-item {
      margin-right: 24px;

      &.active {
        color: #ff743b;
      }
    }
  }

  .right {
    padding-left: 15px;
    vertical-align: bottom;
    border-left: 1px dashed #ccc;
  }
}
</style>
