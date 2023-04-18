<!--
 * @Author: jiangruohui
 * @Date: 2022-04-12 10:44:24
 * @LastEditors: jiangruohui
 * @LastEditTime: 2022-05-06 15:39:24
 * @Description: 课程大纲
-->
<template>
  <div class="m-package-outline-wrap">
    <div
      v-for="(item, index) in courseOutlineList"
      :key="item.courseCode"
      class="outline-item"
      :class="{ expand: item.expand }"
    >
      <div class="outline-info" @click="handleCourseItemClick(item, index)">
        <div class="decorate-line" />
        <span class="outline-name">{{ item.courseName }}</span>
        <SvgIcon class="iconfont" name="circle-arrow-down-outline" :class="{ rotate: item.expand }" />
      </div>
      <CoursewareList
        v-if="item.directoryList && item.directoryList.length"
        class="directory-tree"
        :show="item.expand"
        :list="item.directoryList"
        :level="item.level"
      />
      <Loading v-else-if="item.expand && !item.query" class="loading-tips" type="spinner" />
      <Empty v-else-if="item.expand && item.query" class="empty-tips" :image="EMPTY_PNG" description="暂无更新课程" />
      <div v-show="item.expand" class="packup-btn" @click="shrinkDirectory(index)">收起</div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { Empty, Loading } from 'vant'
import EMPTY_PNG from '@/assets/images/empty/no_course.png'
import { CourseType } from '@/utils/enum'
import { queryLiveCourseDetail, queryVideoCourseDetail } from '@/common/api/course'
import { PackageOutline, CourseOutline } from '@/typings/course'
import CoursewareList from './CoursewareList.vue'

interface CourseOutlineExtension extends CourseOutline {
  query?: boolean
  expand?: boolean
  loading?: boolean
  directoryList?: any[]
  courseData?: any
  level?: number
}

interface Props {
  packageOutline: PackageOutline | undefined
}
const props = withDefaults(defineProps<Props>(), {})
const packageOutline = ref(props.packageOutline)
const courseOutlineList = ref<CourseOutlineExtension[]>([])

onMounted(() => {
  initCourseOutlineList()
})

watch(packageOutline, () => {
  initCourseOutlineList()
})

const initCourseOutlineList = () => {
  if (!packageOutline.value) {
    return
  }
  // this.loading = true
  courseOutlineList.value = []
  const list = packageOutline.value.courseOutlineList.map((item, i) => {
    return {
      ...item,
      query: false,
      expand: false // 默认折叠
    }
  })
  courseOutlineList.value = [...list]
  // 默认查询第一条
  if (list.length) {
    handleCourseItemClick(list[0], 0)
  }
}
/**
 * 收起目录
 */
const shrinkDirectory = (index: number) => {
  courseOutlineList.value[index].expand = false
}

/**
 * 课程点击事件，展开目录
 */
const handleCourseItemClick = async (item: CourseOutlineExtension, index: number) => {
  const { expand, query } = courseOutlineList.value[index]
  courseOutlineList.value[index].expand = !expand
  if (expand || query) {
  }
  const courseData: any = await queryDirectoryList(item) // 第一条允许试听
  courseOutlineList.value[index].directoryList = courseData.dataList || []
  courseOutlineList.value[index].courseData = courseData.row || {}
  courseOutlineList.value[index].level = courseData.level
  courseOutlineList.value[index].query = true
}

/**
 * 查询课程目录（直播、录播）
 */
const queryDirectoryList = async (course: CourseOutlineExtension) => {
  const { courseType, courseCode } = course
  const dataList = []
  let courseData = {} // 课程
  const { packageCode } = packageOutline.value as PackageOutline
  course.loading = true
  if (courseType === CourseType.Live) {
    try {
      const res: any = await queryLiveCourseDetail({ courseCode, packageCode })
      const data = res.data || {}
      const { directoryList = [] } = data
      courseData = {
        row: data,
        dataList: directoryList ? [...directoryList] : [],
        level: data.level
      }
    } catch (error) {}
  }
  if (courseType === CourseType.Video) {
    try {
      const res: any = await queryVideoCourseDetail({ courseCode, packageCode })
      const data = res.data || {}
      const { directoryList = [] } = data
      courseData = {
        row: data,
        dataList: directoryList ? [...directoryList] : [],
        level: data.level
      }
      // 录播视频第一条允许试听
      // const arr = this.handleFilterResourceList(dataList)
      // dataList = [...arr]
    } catch (error) {}
  }
  course.loading = false
  return courseData
}
</script>
<script lang="ts">
export default {
  name: 'PackageOutline'
}
</script>

<style lang="scss" scoped>
@import '@/styles/var.scss';
@import '@/styles/mixin.scss';

.m-package-outline-wrap {
  padding: 0 15px;
}

.outline-item {
  border-bottom: 1px solid $border-color;

  &.expand {
    border-bottom: none;
  }

  .packup-btn {
    margin: 16px auto 9px;
    width: 65px;
    height: 29px;
    font-size: 13px;
    color: #999;
    line-height: 29px;
    text-align: center;
    background: #f3f5f7;
    border-radius: 18px;
  }
}

.outline-info {
  position: relative;
  display: flex;
  align-items: center;
  margin: 18px 0;

  .decorate-line {
    margin-right: 6px;
    width: 3px;
    height: 15px;
    background: $primary;
    border-radius: 2px;
  }

  .outline-name {
    flex: 1;
    padding-right: 21px;
    height: 21px;
    font-size: 15px;
    font-weight: $font-bold;
    color: #333333;
    line-height: 21px;
    @include ellipsis();
  }

  .iconfont {
    position: absolute;
    right: 0;
    top: 3px;
    font-size: 16px;
    color: #999;

    &.rotate {
      transform: rotate(180deg);
    }
  }
}
:deep(.van-loading) {
  padding: 20px 0;
  text-align: center;
}
:deep(.van-empty) {
  padding: 0 0 20px;
}
</style>
