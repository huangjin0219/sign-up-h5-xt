<!--
 * @Description: 
 * @version: 1.0.0
 * @Author: 曹双双
 * @Date: 2022-09-16 17:02:34
 * @LastEditors: 曹双双
 * @LastEditTime: 2023-02-07 14:17:31
-->
<template>
  <div>
    <div @click="showSwitchDirPopup">{{ selectedProject?.name || '全部分类' }} <SvgIcon name="switch" /></div>

    <SwitchDirPopup
      v-model="showPopup"
      :need-all="true"
      :list="projectList"
      :selected-code="selectedProject?.code"
      @click="handleProjectSwitch"
    />
  </div>
</template>
<script lang="ts"></script>
<script lang="ts" setup>
import SwitchDirPopup from '@/components/SwitchDirPopup.vue'
import { queryUserProductCategory } from '@/common/api/course'
import { defaultProject } from '@/utils/enum'

interface Project {
  code: string
  name: string
}

interface Props {
  defaultCode: string
  categoryQueryApi: (params?: any, options?: any) => Promise<any>
}

const props = withDefaults(defineProps<Props>(), {
  defaultCode: defaultProject.code,
  categoryQueryApi: queryUserProductCategory
})

const emit = defineEmits(['change'])

const state = reactive({
  projectList: [] as any,
  showPopup: false,
  selectedProject: defaultProject
})
const { projectList, showPopup, selectedProject } = toRefs(state)

onMounted(() => {
  getDirectories()
})
/**
 * 获取类目
 */
const getDirectories = () => {
  return new Promise<void>((resolve, reject) => {
    projectList.value = []
    props
      .categoryQueryApi()
      .then((res: any) => {
        if (res?.data) {
          const result = res.data.map((item: any) => {
            return {
              name: item.projectName,
              code: item.projectCode
            }
          })
          // 支持默认选中某项目
          selectedProject.value = props.defaultCode
            ? result.find((cur: Project) => cur.code === props.defaultCode) || defaultProject
            : defaultProject
          projectList.value = result
          emit('change', selectedProject.value ? selectedProject.value : defaultProject)
          resolve()
        }
        reject()
      })
      .catch(() => {
        reject()
      })
  })
}

/**
 * 切换项目
 */
const handleProjectSwitch = (dir: Project) => {
  if (selectedProject.value !== dir) {
    selectedProject.value = dir
    emit('change', selectedProject.value ? selectedProject.value : defaultProject)
  }
}

/**
 * 显示项目切换弹窗
 */
const showSwitchDirPopup = () => {
  showPopup.value = !showPopup.value
}
</script>
