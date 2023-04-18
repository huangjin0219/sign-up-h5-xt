<!--
 * @Author: jiangruohui
 * @Date: 2022-05-09 16:27:30
 * @LastEditors: jiangruohui
 * @LastEditTime: 2022-05-10 16:46:27
 * @Description: 订单列表/物流列表 顶部过滤器
-->
<template>
  <div class="m-filter-header flex-row">
    <XtBack class="back-block" text="我的" link="/user" />
    <div class="order-status" @click="show = true">
      {{ value.name }}<SvgIcon class="icon-triangle" name="triangle" />
    </div>
    <ActionSheet v-model:show="show" :actions="actions" @select="onSelect" />
  </div>
</template>

<script lang="ts" setup>
import { ActionSheet } from 'vant'
import XtBack from '@/components/Back.vue'

interface Props {
  actions: any[]
  value: any
}

// 采用ts专有声明，有默认值
withDefaults(defineProps<Props>(), {
  actions: () => [],
  value: null
})

const show = ref(false)
const emit = defineEmits(['change'])

const onSelect = (item: any) => {
  show.value = false
  emit('change', item)
}
</script>
<script lang="ts">
export default {
  name: 'FilterHeader'
}
</script>

<style lang="scss" scoped>
@import '@/styles/var.scss';
.m-filter-header {
  justify-content: space-between;
  align-items: center;
  padding: 0 15px;
  width: 100%;
  height: 46px;
  background: #ffffff;
  .order-status {
    font-size: 16px;
    font-weight: $font-bold;
    color: #333333;
    line-height: 22px;

    .icon-triangle {
      margin-left: 4px;
      font-size: 12px;
      transform: rotate(90deg);
    }
  }
}
</style>
