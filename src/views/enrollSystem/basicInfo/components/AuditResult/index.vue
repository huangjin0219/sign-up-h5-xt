<!--
 * @Author: HuZhangjie
 * @Date: 2020-07-14 10:15:33
 * @LastEditors: huangjin
 * @LastEditTime: 2023-04-21 10:36:24
 * @Description: 审核结果展示
-->
<template>
  <div class="audit-result-wrapper">
    <div v-show="!isReWrite" class="audit-result" :class="getResultClass()">
      <div>{{ getResultStatusText() }}</div>
      <div class="audit-result__split">|</div>
      <div>报名编号：{{ signNo }}</div>
    </div>
    <div v-show="showRemark" class="audit-remark">原因：{{ remark }}</div>
  </div>
</template>

<script lang="ts" setup>
import { AUDIT_STATUS_MAP, EXAM_STATUS_MAP } from '@/constant'

// 审核结果不通，样式不同
const RESULT_CLASS_MAP = {
  [AUDIT_STATUS_MAP.WAIT_AUDIT]: {
    text: '待初审',
    className: 'result-wait' // 待审核
  },
  [AUDIT_STATUS_MAP.FIRST_AUDIT_SUCCESS]: {
    text: '待终审',
    className: 'result-wait' // 一级审核成功(状态为待终审)
  },
  [AUDIT_STATUS_MAP.FIRST_AUDIT_FAIL]: {
    text: '初审不通过',
    className: 'result-fail' // 审核失败
  },
  [AUDIT_STATUS_MAP.SECOND_AUDIT_FAIL]: {
    text: '终审不通过',
    className: 'result-fail' // 审核失败
  },
  // 只有二级审核成功，才显示成功提示
  [AUDIT_STATUS_MAP.SECOND_AUDIT_SUCCESS]: {
    text: '审核通过',
    className: 'result-success' // 审核成功
  }
}

// 考试状态的映射
const EXAM_STATUS_DESC_MAP = {
  [EXAM_STATUS_MAP.FAIL]: {
    text: '非常遗憾！考试未通过！请与您的招生老师联系或于官网进行确认哦',
    className: 'result-fail'
  },
  [EXAM_STATUS_MAP.PASS]: {
    text: '恭喜！考试已通过！请与您的招生老师联系或于官网进行确认哦',
    className: 'result-success'
  }
}

interface Props {
  signNo?: string // 报名编号
  remark?: string
  isReWrite?: boolean // 重新填写状态
  dataCheckStatus: string | number
  status: string | number
  examStatus: string | number
}
const props = withDefaults(defineProps<Props>(), {
  signNo: '',
  remark: '',
  isReWrite: false
})

const {
  // 审核结果状态
  dataCheckStatus,
  // 报名状态 1.初始化 2.待报名 3.已报名 4.废弃
  status,
  // 考试状态 1.未知 2.未通过 3.通过
  examStatus,
  // 不通过原因
  remark
} = toRefs(props)

// 不通过原因
const showRemark = computed(() => {
  return (
    [AUDIT_STATUS_MAP.FIRST_AUDIT_FAIL, AUDIT_STATUS_MAP.SECOND_AUDIT_FAIL].includes(dataCheckStatus.value as number) &&
    remark.value
  )
})

// 文案
const getResultStatusText = () => {
  const correntStatus = getCorrectStatusObj()

  return correntStatus.text
}
// class 类名
const getResultClass = () => {
  const correntStatus = getCorrectStatusObj()

  return correntStatus.className
}
// 获取正确的text 和 className
const getCorrectStatusObj = () => {
  // 优先根据考试状态展示
  console.log('getCorrectStatusObj -> this.examStatus', examStatus.value)
  if ([EXAM_STATUS_MAP.FAIL, EXAM_STATUS_MAP.PASS].includes(examStatus.value as number)) {
    return EXAM_STATUS_DESC_MAP[examStatus.value]
  }

  // 已报名
  if (status.value === 3) {
    return {
      text: '已上报，请于官网查看考试信息',
      className: 'result-success'
    }
  }
  return RESULT_CLASS_MAP[dataCheckStatus.value]
}
</script>

<style scoped lang="scss">
@import '@/styles/mixin.scss';

.audit-result-wrapper {
  margin-bottom: 10px;
  > div {
    box-sizing: border-box;
  }

  .audit-result {
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 8px 24px;
    min-height: 40px;
    line-height: 20px;
    font-size: 14px;

    &__split {
      margin-left: 15px;
      margin-right: 15px;
    }
  }
  .audit-remark {
    padding: 10px 15px;
    font-size: 13px;
    line-height: 20px;
  }

  .result-wait {
    background-color: #e4eaff;
    color: $bimPrimary;
  }
  .result-fail {
    background-color: #ffe6eb;
    color: #ff325c;
  }
  .result-success {
    background-color: #e4fbef;
    color: #3cbd7b;
  }
}
</style>
