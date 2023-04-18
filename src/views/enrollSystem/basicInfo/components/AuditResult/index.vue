<!--
 * @Author: HuZhangjie
 * @Date: 2020-07-14 10:15:33
 * @LastEditors: HuZhangjie
 * @LastEditTime: 2020-08-11 20:36:03
 * @Description: 审核结果展示
-->
<template>
  <div class='audit-result-wrapper'>
    <div
      v-show="!isReWrite"
      class="audit-result"
      :class="getResultClass()"
    >
      <div>{{ getResultStatusText() }}</div>
      <div class="audit-result__split">|</div>
      <div>报名编号：{{ signNo }}</div>
    </div>
    <div v-show="showRemark" class="audit-remark">
      原因：{{ remark }}
    </div>
  </div>
</template>

<script>
import {
  AUDIT_STATUS_MAP,
  EXAM_STATUS_MAP
} from '@/constant'

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
export default {
  props: {
    // 报名编号
    signNo: {
      type: String,
      default: ''
    },
    // 审核结果状态
    dataCheckStatus: {
      type: [String, Number],
      required: true
    },
    // 填写状态
    dataStatus: {
      type: [String, Number],
      required: true
    },
    // 报名状态 1.初始化 2.待报名 3.已报名 4.废弃
    status: {
      type: [String, Number],
      required: true
    },
    // 考试状态 1.未知 2.未通过 3.通过
    examStatus: {
      type: [String, Number],
      required: true
    },
    // 不通过原因
    remark: {
      type: String,
      default: ''
    },
    // 重新填写状态
    isReWrite: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
    }
  },
  computed: {
    // 不通过原因
    showRemark () {
      return [
        AUDIT_STATUS_MAP.FIRST_AUDIT_FAIL,
        AUDIT_STATUS_MAP.SECOND_AUDIT_FAIL
      ].includes(this.dataCheckStatus) && this.remark
    }
  },
  methods: {
    // 文案
    getResultStatusText () {
      const correntStatus = this._getCorrectStatusObj()

      return correntStatus.text
    },
    // class 类名
    getResultClass () {
      const correntStatus = this._getCorrectStatusObj()

      return correntStatus.className
    },
    // 获取正确的text 和 className
    _getCorrectStatusObj () {
      // 优先根据考试状态展示
      console.log('_getCorrectStatusObj -> this.examStatus', this.examStatus)
      if ([EXAM_STATUS_MAP.FAIL, EXAM_STATUS_MAP.PASS].includes(this.examStatus)) {
        return EXAM_STATUS_DESC_MAP[this.examStatus]
      }

      // 已报名
      if (this.status === 3) {
        return {
          text: '已上报，请于官网查看考试信息',
          className: 'result-success'
        }
      }
      return RESULT_CLASS_MAP[this.dataCheckStatus]
    }
  }
}
</script>

<style scoped lang="scss">
@import "@/styles/mixin.scss";

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
    background-color: #E4EAFF;
    color: $bimPrimary;
  }
  .result-fail {
    background-color: #FFE6EB;
    color: #FF325C;
  }
  .result-success {
    background-color: #E4FBEF;
    color: #3CBD7B;
  }
}
</style>
