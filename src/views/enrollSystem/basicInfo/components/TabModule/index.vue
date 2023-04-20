<!--
 * @Descripttion:
 * @version: 1.0.0
 * @Author: 刘帅楠
 * @Date: 2020-07-01 17:24:27
 * @LastEditors: huangjin
 * @LastEditTime: 2023-04-20 10:34:26
-->
<template>
  <div class="tab-wrap">
    <div
      v-for="item in list"
      :key="item"
      class="tab-content"
      :class="[{ 'tab-project': tabType }, { 'is-active': modelValue === item }]"
      @click="handleTabClick(item)"
    >
      {{ item }}
    </div>
  </div>
</template>
<script lang="ts" setup>
interface Props {
  modelValue?: string | number
  list?: any[]
  tabType?: boolean
  couldEdit?: boolean
}
const props = withDefaults(defineProps<Props>(), {
  modelValue: '',
  list: () => [],
  tabType: true,
  couldEdit: true
})
const emit = defineEmits(['update:model-value'])
const { modelValue, list, tabType, couldEdit } = toRefs(props)

const tabValue = computed({
  get() {
    return modelValue.value
  },
  set(val) {
    if (couldEdit.value) {
      emit('update:model-value', val)
    }
  }
})
const handleTabClick = (item: any) => {
  tabValue.value = item
}
</script>
<style lang="scss" scoped>
@import '@/styles/mixin.scss';
.tab-wrap {
  padding: 14px 15px 14px 14px;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;

  .tab-content {
    min-width: 73px;
    height: 35px;
    border-radius: 4px;
    text-align: center;
    line-height: 35px;
    border: 1px solid $bimPrimary;
    color: $bimPrimary;
    margin-bottom: 15px;
    font-size: 13px;
  }

  .tab-project {
    min-width: 157px;
  }
  .is-active {
    color: #fff;
    background-color: $bimPrimary;
  }
}
</style>
