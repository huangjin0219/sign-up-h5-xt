<!--
 * @Description: 
 * @version: 1.0.0
 * @Author: 曹双双
 * @Date: 2023-02-22 11:56:59
 * @LastEditors: 曹双双
 * @LastEditTime: 2023-03-23 11:58:29
-->
<template>
  <div class="share-bar">
    <slot>
      <div class="share-btn" @click="handleShare">
        <img
          class="icon"
          src="https://oss.xuetian.cn/multimedia_knowledge/R1870c94c7480006_xt_class_share.png"
          alt=""
        />
        <span>分享</span>
      </div>
    </slot>
    <ShareGuide v-if="isShowShareGuide" @close="isShowShareGuide = false" />
  </div>
</template>
<script lang="ts" setup>
import type { ShareParams } from '@/common/use/useShare'
import useShare from '@/common/use/useShare'
import ShareGuide from './ShareGuide.vue'

interface Props {
  shareParams: ShareParams
}

const emit = defineEmits(['share'])
const props = defineProps<Props>()
const { shareParams } = toRefs(props)
const { isShowShareGuide, share } = useShare(shareParams.value)

const handleShare = () => {
  share()
  emit('share')
}
</script>
<style lang="scss" scoped>
.share-btn {
  width: 54px;
  height: 26px;
  background: #ffdeb2;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 12px;
  color: #a55c2c;
  border-radius: 13px 0 0 13px;
  .icon {
    width: 10px;
    height: 10px;
    margin-right: 4px;
  }
}
</style>
