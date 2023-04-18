<!--
 * @Author: jiangruohui
 * @Date: 2022-04-11 17:05:54
 * @LastEditors: jiangruohui
 * @LastEditTime: 2022-07-19 10:50:50
 * @Description: 条件栏 支持横向滚动，弹窗显示选项
-->
<template>
  <div class="m-condition-bar" :class="{ show: show }">
    <Tabs v-model:active="activeIndex" :swipe-threshold="1" @change="handleActiveChange">
      <Tab v-for="(item, index) in list" :key="index" :title="item[name]" />
    </Tabs>
    <div class="expand-icon" @click="togglePopupShow">
      <SvgIcon class="icon" :name="show ? 'pack-up' : 'pack-down'" />
    </div>
    <div v-show="show" class="popup" @click="closePopup">
      <div class="subject-container" @click.stop="">
        <div
          v-for="(item, index) in list"
          :key="item.packageCode"
          class="subject-item"
          :class="{ active: index === activeIndex }"
          @click.stop="handleItemClick(index)"
        >
          {{ item.abbreviationName }}
        </div>
      </div>
      <div class="mask" />
    </div>
  </div>
</template>

<script lang="ts" setup>
import { Tabs, Tab } from 'vant'

interface Props {
  name?: string // name属性字段名
  list: Array<any>
}
const props = withDefaults(defineProps<Props>(), {
  name: ''
})
const { name, list } = toRefs(props)

const state = reactive({
  show: false,
  activeIndex: 0
})
const { show, activeIndex } = toRefs(state)
const emit = defineEmits(['change'])
/**
 * 切换弹窗显示
 */
const togglePopupShow = () => {
  show.value = !show.value
}
/**
 * 关闭弹窗
 */
const closePopup = () => {
  show.value = false
}
/**
 * Item点击事件
 */
const handleItemClick = (index: number) => {
  activeIndex.value = index
  handleActiveChange(index)
}
const handleActiveChange = (index: number) => {
  // emit('change', list.value[index])
  emit('change', index)
  closePopup()
}
</script>
<script lang="ts">
export default {
  name: 'ConditionBar'
}
</script>

<style lang="scss" scoped>
@import '@/styles/var.scss';

:deep(.van-tabs) {
  position: relative;
  padding: 20px 40px 15px 0;
  height: 70px;
  z-index: 99;
  background-color: #fff;
  .van-tabs__nav {
    padding: 0;
  }

  .van-tab {
    flex: 0 0 auto !important;
    margin-left: 15px;
    padding: 0 15px;
    height: 30px;
    font-size: 14px;
    color: #666;
    line-height: 30px;
    border-radius: 15px;
    background: #f4f4f4;

    &.van-tab--active {
      color: $primary;
      background: rgba($color: $primary, $alpha: 0.1);
    }
  }

  .van-tabs__line {
    display: none;
  }

  .van-tabs__wrap--scrollable .van-tab {
    flex: 0 0 auto !important;
  }
}

.m-condition-bar {
  position: absolute;
  left: 0;
  right: 0;
  top: 0;

  &.show {
    bottom: 0;
  }

  .expand-icon {
    position: absolute;
    top: 20px;
    right: 0;
    padding-top: 5px;
    padding-left: 10px;
    width: 45px;
    height: 30px;
    font-size: 20px;
    color: #333;
    line-height: 20px;
    background: linear-gradient(
      270deg,
      #ffffff 0%,
      #ffffff 70%,
      rgba(255, 255, 255, 0.53) 95%,
      rgba(255, 255, 255, 0) 100%
    );
    z-index: 100;
  }

  .subject-container {
    position: relative;
    display: flex;
    flex-wrap: wrap;
    padding: 20px 0 0 15px;
    background: #fff;
    border-top: 1px solid $border-color;
    z-index: 99;

    .subject-item {
      flex-shrink: 0;
      display: inline-block;
      margin-bottom: 20px;
      margin-right: 14px;
      padding: 0 15px;
      height: 30px;
      font-size: 14px;
      color: #666;
      line-height: 30px;
      border-radius: 15px;
      background: #f4f4f4;

      &.active {
        color: $primary;
        background: rgba($primary, 0.1);
      }
    }
  }

  .mask {
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    background: rgba(0, 0, 0, 0.6);
    z-index: 98;
  }
}
</style>
