<!--
 * @Description:
 * @version: 1.0.0
 * @Author: 曹双双
 * @Date: 2022-09-06 10:19:16
 * @LastEditors: 曹双双
 * @LastEditTime: 2022-10-21 09:37:58
-->
<template>
  <div v-if="activity" class="spell-group-item">
    <div class="main">
      <img class="picture" mode="scaleToFill" :src="activity.activityImageUrl" />
      <div class="content">
        <div class="title">{{ activity.activityName }}</div>
        <slot></slot>
      </div>
    </div>
    <div class="operate">
      <div>
        <SvgIcon class="iconfont" name="clock"></SvgIcon>限时领取
        <span class="orange-font"
          >{{ $filters.date(activity.startDateTime, 'MM.dd') }}-{{ $filters.date(activity.endDateTime, 'MM.dd') }}</span
        >
      </div>
      <slot name="btnSlot"></slot>
    </div>
  </div>
</template>
<script lang="ts" setup>
import { Activity } from '@/typings/activity'

interface Props {
  activity: Activity | null
}

withDefaults(defineProps<Props>(), {
  activity: null
})
</script>
<style lang="scss" scoped>
@import '@/styles/var.scss';
.spell-group-item {
  padding: 15px;
  padding-bottom: 12px;
  background: #fff;
  box-shadow: 0px 2px 15px -5px rgba(0, 0, 0, 0.06);
  border-radius: 8px;

  .main {
    display: flex;

    .picture {
      width: 130px;
      height: 86px;
      margin-right: 14px;
      margin-bottom: 3px;
      border-radius: 4px;
    }

    .content {
      display: flex;
      flex-direction: column;
      justify-content: space-between;

      .title {
        font-size: 16px;
        font-weight: 500;
        color: $font-color;
        line-height: 20px;
      }
    }
  }

  .operate {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-top: 12px;
    padding-top: 11px;
    font-size: 12px;
    color: $font-light-gray;
    border-top: 1px solid #eee;

    .iconfont {
      margin-right: 5px;
    }

    .orange-font {
      margin-left: 2px;
      color: #ff743b;
    }
  }
}
</style>
