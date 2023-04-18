<!--
 * @Author: jiangruohui
 * @Date: 2022-04-11 16:28:39
 * @LastEditors: jiangruohui
 * @LastEditTime: 2022-04-15 15:57:15
 * @Description: 教师介绍
-->
<template>
  <div class="m-teacher-intro">
    <div v-for="teacher in list" :key="teacher.teacherCode" class="teacher-intro-item van-hairline--bottom">
      <img class="teacher-avatar" :src="teacher.teacherImageUrl || teacherDefaultAvatar" />
      <div class="teacher-info">
        <div class="name">{{ teacher.teacherName }}</div>
        <div v-if="teacher.teacherDescription" class="desc">
          {{
            teacher.teacherDescription.length > 35 && !expandStatus[teacher.teacherCode]
              ? teacher.teacherDescription.slice(0, 35) + '...'
              : teacher.teacherDescription || ''
          }}
          <span
            v-if="teacher.teacherDescription.length > 35 && !expandStatus[teacher.teacherCode]"
            class="expand-tips"
            @click="expandDesc(teacher.teacherCode)"
          >
            展开
          </span>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import teacherDefaultAvatar from '@/assets/images/default/teacher_avatar.png'
import { TeacherModel } from '@/typings/course'

interface Props {
  list: Array<TeacherModel>
}
withDefaults(defineProps<Props>(), {
  list: () => {
    return []
  }
})
const expandStatus = reactive({})

const expandDesc = (teacherCode: string) => {
  expandStatus[teacherCode] = !expandStatus[teacherCode]
}
</script>
<script lang="ts">
export default {
  name: 'TeacherIntro'
}
</script>

<style lang="scss" scoped>
@import '@/styles/var.scss';
@import '@/styles/mixin.scss';

.teacher-intro-item {
  display: flex;
  padding: 18px 0;
  .teacher-avatar {
    flex-shrink: 0;
    width: 40px;
    height: 40px;
    border-radius: 50%;
    background: linear-gradient(310deg, rgba(230, 232, 233, 0.97) 0%, #e8ebf3 0%, #f5f7fb 100%);
  }
  .teacher-info {
    margin-left: 15px;
    font-size: 14px;
    color: #333;
    line-height: 23px;
    flex: 1;
    overflow: hidden;
    .name {
      font-weight: bold;
      font-size: 16px;
    }
    .desc {
      position: relative;
      margin-top: 7px;
      // @include text-ellipsis(2);
      overflow: hidden;
      &.expand {
        height: auto;
      }
      .expand-tips {
        position: absolute;
        bottom: 0;
        right: 0;
        color: $primary;
      }
    }
  }
}
</style>
