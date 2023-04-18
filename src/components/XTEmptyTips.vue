<!--
 * @Description: 
 * @version: 1.0.0
 * @Author: 曹双双
 * @Date: 2022-09-15 10:45:24
 * @LastEditors: 曹双双
 * @LastEditTime: 2022-09-15 17:15:04
-->
<template>
  <Empty class="empty-tips" :image="image" :description="description" />
</template>
<script lang="ts" setup>
import { Empty } from 'vant'
import EMPTY_PNG from '@/assets/images/empty/no_course.png'

interface Props {
  image?: string
  description?: string
}
withDefaults(defineProps<Props>(), {
  image: EMPTY_PNG,
  description: '暂无数据'
})
</script>
<style lang="scss" scoped>
.empty-tips {
  padding-bottom: 180px;
}
</style>
