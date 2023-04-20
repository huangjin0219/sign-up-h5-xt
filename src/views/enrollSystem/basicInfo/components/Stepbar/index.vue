<!--
 * @Descripttion:
 * @version: 1.0.0
 * @Author: 刘帅楠
 * @Date: 2020-07-01 11:35:54
 * @LastEditors: huangjin
 * @LastEditTime: 2023-04-20 11:05:35
-->
<template>
  <div class="stpebar-wrap">
    <div class="stpebar-wrap-num">
      <img src="@/assets/images/signUp/basicInfo/bim_answer_lable1_sel.png" alt="" />
      <div :class="[{ line2: infoType }, 'line1']"></div>
      <img :src="imgSrc" alt="" />
    </div>
    <div class="stpebar-wrap-size">
      <span>基本信息</span>
      <span>报名材料</span>
    </div>
  </div>
</template>
<script lang="ts" setup>
import { getSignUpImageUrl } from '@/utils'

interface Props {
  infoType?: boolean
}
const props = withDefaults(defineProps<Props>(), {
  infoType: false
})

const { infoType } = toRefs(props)
const imgSrc = computed(() => {
  return !infoType.value
    ? getSignUpImageUrl('/basicInfo/bim_answer_lable2_nor.png')
    : getSignUpImageUrl('/basicInfo/bim_answer_lable2_sel.png')
})
</script>
<style lang="scss" scoped>
$line1: #ececec;
.stpebar-wrap {
  width: 100%;
  margin-bottom: 10px;
  padding-top: 21px;
  background: #fff;

  &-num {
    padding: 0 56px;
    height: 30px;
    display: flex;
    align-items: center;

    .line1 {
      width: 100%;
      height: 1px;
      background: $line1;
    }
    .line2 {
      background: #d2ddff;
    }
    img {
      width: 30px;
      height: 30px;
    }
  }

  &-size {
    font-size: 13px;
    padding: 9px 45px 17px 45px;
    display: flex;
    justify-content: space-between;

    span:nth-of-type(2) {
      color: #666;
    }
  }
}
</style>
