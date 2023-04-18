<!--
 * @Author: jiangruohui
 * @Date: 2022-03-28 13:36:51
 * @LastEditors: jiangruohui
 * @LastEditTime: 2023-01-06 16:41:49
 * @Description: 
-->
<template>
  <Tabbar route>
    <TabbarItem replace to="/course" class="tabbar-item">
      选课中心
      <template #icon="props">
        <SvgIcon v-if="props.active" name="course-center" color="#3075FF" />
        <SvgIcon v-else name="course-center-outline" color="#999" />
      </template>
    </TabbarItem>
    <TabbarItem replace to="/" class="tabbar-item">
      学习中心
      <template #icon>
        <img :src="STUDY_CENTER_PNG" />
      </template>
    </TabbarItem>
    <TabbarItem replace to="/user" class="tabbar-item">
      我的
      <template #icon="props">
        <SvgIcon v-if="props.active" name="user" color="#3075FF" />
        <SvgIcon v-else name="user-outline" color="#999" />
      </template>
    </TabbarItem>
  </Tabbar>
</template>

<script lang="ts" setup>
import { Tabbar, TabbarItem } from 'vant'
import STUDY_CENTER_PNG from '@/assets/images/study_center.png'
</script>

<style lang="scss" scoped>
.tabbar-item {
  font-size: 10px;
  line-height: 14px;
  :deep(.van-tabbar-item__icon) {
    margin-bottom: 4px;
    font-size: 24px;
    img {
      width: 24px;
      height: 24px;
    }
  }

  &[aria-selected='false'] {
    color: #656d7f;
    background: #fff;
  }
}
</style>
