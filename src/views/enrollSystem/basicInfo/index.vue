<!--
 * @Author: huangjin
 * @Description: 报名基本信息
-->
<template>
  <div class="page-fill-info">
    <!-- 审核结果 -->
    <AuditResult
      v-if="showAuditResult"
      :data-check-status="auditForm.dataCheckStatus"
      :data-status="auditForm.dataStatus"
      :status="auditForm.status"
      :exam-status="auditForm.examStatus"
      :remark="auditForm.remark"
      :sign-no="queryInfo.signUpRecordId"
      :is-re-write="isReWrite"
    />
    <!-- 进度条 -->
    <Stepbar v-show="!isOnlyOneStep" :info-type="!showBasisStep"></Stepbar>
    <!-- 基础信息表单 -->
    <van-form v-show="showBasisStep" ref="baseFormRef" class="basis-form" scroll-to-error>
      <template v-if="onlyOneTemplateList && onlyOneTemplateList.length">
        <!-- 手机号 -->
        <TempMobile
          v-if="showOnlyOnceFormItem('报名手机号')"
          v-model:value="baseForm.signUpMobile"
          :template-item="showOnlyOnceFormItem('报名手机号')"
          :could-edit="couldEdit && !isJixuJiaoyu"
          :disabled="isJixuJiaoyu || isOrderMobile"
        ></TempMobile>
        <!-- 身份证号 -->
        <TempCardNo
          v-if="showOnlyOnceFormItem('身份证号')"
          v-model:value="baseForm.cardNo"
          :template-item="showOnlyOnceFormItem('身份证号')"
          :could-edit="couldEdit"
          :disabled="isOrderCardNo"
        ></TempCardNo>
        <TempAllAreaAsync
          v-if="showOnlyOnceFormItem('省/市/区')"
          :value="baseForm"
          :could-edit="isSevenType ? false : couldEdit"
          :education-type="educationType"
          :template-item="showOnlyOnceFormItem('省/市/区')"
          @update:value="setAreaInfo"
        ></TempAllAreaAsync>
        <TempAllAreaAsync
          v-if="showOnlyOnceFormItem('省/市')"
          :value="{
            provinceId: baseForm.provinceId,
            provinceName: baseForm.provinceName,
            cityId: baseForm.cityId,
            cityName: baseForm.cityName
          }"
          :level="2"
          :could-edit="isSevenType ? false : couldEdit"
          :education-type="educationType"
          :template-item="showOnlyOnceFormItem('省/市')"
          @update:value="setAreaInfo"
        ></TempAllAreaAsync>
        <TempAllAreaAsync
          v-if="showOnlyOnceFormItem('省份')"
          :value="{
            provinceId: baseForm.provinceId,
            provinceName: baseForm.provinceName
          }"
          :level="1"
          :could-edit="isSevenType ? false : couldEdit"
          :education-type="educationType"
          :template-item="showOnlyOnceFormItem('省份')"
          @update:value="(value:any) => (baseForm = { ...baseForm, ...value })"
        ></TempAllAreaAsync>
      </template>
      <template v-for="item in baseForm.userInfo">
        <!-- 性别 -->
        <TempGender
          v-if="['性别'].includes(item.desc)"
          :key="item.ident"
          v-model:value="item.value"
          :template-item="item"
          :could-edit="couldEdit"
        ></TempGender>

        <!-- 民族 -->
        <TempNation
          v-if="['民族'].includes(item.desc)"
          :key="item.ident"
          v-model:value="item.value"
          :template-item="item"
          :could-edit="couldEdit"
        ></TempNation>

        <!-- 身份证号 -->
        <TempCardNo
          v-if="['身份证号'].includes(item.desc)"
          :key="item.ident"
          v-model:value="item.value"
          :template-item="item"
          :could-edit="couldEdit"
        ></TempCardNo>

        <!-- 手机号 -->
        <TempMobile
          v-if="['手机号'].includes(item.desc)"
          :key="item.ident"
          v-model:value="item.value"
          :template-item="item"
          :could-edit="couldEdit"
          :disabled="isJixuJiaoyu"
        ></TempMobile>

        <!-- 通讯地址 -->
        <TempAddress
          v-if="['详细地址'].includes(item.desc)"
          :key="item.ident"
          v-model:value="item.value"
          :template-item="item"
          :could-edit="couldEdit"
        ></TempAddress>

        <!-- 选择年月 -->
        <TempSelectYearMonth
          v-if="['出生年月'].includes(item.desc)"
          :key="item.ident"
          v-model:value="item.value"
          :template-item="item"
          :could-edit="couldEdit"
        ></TempSelectYearMonth>

        <!-- 选择日期 -->
        <TempSelectDate
          v-if="['日期'].includes(item.desc)"
          :key="item.ident"
          v-model:value="item.value"
          :template-item="item"
          :could-edit="couldEdit"
        ></TempSelectDate>

        <!-- 邮箱 -->
        <TempEmail
          v-if="['邮箱'].includes(item.desc)"
          :key="item.ident"
          v-model:value="item.value"
          :template-item="item"
          :could-edit="couldEdit"
        ></TempEmail>

        <!-- 选择学历 list选择 -->
        <TempListEducation
          v-if="['学历'].includes(item.desc)"
          :key="item.ident"
          v-model:value="item.value"
          :template-item="item"
          :could-edit="couldEdit"
          :education-type="educationType"
        ></TempListEducation>

        <!-- 输入框 -->
        <TempInputExtField
          v-if="['输入框', '文本', '文本域', '数字'].includes(item.desc)"
          :key="item.ident"
          v-model:value="item.value"
          :template-item="item"
          :could-edit="couldEdit"
        ></TempInputExtField>

        <TempAllAreaAsync
          v-if="['省/市/区'].includes(item.desc)"
          :key="item.ident"
          v-model:value="item.value"
          :could-edit="isSevenType ? false : couldEdit"
          :education-type="educationType"
          :template-item="item"
        ></TempAllAreaAsync>
        <TempAllAreaAsync
          v-if="['省/市'].includes(item.desc)"
          :key="item.ident"
          v-model:value="item.value"
          :level="2"
          :could-edit="isSevenType ? false : couldEdit"
          :education-type="educationType"
          :template-item="item"
        ></TempAllAreaAsync>
        <TempAllAreaAsync
          v-if="['省份'].includes(item.desc)"
          :key="item.ident"
          v-model:value="item.value"
          :level="1"
          :could-edit="isSevenType ? false : couldEdit"
          :education-type="educationType"
          :template-item="item"
        ></TempAllAreaAsync>

        <!-- 单选 -->
        <TempListextField
          v-if="['单选项'].includes(item.desc)"
          :key="item.key"
          v-model:value="item.value"
          :template-item="item"
          :could-edit="couldEdit"
          :education-type="educationType"
        ></TempListextField>
        <!-- 多选 -->
        <TempListextField
          v-if="['多选项'].includes(item.desc)"
          :key="item.key"
          v-model:value="item.value"
          :template-item="item"
          :could-edit="couldEdit"
          :education-type="educationType"
          multiple
        ></TempListextField>
      </template>
    </van-form>

    <PhotoInfoForm
      v-show="!showBasisStep"
      :could-edit="couldEdit"
      :user-info="baseForm.userInfo"
      :organization-id="baseForm.organizationId"
    />

    <div class="bottom">
      <div v-if="showReWriteBtn" class="save" @click="handleReWrite">重新填写</div>
      <div v-if="step === 'photo'" class="next pre" @click="handlePreStep">上一{{ couldEdit ? '步' : '页' }}</div>
      <div v-if="couldEdit" class="save" @click="handleSaveDraft">保存草稿</div>
      <div v-if="!isOnlyOneStep && step === 'basis'" class="next" @click="handleNextStep">
        下一{{ couldEdit ? '步' : '页' }}
      </div>
      <div v-if="couldEdit && (step === 'photo' || isOnlyOneStep)" class="next" @click="handleSubmit">提交</div>
    </div>

    <!-- 姓名，身份证号与下单不一致时的提示弹窗 -->
    <CheckDiffInfoTipDialog
      v-if="showCheckDiffDialog"
      v-model:show="showCheckDiffDialog"
      @confirm="handleConfirmChangeInfo"
    />
    <!-- 验证码弹窗 -->
    <InputCaptchaDialog
      v-if="showInputCaptchaDialog"
      v-model:show="showInputCaptchaDialog"
      :mobile="baseForm.signUpMobile"
      @confirm="handleConfirmInputCaptcha"
    />
    <!-- 提交成功弹窗 -->
    <SubmitSuccessDialog
      v-if="showSubmitSuccessDialog"
      v-model:show="showSubmitSuccessDialog"
      :sign-no="queryInfo.signUpRecordId"
      @confirm="handleConfirmSubmitSuccess"
    />
  </div>
</template>
<script lang="ts" setup>
import { Form as vanForm, Toast } from 'vant'
import type { FormInstance } from 'vant'
import { TEMPLATE_ITEM } from '@/typings/sign-up'

import { AUDIT_STATUS_MAP, DATA_WRITE_STATUS_MAP } from '@/constant'
import filters from '@/common/filters/index'
import {
  queryTemplateList,
  getRuleDetail,
  queryCustomerInfo,
  saveCustomerInfo,
  queryInfoFromOrder
} from '@/common/api/signUp/enrollSys'
import AuditResult from './components/AuditResult/index.vue'
import Stepbar from './components/Stepbar/index.vue'
import PhotoInfoForm from './PhotoInfoForm.vue'
import CheckDiffInfoTipDialog from './dialogs/CheckDiffInfoTipDialog.vue'
import InputCaptchaDialog from './dialogs/InputCaptchaDialog.vue'
import SubmitSuccessDialog from './dialogs/SubmitSuccessDialog.vue'

// import { basisValidator } from './validate'

const route = useRoute()
// const router = useRouter()

// 审核相关的key
const AUDIT_STATUS_KEYS = [
  'isOutDate', // 是否在报名时间之外
  'dataCheckStatus', // 审核状态
  'dataStatus', // 填写状态
  'status', // 报名状态
  'examStatus', // 考试状态
  'remark' // 审核备注
]

const queryInfo = ref<any>({})
// BASIS_TEMPLATE_KEY_MAP,
const isReWrite = ref<boolean>(false) // 重新填写
const step = ref<string>('basis') // 填写的步骤
// basisValidator
// 接口请求到的需要展示的输入项
const templateList = ref<any[]>([])
const extfieldList = ref<any[]>([]) // 所有包括拓展字段的数组
const educationType = ref<number>(0) // 模板的学历类型
// 老的基础信息
const oldBaseInfo = ref<any>({})
const baseForm = ref<any>({
  graduateTime: '',
  customerName: '',
  userNameSpell: '',
  gender: 1,
  cardNo: '',
  nation: '',
  mobile: '',
  education: '',
  birthday: filters.date(new Date(), 'YY-MM-dd'),
  takeJobTime: '', // 参加工作时间
  workYear: '', // 工作年限
  certNo: '', // 注册证书编号
  additional: '', // 主项 增项
  workUnit: '', // 工作单位
  studyMajor: '', // 所学专业
  graduateSchool: '',
  email: '',
  examArea: '' // 报考地点
})
const auditForm = ref<any>({})

// 填写信息与下单信息不一致时的弹窗
const showCheckDiffDialog = ref<boolean>(false)
// 填写验证码的弹窗
const showInputCaptchaDialog = ref<boolean>(false)

const showSubmitSuccessDialog = ref<boolean>(false) // 提交成功的提示弹窗

// 一建继续教育类型的 姓名、身份证号、手机号 不可修改
const isJixuJiaoyu = computed(() => {
  return educationType.value === 17
})

// 为填写状态
const isWritedStatus = computed(() => {
  console.log('isWritedStatus -> this.', auditForm.value.dataStatus)
  return auditForm.value.dataStatus === DATA_WRITE_STATUS_MAP.WRITED
})
// dataCheckStatus 有值 && 为已填写状态
const showAuditResult = computed(() => {
  const { dataCheckStatus } = auditForm.value
  return dataCheckStatus && isWritedStatus.value
})
// auditForm.dataCheckStatus
// 展示基础信息的面板
const showBasisStep = computed(() => {
  return step.value === 'basis'
})
// 是否可编辑 不为已填写状态 || 没有审核结果 || 重新填写状态
const couldEdit = computed(() => {
  const { dataCheckStatus } = auditForm.value

  return !isWritedStatus.value || !dataCheckStatus || isReWrite.value
})
// 重新填写按钮 有审核结果 && 审核结果不为成功状态 && 不为重新填写状态
const showReWriteBtn = computed(() => {
  const { dataCheckStatus } = auditForm.value

  // 审核通过状态: 一级审核成功 || 二级审核成功
  const isCheckSuccessStatus = [AUDIT_STATUS_MAP.FIRST_AUDIT_SUCCESS, AUDIT_STATUS_MAP.SECOND_AUDIT_SUCCESS].some(
    (item) => item === dataCheckStatus
  )

  return isWritedStatus.value && dataCheckStatus && !isCheckSuccessStatus && !isReWrite.value
})
// 类型为 美国AutoDsesk
const isOnlyOneStep = computed(() => {
  return educationType.value === 4
})
// 为汇总表7 考试地点和考场名称不可编辑
const isSevenType = computed(() => {
  return educationType.value === 7
})

onMounted(async () => {
  queryInfo.value = route.query

  await getTemplateList()
  const { ruleId } = queryInfo.value
  if (!ruleId) getCustomerInfo()
})
const isPreview = computed(() => {
  const { ruleId } = queryInfo.value
  return !!ruleId
})

const imgExtfieldList = ref<any[]>([])
const docExtfieldList = ref<any[]>([])
const onlyOneTemplateList = ref<any[]>([])
const otherInfoTemplateList = ref<TEMPLATE_ITEM[]>([])
// 获取模板列表
const getTemplateList = async () => {
  const { ruleId } = queryInfo.value
  let data
  if (isPreview.value) {
    data = await getRuleDetail({ id: ruleId })
  } else {
    data = await queryTemplateList({ signUpRecordId: queryInfo.value.signUpRecordId })
  }
  // templateList.value = [
  //   ...data.inputData
  //   // { key: 'UPLOAD_FRONT_AND_BACK_IDCARD_DOCFILE', tip: '请上传身份证正反面word文档', inputParameter: 'idCardFrontAndBackDocFile' }
  // ]
  templateList.value = data.ruleValue && JSON.parse(data.ruleValue)

  onlyOneTemplateList.value = templateList.value.filter((i) => i.itemType === 'once')
  otherInfoTemplateList.value = templateList.value.filter((i) => i.itemType !== 'once').sort((a, b) => a.sort - b.sort)
  baseForm.value.userInfo = otherInfoTemplateList.value

  extfieldList.value = templateList.value.filter((tem) => {
    return /EXTFIELD/.test(tem.key)
  })
  imgExtfieldList.value = templateList.value.filter((tem) => {
    return /UPLOAD_EXTFIELD/.test(tem.key) && /IMAGE/.test(tem.type)
  })
  docExtfieldList.value = templateList.value.filter((tem) => {
    return /UPLOAD_EXTFIELD/.test(tem.key) && /DOC/.test(tem.type)
  })
  educationType.value = data.educationType
}

// 是否取订单上的报名手机号
const isOrderMobile = computed(() => {
  const result = onlyOneTemplateList.value.find((item) => ['报名手机号'].includes(item.desc))
  return (result && result.valueMode === 1) || false
})
// 是否取订单上的身份证号
const isOrderCardNo = computed(() => {
  const result = onlyOneTemplateList.value.find((item) => ['身份证号'].includes(item.desc))
  return (result && result.valueMode === 1) || false
})

// 获取用户表单信息和审核信息
const getCustomerInfo = async () => {
  interface baseFormProp {
    signUpMobile?: any
    customerMobile?: any
    provinceId?: any
    areaId?: any
    cardNo?: any
    userInfo?: any
  }
  const cauditForm = {}
  const cbaseForm: baseFormProp = {}
  const data = await queryCustomerInfo({ signUpRecordId: queryInfo.value.signUpRecordId })
  const infoFromOrder = await queryInfoFromOrder({ signUpRecordId: queryInfo.value.signUpRecordId })
  /**
   * 处理 userInfo ：userInfo = userInfo + otherInfoTemplateList
   * 若请求回来的数据中的 userInfo 有值，则将这些值的 value 分别赋值给 otherInfoTemplateList
   *  得到的新的值再赋值给 userInfo
   *  这样做的目的是规则可能会调整（新增规则）导致 userInfo 和 otherInfoTemplateList（只会多不会少） 不一致
   * 没值的话 直接取 otherInfoTemplateList
   */
  const queryedUserInfo = data.userInfo && JSON.parse(data.userInfo)
  console.log(' hj ~ file: index.vue:606 ~ getCustomerInfo ~ queryedUserInfo:', queryedUserInfo)
  const userInfo = otherInfoTemplateList.value.map((otherInfoTemplateItem: TEMPLATE_ITEM) => {
    if (queryedUserInfo && queryedUserInfo.length > 0) {
      const index = queryedUserInfo.findIndex((item: any) => item.ident === otherInfoTemplateItem.ident)
      if (index !== -1) {
        otherInfoTemplateItem.value = queryedUserInfo[index].value
      }
    }
    return otherInfoTemplateItem
  })
  data.userInfo = userInfo

  // 处理customer的信息，拆分为基础信息，图片信息，校验信息等
  Object.keys(data).forEach((key) => {
    if (AUDIT_STATUS_KEYS.includes(key)) {
      cauditForm[key] = data[key]
    } else {
      cbaseForm[key] = data[key]
    }
  })

  const { signUpMobile, cardNo, customerMobile } = cbaseForm
  // 默认设置为浙江杭州
  baseForm.value = {
    ...cbaseForm,
    signUpMobile: isOrderMobile ? infoFromOrder.mobile : signUpMobile || customerMobile,
    cardNo: isOrderCardNo ? infoFromOrder.cardNo : cardNo,
    userInfo
  }
  auditForm.value = {
    ...cauditForm
    // dataStatus: 3,
    // dataCheckStatus: 13,
    // // examStatus: 2,
    // status: 3
  }
  oldBaseInfo.value = { ...baseForm.value }
  console.log('getCustomerInfo -> baseForm.value', baseForm.value)
  console.log('getCustomerInfo -> auditForm.value', auditForm.value)
}

// 选择地区
const setAreaInfo = (value: any) => {
  baseForm.value = {
    ...baseForm.value,
    ...value
  }
  console.log('handleChangeArea -> ', baseForm.value)
}

// 判断是否展示对应的输入项
const showOnlyOnceFormItem = (desc: any) => {
  return onlyOneTemplateList.value.find((i) => i.desc === desc)
}
// 重新填写
const handleReWrite = () => {
  console.log('handleReWrite -> auditForm.value', auditForm.value.isOutDate)
  if (auditForm.value.isOutDate) return Toast('报名提交资料时间已过，不可重新填写')

  isReWrite.value = true
}
// 保存草稿
const handleSaveDraft = async () => {
  if (isPreview.value) return
  const cparams = buildSaveParams()
  console.log('handleSaveDraft -> cparams', cparams)
  const data = await saveCustomerInfo({
    ...cparams,
    action: 2 // 保存草稿
  })
  console.log('handleSaveDraft -> data', data)
  Toast('保存成功~')
  getCustomerInfo()
}
// 点击上一步
const handlePreStep = () => {
  step.value = 'basis'
}
const infoChangeFlag = ref<boolean>(false)
const baseFormRef = ref<FormInstance>()
// 点击下一步
const handleNextStep = async () => {
  if (isPreview.value) {
    step.value = 'photo'
    return
  }
  console.log(' hj ~ file: index.vue:634 ~ handleNextStep ~ isJixuJiaoyu:', isJixuJiaoyu.value)
  if (isJixuJiaoyu.value) {
    if (!baseForm.value.additional || !baseForm.value.studyMajor) {
      Toast('有必选项为空！')
      console.log('🚀 ~ file: 一建继续教育 ~ 有必选项为空！')
      return
    }
  }
  console.log('11111', baseForm.value, baseFormRef.value)
  if (couldEdit.value) {
    if (!checkRequiredParams(true)) return
    const data = await baseFormRef.value?.validate()
    console.log('handleNextStep -> data', data)
  }
  // 校验身份信息是否有变化
  const hasInfoChange = checkInfoChange()
  console.log('handleNextStep -> hasInfoChange', hasInfoChange)
  if (!infoChangeFlag.value && hasInfoChange) {
    showCheckDiffDialog.value = true
    return
  }
  step.value = 'photo'
}
// 校验身份信息是否有变化
const checkInfoChange = () => {
  const { customerName: oldName, cardNo: oldCardNo } = oldBaseInfo.value
  console.log('checkInfoChange -> oldName', oldName)
  const { customerName, cardNo } = baseForm.value
  console.log('checkInfoChange -> name', customerName)
  // 姓名变动过
  if (oldName !== customerName) {
    return true
  }
  // 需要填身份证号 && 身份证号输入不一致
  if (oldCardNo.toLocaleLowerCase() !== cardNo.toLocaleLowerCase()) {
    return true
  }
  return false
}

const captchaFlag = ref<boolean>(false)
// 提交信息
const handleSubmit = async () => {
  if (isPreview.value) return
  await baseFormRef.value?.validate()

  const cparams = buildSaveParams()
  console.log('handleSubmit -> cparams', cparams)

  if (!checkRequiredParams()) return

  // 只有一个步骤时 信息改变需要弹窗提示
  if (isOnlyOneStep.value && !infoChangeFlag.value && checkInfoChange()) {
    showCheckDiffDialog.value = true
    return
  }

  // 检查手机号是否变更
  if (!captchaFlag.value && hasMobileChange()) {
    showInputCaptchaDialog.value = true
    return
  }
  try {
    const data = await saveCustomerInfo({
      ...cparams,
      action: 3 // 提交
    })
    console.log('handleSubmit -> data', data)
    Toast('提交成功~')
    showSubmitSuccessDialog.value = true
  } catch {
    console.log('catch 1111111')
    infoChangeFlag.value = false
    captchaFlag.value = false
  }
}
// 手机号有变更
const hasMobileChange = () => {
  const { signUpMobile, customerMobile } = baseForm.value
  return signUpMobile !== customerMobile
}

const buildSaveParams = () => {
  console.log('buildSaveParams -> baseForm', baseForm.value, {
    ...baseForm.value,
    userInfo: JSON.stringify(baseForm.value.userInfo),
    signUpRecordId: queryInfo.value.signUpRecordId
  })
  return {
    ...baseForm.value,
    userInfo: JSON.stringify(baseForm.value.userInfo),
    signUpRecordId: queryInfo.value.signUpRecordId
  }
}

// 检验 userInfo 里面的必填项是否有值
const checkRequiredParams = (ExcludePicAndFile = false) => {
  if (baseForm.value.userInfo) {
    const result = baseForm.value.userInfo.find((item: any) => {
      const bol = !item.unnecessary && (Array.isArray(item.value) ? !item.value.length : !item.value)
      if (ExcludePicAndFile) {
        return !['图片', '文件'].includes(item.desc) && bol
      }
      return bol
    })
    console.log(' hj ~ file: index.vue:1024 ~ result ~ result:', result)
    if (result) {
      Toast(`${result.desc}必填`)
      return false
    }
  }
  return true
}

// 信息有修改
const handleConfirmChangeInfo = () => {
  infoChangeFlag.value = true
  // 只有一个步骤 confirm 事件后直接submit
  if (isOnlyOneStep.value) {
    handleSubmit()
  } else {
    step.value = 'photo'
  }
}
// 发送验证码
const handleConfirmInputCaptcha = (captcha: any) => {
  baseForm.value.captcha = captcha
  captchaFlag.value = true
  handleSubmit()
}
// 刷新页面
const handleConfirmSubmitSuccess = () => {
  window.location.reload()
}
// components: {
//   // template中的模块
//   ...modules,
// },
</script>
<script lang="ts">
/**
 * 自动引入 templata中的所有vue 模板文件
 */
const modulesFiles = import.meta.globEager('./components/Template/*.vue')
const modules = {}
Object.keys(modulesFiles).forEach((modulePath) => {
  const moduleName = modulePath.replace(/^.\/components\/Template\/(.*)\.vue/, '$1')
  modules[moduleName] = modulesFiles[modulePath].default
})
export default {
  name: 'BasicInfo',
  components: {
    ...modules
  }
}
</script>
<style lang="scss">
@import '@/styles/mixin.scss';
$tip-size-color: #999;
$input-border: #dadada;

.page-fill-info {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  padding-bottom: 89px;
  overflow: auto;
  background: #f4f5f9;
}
.basis-form {
  // margin-top: 10px;
  padding-top: 15px;
  background: #fff;

  :deep(.van-cell::after) {
    border-bottom: 1px solid transparent;
  }

  .info-space {
    padding: 14px 24px 27px 24px;
    border: 0;
    :deep(.van-cell__value) {
      // border-bottom: 1px solid $input-border;
      border-radius: 0;
      font-size: 15px;
      .van-field__body {
        border-bottom: 1px solid $input-border;
      }

      .van-field__right-icon {
        padding: 0;
        margin-right: -2px;
      }
    }
    .radio-sex {
      display: flex;
      align-items: center;
    }
    .radio-size-color {
      color: #999;
    }

    .img-icon {
      width: 13px;
      margin-right: 8px;
    }
  }
  .years {
    flex-direction: row-reverse;
    :deep(.van-field__label) {
      width: 15px;
      border-bottom: 1px solid #dadada;
    }
  }
  .form-space {
    width: 100%;
    height: 79px;
    background: #f4f5f9;
  }
}

.bottom {
  position: fixed;
  bottom: 0;
  width: 100%;
  border: 1px solid #f4f5f9;
  padding: 10px 15px;
  display: flex;
  align-items: center;
  justify-content: space-around;
  box-sizing: border-box;
  background: #fff;

  .save,
  .next {
    width: 100%;
    height: 49px;
    border-radius: 4px;
    font-size: 16px;
    line-height: 49px;
    text-align: center;
    color: #fff;
    border-radius: 4px;
  }
  .save {
    background: #37ce81;
    margin-right: 15px;
  }
  .pre {
    margin-right: 15px;
  }
  .next {
    background: $bimPrimary;
  }
  :last-child {
    margin-right: 0;
  }
}
</style>
