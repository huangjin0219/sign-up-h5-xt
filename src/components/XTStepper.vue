<!--
 * @Author: huangjin
 * @Date: 2022-04-18 11:18:11
 * @LastEditors: huangjin
 * @LastEditTime: 2022-04-19 18:27:50
 * @Description: 数字步骤条 - 只能等分布局，需要其他布局自行解决
-->
<template>
  <div class="step-block">
    <div v-for="(item, index) in stepTextArr" :key="index" class="step" :class="stepNum >= index + 1 ? 'active' : ''">
      <div class="icon">
        <div class="icon-num">{{ index + 1 }}</div>
        <div v-if="index !== stepTextArr.length - 1" class="line" />
      </div>
      <p>{{ item }}</p>
    </div>
  </div>
</template>

<script lang="ts" setup>
interface Props {
  stepNum: number // 第几步
  stepTextArr: string[] // 步骤说明-数组 例如：['实名认证', '签订课程合同', '开通课程']
}
const props = withDefaults(defineProps<Props>(), {
  stepNum: 1,
  stepTextArr: () => []
})
const { stepNum } = toRefs(props)
</script>
<script lang="ts">
export default {
  name: 'XTStepperVue'
}
</script>

<style lang="scss" scoped>
.step-block {
  display: flex;
  // justify-content: space-around; // 子元素使用了 flex=1 此处不生效
  align-items: center;
  width: 375px;
  height: 95px;
  background-color: #fff;
  border-bottom: 15px solid #f7f7f7;
  .step {
    flex: 1;
    height: 100%;
    display: inherit;
    flex-direction: column;
    justify-content: space-evenly;
    align-items: center;
    .icon {
      position: relative;
      display: flex;
      justify-content: center;
      width: 100%;
      height: 23px;
      .icon-num {
        width: 23px;
        height: 100%;
        text-align: center;
        line-height: 23px;
        color: #fff;
        font-size: 12px;
        border-radius: 50%;
        // background-color: #34db89;
        // box-shadow: 0 0 4px 4px #ccffe6;
        background-color: #cdcdcd;
        box-shadow: 0 0 4px 4px #ececec;
      }
      .line {
        position: absolute;
        left: calc(50% + 12px);
        top: 12px;
        width: calc(100% - 23px);
        height: 1px;
        background-color: #ececec;
      }
    }
    p {
      font-size: 14px;
      // color: #333333;
      color: #999;
    }
  }
  .active {
    .icon {
      .icon-num {
        background-color: #34db89;
        box-shadow: 0 0 4px 4px #ccffe6;
      }
      .line {
        background-color: #34db89;
      }
    }
    p {
      color: #333333;
    }
  }
}
</style>
