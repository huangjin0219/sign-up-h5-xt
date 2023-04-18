<template>
  <Popup
    :show="modelValue"
    :position="props.position"
    :style="{ height: '100%', width: '73.333%' }"
    @close="handleClose"
  >
    <div class="title">项目</div>
    <ul class="dir-block">
      <li v-if="needAll" class="dir-item" :class="{ active: !selectedCode }" @click.stop="handleSelectItem(null)">
        全部
      </li>
      <li
        v-for="(dir, i) in list"
        :key="i"
        class="dir-item"
        :class="{ active: selectedCode === dir.code }"
        @click.stop="handleSelectItem(dir)"
      >
        {{ dir.name }}
      </li>
    </ul>

    <Empty v-if="!needAll && (!list || !list.length)" class="empty-tips" :image="EMPTY_PNG" description="暂无数据" />
  </Popup>
</template>

<script lang="ts" setup>
import { Popup, Empty } from 'vant'
import EMPTY_PNG from '@/assets/images/empty/no_course.png'

interface dirItem {
  name: string
  code: string | null
  [propName: string]: any
}

interface Props {
  modelValue: boolean
  position?: 'left' | 'right'
  list?: dirItem[] | null
  selectedCode?: string
  needAll?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  modelValue: false,
  position: 'left',
  selectedCode: '',
  list: null,
  needAll: false
})

const emit = defineEmits(['update:modelValue', 'click'])

const handleClose = () => {
  emit('update:modelValue', false)
}

const handleSelectItem = (dir: dirItem | null) => {
  emit('click', dir)
  handleClose()
}
</script>
<script lang="ts">
export default {
  name: 'SwitchDirPopup'
}
</script>

<style lang="scss" scoped>
@import '@/styles/var.scss';
.title {
  margin-top: 50px;
  font-size: 16px;
  padding-left: 15px;
  font-weight: 500;
  color: #666666;
  line-height: 22px;
}
.dir-block {
  font-size: 0;
  padding-bottom: 60px;
  padding-left: 2px;
  .dir-item {
    display: inline-block;
    width: 115px;
    height: 38px;
    line-height: 38px;
    background-color: #f4f4f4;
    color: #666;
    font-size: 14px;
    text-align: center;
    border-radius: 4px;
    margin-left: 13px;
    margin-top: 15px;
    &.active,
    &:active {
      background-color: #eaf1ff;
      color: $primary;
    }
  }
}
.empty-tips {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  padding: 0;
  :deep(.van-empty__description) {
    padding: 0;
  }
}
</style>
