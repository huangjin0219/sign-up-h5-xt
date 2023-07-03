<!--
 * @Author: huangjin
 * @Date: 2023-07-03 15:28:31
 * @LastEditors: huangjin
 * @LastEditTime: 2023-07-03 16:37:46
 * @Description: 多选项
-->
<template>
  <div class="tab-wrap">
    <div
      v-for="item in list"
      :key="item"
      class="tab-content"
      :class="[{ 'tab-project': tabType }, { 'is-active': modelValue?.includes(item) }]"
      @click="handleTabClick(item)"
    >
      {{ item }}
    </div>
  </div>
</template>
<script lang="ts" setup>
interface Props {
  modelValue?: any[]
  list?: any[]
  tabType?: boolean
  couldEdit?: boolean
  multiple?: boolean
}
const props = withDefaults(defineProps<Props>(), {
  modelValue: () => [],
  list: () => [],
  tabType: true,
  couldEdit: true,
  multiple: true
})
const { modelValue, couldEdit } = toRefs(props)

const emit = defineEmits(['update:model-value'])

const tabValue = ref<any[]>(props.modelValue)

const handleTabClick = (item: any) => {
  if (couldEdit.value) {
    const findIndex = tabValue.value.findIndex((i) => i === item)
    if (findIndex !== -1) {
      tabValue.value.splice(findIndex, 1)
    } else {
      tabValue.value.push(item)
    }
    console.log(' hj ~ file: index.vue:53 ~ handleTabClick ~ tabValue.value:', tabValue.value)
    emit('update:model-value', tabValue.value)
  }
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
