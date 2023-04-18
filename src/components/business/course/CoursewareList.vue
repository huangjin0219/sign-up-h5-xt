<!--
 * @Author: jiangruohui
 * @Date: 2022-04-13 18:00:56
 * @LastEditors: jiangruohui
 * @LastEditTime: 2022-04-13 18:06:49
 * @Description: 课件列表
-->
<template>
  <div v-show="show">
    <div v-for="(item, index) in list" :key="index" class="courseware-item">
      <template v-if="item.level != level">
        <div class="course-name" :class="'course-name-' + item.level">{{ item.directoryName }}</div>
        <CoursewareList
          v-if="item.directoryList && item.directoryList.length"
          :level="level"
          :show="true"
          :list="item.directoryList"
        />
      </template>
      <template v-else>
        <!-- m站不支持试听 -->
        <!-- <div class="lesson-item" :class="{ active: item.isAudition === AUDITION_STATUS_ACCEPT && item.courseType * 1 == COURSE_TYPE_VIDEO}"> -->
        <div class="lesson-item">
          <!-- <img v-if="item.isAudition === AUDITION_STATUS_ACCEPT && item.courseType * 1 == COURSE_TYPE_VIDEO" class="play-icon" src="@/assets/img/icon/icon_play.png"> -->
          <SvgIcon class="icon-lock" name="lock" />
          <p class="lesson-name">{{ item.directoryName }}</p>
          <!-- 录播课 -->
          <!-- <template v-if="item.courseType * 1 == COURSE_TYPE_VIDEO">
            <div v-if="item.isAudition === AUDITION_STATUS_ACCEPT" class="st-btn" @click="handleVideoSt(item)">试听</div>
          </template> -->
          <!-- <template v-if="item.courseType * 1 === COURSE_TYPE_LIVE && item.isAudition === AUDITION_STATUS_ACCEPT">
            即将直播, 直播中
            <template v-if="[LIVE_STATUS_SOON, LIVE_STATUS_LIVING].includes(item.liveStatus)">
              <div class="st-btn" @click="handleLiveSt(item)">试听</div>
            </template>
            回放
            <template v-if="item.liveStatus === LIVE_STATUS_REPLAY">
              <div class="st-btn" @click="handleLiveReplaySt(item)">试听</div>
            </template>
          </template> -->
        </div>
      </template>
    </div>
  </div>
</template>

<script lang="ts" setup>
interface Props {
  show: boolean
  list: any[]
  level?: number
}
const props = withDefaults(defineProps<Props>(), {
  show: false,
  list: () => [],
  level: 0
})
const { show, list, level } = toRefs(props)
</script>
<script lang="ts">
export default {
  name: 'CoursewareList'
}
</script>

<style lang="scss">
@import '@/styles/var.scss';
@import '@/styles/mixin.scss';

.courseware-item {
  .course-name {
    padding-left: 10px;
    font-size: 15px;
    line-height: 21px;
    &-1 {
      margin-top: 19px;
      // font-weight: $font-bold;
    }
    &-2 {
      margin-top: 12px;
    }
    &-3 {
      margin-top: 20px;
      font-size: 14px;
      line-height: 20px;
    }
  }

  .lesson-item {
    position: relative;
    display: flex;
    align-items: center;
    padding: 18px 0 18px 10px;
    font-size: 14px;
    color: #999;
    line-height: 20px;
    border-bottom: 1px solid $border-color;

    &.active {
      color: #333;

      .lesson-name {
        margin-right: 55px;
      }
    }

    .play-icon {
      flex-shrink: 0;
      margin-right: 6px;
      width: 17px;
      height: 17px;
    }

    .icon-lock {
      width: 20px;
      margin-right: 6px;
      font-size: 17px;
    }

    .lesson-name {
      margin-right: 0;
    }

    .st-btn {
      position: absolute;
      top: 18px;
      right: 0;
      width: 40px;
      height: 19px;
      line-height: 19px;
      font-size: 13px;
      color: #fff;
      text-align: center;
      background: $primary;
      border-radius: 9px;
    }
  }
}
</style>
