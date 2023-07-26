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
      <!-- 姓名 -->
      <TempName
        v-if="showFormItem(BASIS_TEMPLATE_KEY_MAP.INPUT_NAME)"
        v-model:value="baseForm.customerName"
        :tip-title="showFormItem(BASIS_TEMPLATE_KEY_MAP.INPUT_NAME).tips"
        :could-edit="couldEdit && !isJixuJiaoyu"
        :disabled="isJixuJiaoyu"
      ></TempName>

      <!-- 姓名拼音 -->
      <TempNameSpell
        v-if="showFormItem(BASIS_TEMPLATE_KEY_MAP.INPUT_NAMEPINYIN)"
        v-model:value="baseForm.namePinyin"
        :tip-title="showFormItem(BASIS_TEMPLATE_KEY_MAP.INPUT_NAMEPINYIN).tips"
        :could-edit="couldEdit"
      ></TempNameSpell>

      <!-- 性别 -->
      <TempGender
        v-if="showFormItem(BASIS_TEMPLATE_KEY_MAP.INPUT_GENDER)"
        v-model:value="baseForm.gender"
        :template-item="showFormItem(BASIS_TEMPLATE_KEY_MAP.INPUT_GENDER)"
        :could-edit="couldEdit"
      ></TempGender>

      <!-- 民族 -->
      <TempNation
        v-if="showFormItem(BASIS_TEMPLATE_KEY_MAP.INPUT_NATION)"
        v-model:value="baseForm.nation"
        :template-item="showFormItem(BASIS_TEMPLATE_KEY_MAP.INPUT_NATION)"
        :could-edit="couldEdit"
      ></TempNation>

      <!-- 身份证号 -->
      <TempCardNo
        v-if="showFormItem(BASIS_TEMPLATE_KEY_MAP.INPUT_CARDNO)"
        v-model:value="baseForm.cardNo"
        :template-item="showFormItem(BASIS_TEMPLATE_KEY_MAP.INPUT_CARDNO)"
        :could-edit="couldEdit && !isMakeupExam && !isJixuJiaoyu"
        :disabled="isMakeupExam || isJixuJiaoyu"
      ></TempCardNo>

      <!-- 手机号 -->
      <TempMobile
        v-if="showFormItem(BASIS_TEMPLATE_KEY_MAP.INPUT_MOBILE)"
        v-model:value="baseForm.signUpMobile"
        :template-item="showFormItem(BASIS_TEMPLATE_KEY_MAP.INPUT_MOBILE)"
        :could-edit="couldEdit && !isJixuJiaoyu"
        :disabled="isJixuJiaoyu"
      ></TempMobile>

      <!-- 通讯地址 -->
      <TempAddress
        v-if="showFormItem(BASIS_TEMPLATE_KEY_MAP.INPUT_ADDRESS)"
        v-model:value="baseForm.address"
        :template-item="showFormItem(BASIS_TEMPLATE_KEY_MAP.INPUT_ADDRESS)"
        :could-edit="couldEdit"
      ></TempAddress>

      <!-- 报考省市 -->
      <TempArea
        v-if="showFormItem(BASIS_TEMPLATE_KEY_MAP.AREA_APPLYAREA)"
        :province-id="baseForm.provinceId"
        :area-id="baseForm.areaId"
        :could-edit="isSevenType ? false : couldEdit"
        :education-type="educationType"
        :template-item="showFormItem(BASIS_TEMPLATE_KEY_MAP.AREA_APPLYAREA)"
        @change="handleChangeArea"
      ></TempArea>

      <!-- 考场名称 -->
      <TempExamRoom
        v-if="showFormItem(BASIS_TEMPLATE_KEY_MAP.INPUT_EXAM_ROOM)"
        v-model:value="baseForm.examRoom"
        :tip-title="showFormItem(BASIS_TEMPLATE_KEY_MAP.INPUT_EXAM_ROOM).tips"
        :could-edit="false"
      ></TempExamRoom>

      <!-- 出生日期 -->
      <TempBirthday
        v-if="showFormItem(BASIS_TEMPLATE_KEY_MAP.DATE_BORN)"
        v-model:value="baseForm.birthday"
        :tip-title="showFormItem(BASIS_TEMPLATE_KEY_MAP.DATE_BORN).tips"
        :could-edit="couldEdit"
      ></TempBirthday>

      <!-- 毕业日期 -->
      <TempGraduateTime
        v-if="showFormItem(BASIS_TEMPLATE_KEY_MAP.DATE_GRADUATEDATE)"
        v-model:value="baseForm.graduateTime"
        :template-item="showFormItem(BASIS_TEMPLATE_KEY_MAP.DATE_GRADUATEDATE)"
        :could-edit="couldEdit"
      ></TempGraduateTime>

      <!-- 毕业院校 -->
      <TempGraduateSchool
        v-if="showFormItem(BASIS_TEMPLATE_KEY_MAP.INPUT_SCHOOL)"
        v-model:value="baseForm.graduateSchool"
        :template-item="showFormItem(BASIS_TEMPLATE_KEY_MAP.INPUT_SCHOOL)"
        :could-edit="couldEdit"
      ></TempGraduateSchool>

      <!-- 邮箱 -->
      <TempEmail
        v-if="showFormItem(BASIS_TEMPLATE_KEY_MAP.INPUT_EMAIL)"
        v-model:value="baseForm.email"
        :template-item="showFormItem(BASIS_TEMPLATE_KEY_MAP.INPUT_EMAIL)"
        :could-edit="couldEdit"
      ></TempEmail>

      <!-- 选择学历 list选择 -->
      <TempListEducation
        v-if="showFormItem(BASIS_TEMPLATE_KEY_MAP.LIST_EDUCATION)"
        v-model:value="baseForm.education"
        :template-item="showFormItem(BASIS_TEMPLATE_KEY_MAP.LIST_EDUCATION)"
        :could-edit="couldEdit"
        :education-type="educationType"
      ></TempListEducation>

      <!-- 选择报考地点 list选择 -->
      <TempListExamArea
        v-if="showFormItem(BASIS_TEMPLATE_KEY_MAP.LIST_EXAM_AREA)"
        v-model:value="baseForm.examArea"
        :tip-title="showFormItem(BASIS_TEMPLATE_KEY_MAP.LIST_EXAM_AREA).tips"
        :could-edit="couldEdit"
        :options="showFormItem(BASIS_TEMPLATE_KEY_MAP.LIST_EXAM_AREA).options"
      ></TempListExamArea>

      <!-- 所学专业 input输入 -->
      <TempStudyMajor
        v-if="showFormItem(BASIS_TEMPLATE_KEY_MAP.INPUT_PROFESSION)"
        v-model:value="baseForm.studyMajor"
        :template-item="showFormItem(BASIS_TEMPLATE_KEY_MAP.INPUT_PROFESSION)"
        :could-edit="couldEdit"
      ></TempStudyMajor>

      <!-- 选择专业 list选择 -->
      <TempListStudyMajor
        v-if="showFormItem(BASIS_TEMPLATE_KEY_MAP.LIST_PROFESSION)"
        v-model:value="baseForm.studyMajor"
        :template-item="showFormItem(BASIS_TEMPLATE_KEY_MAP.LIST_PROFESSION)"
        :could-edit="couldEdit"
      ></TempListStudyMajor>

      <!-- 参加工作时间 -->
      <TempJobTime
        v-if="showFormItem(BASIS_TEMPLATE_KEY_MAP.DATE_TAKEJOBTIME)"
        v-model:value="baseForm.takeJobTime"
        :tip-title="showFormItem(BASIS_TEMPLATE_KEY_MAP.DATE_TAKEJOBTIME).tips"
        :could-edit="couldEdit"
      ></TempJobTime>
      <!-- 工作单位 -->
      <TempWorkUnit
        v-if="showFormItem(BASIS_TEMPLATE_KEY_MAP.INPUT_UNIT)"
        v-model:value="baseForm.workUnit"
        :tip-title="showFormItem(BASIS_TEMPLATE_KEY_MAP.INPUT_UNIT).tips"
        :could-edit="couldEdit"
      ></TempWorkUnit>

      <!-- 工作年限 -->
      <TempWorkYear
        v-if="showFormItem(BASIS_TEMPLATE_KEY_MAP.INPUT_WORKYEAR)"
        v-model:value="baseForm.workYear"
        :template-item="showFormItem(BASIS_TEMPLATE_KEY_MAP.INPUT_WORKYEAR)"
        :could-edit="couldEdit"
      ></TempWorkYear>

      <!-- 学习网站账号 -->
      <TempAccount
        v-if="showFormItem(BASIS_TEMPLATE_KEY_MAP.INPUT_THIRDACCOUNT)"
        v-model:value="baseForm.thirdAccount"
        :template-item="showFormItem(BASIS_TEMPLATE_KEY_MAP.INPUT_THIRDACCOUNT)"
        :could-edit="couldEdit"
      >
      </TempAccount>

      <!-- 学习网站密码 -->
      <TempPassword
        v-if="showFormItem(BASIS_TEMPLATE_KEY_MAP.INPUT_THIRDPASSWORD)"
        v-model:value="baseForm.thirdPassword"
        :template-item="showFormItem(BASIS_TEMPLATE_KEY_MAP.INPUT_THIRDPASSWORD)"
        :could-edit="couldEdit"
      >
      </TempPassword>

      <!-- 注册证书编号 -->
      <TempCertNo
        v-if="showFormItem(BASIS_TEMPLATE_KEY_MAP.INPUT_CERT_NO)"
        v-model:value="baseForm.certNo"
        :template-item="showFormItem(BASIS_TEMPLATE_KEY_MAP.INPUT_CERT_NO)"
        :could-edit="couldEdit"
      ></TempCertNo>

      <!-- 主项/增项 list-->
      <TempAdditional
        v-if="showFormItem(BASIS_TEMPLATE_KEY_MAP.LIST_ADDITIONAL)"
        v-model:value="baseForm.additional"
        :template-item="showFormItem(BASIS_TEMPLATE_KEY_MAP.LIST_ADDITIONAL)"
        :could-edit="couldEdit"
      ></TempAdditional>

      <!-- 单位职位 list选择 -->
      <TempListUnitPosiiton
        v-if="showFormItem(BASIS_TEMPLATE_KEY_MAP.LIST_UNIT_POSITION)"
        v-model:value="baseForm.unitPosition"
        :tip-title="showFormItem(BASIS_TEMPLATE_KEY_MAP.LIST_UNIT_POSITION).tips"
        :could-edit="couldEdit"
      ></TempListUnitPosiiton>

      <!-- 资格证书 list选择 -->
      <TempListQualification
        v-if="showFormItem(BASIS_TEMPLATE_KEY_MAP.LIST_QUALIFICATIONCERTIFICATE)"
        v-model:value="baseForm.qualificationName"
        :tip-title="showFormItem(BASIS_TEMPLATE_KEY_MAP.LIST_QUALIFICATIONCERTIFICATE).tips"
        :could-edit="couldEdit"
      ></TempListQualification>

      <!-- 级别 list选择 -->
      <TempListLevel
        v-if="showFormItem(BASIS_TEMPLATE_KEY_MAP.LIST_LEVEL)"
        v-model:value="baseForm.level"
        :tip-title="showFormItem(BASIS_TEMPLATE_KEY_MAP.LIST_LEVEL).tips"
        :could-edit="couldEdit"
      ></TempListLevel>

      <!-- 方向 list选择 -->
      <TempListDirection
        v-if="showFormItem(BASIS_TEMPLATE_KEY_MAP.LIST_DIRECTION)"
        v-model:value="baseForm.direction"
        :tip-title="showFormItem(BASIS_TEMPLATE_KEY_MAP.LIST_DIRECTION).tips"
        :could-edit="couldEdit"
      ></TempListDirection>

      <!-- 软件 -->
      <div v-if="showFormItem(BASIS_TEMPLATE_KEY_MAP.LABEL_SOFTWAVE)">
        <Title :tip-title="showFormItem(BASIS_TEMPLATE_KEY_MAP.LABEL_SOFTWAVE).tips" label="软件" />
        <van-field class="info-space" readonly :model-value="'revit'" />
      </div>

      <template v-for="item in extfieldList">
        <TempInputExtField
          v-if="/INPUT/.test(item.key)"
          :key="item.inputParameter"
          v-model:value="baseForm[item.inputParameter]"
          :template-item="item"
          :could-edit="couldEdit"
        ></TempInputExtField>
        <TempListextField
          v-if="/LIST/.test(item.key)"
          :key="item.inputParameter"
          v-model:value="baseForm[item.inputParameter]"
          :template-item="item"
          :could-edit="couldEdit"
          :education-type="educationType"
        ></TempListextField>
      </template>

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
      ref="photoInfoFormRef"
      :cphoto-form="photoForm"
      :cfile-form="fileForm"
      :could-edit="couldEdit"
      :template-list="templateList"
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
import { Form as vanForm, Field as vanField, Toast } from 'vant'
import type { FormInstance } from 'vant'
import { TEMPLATE_ITEM } from '@/typings/sign-up'

import { BASIS_TEMPLATE_KEY_LIST, BASIS_TEMPLATE_KEY_MAP, AUDIT_STATUS_MAP, DATA_WRITE_STATUS_MAP } from '@/constant'
import { isStrImageEnd, isStrFileEnd } from '@/utils'
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
import Title from './components/Title/index.vue'

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
const muliteKeyNameMap = ref<any>({}) // 多选多校验的key-name map
const muliteTempData = ref<any>({}) // 多选多的校验数据
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
// 报名图片信息
const photoForm = ref<any>({
  cardBackImage: [],
  cardFrontImage: [],
  educationImage: [],
  employmentImage: [],
  photoImage: [],
  preEducationImage: [],
  qualificationImage: [],
  workImage: [],
  applyCheckImage: [],
  fireConfirmAtionImage: [],
  trainingConfirmationImage: []
})
const fileForm = ref<any>({
  idCardFrontBackDocFile: [],
  educationDocFile: [],
  educationPrepareDocFile: [],
  educationCheckReportDocFile: []
})

// 是补考类型: 身份证号不能修改
// signUpType: 1.初次报考 2.考务费报考 3.补考
const isMakeupExam = computed(() => {
  return baseForm.value.signUpType === 3
})
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
// 汇总表3 人事人才网 学历证明 Image选填
const isThreeType = computed(() => {
  return educationType.value === 3
})
// 类型为 美国AutoDsesk
const isOnlyOneStep = computed(() => {
  return educationType.value === 4
})
// 为汇总表6 资格证书和从业证明 image选填
const isSixType = computed(() => {
  return educationType.value === 6
})
// 为汇总表7 考试地点和考场名称不可编辑
const isSevenType = computed(() => {
  return educationType.value === 7
})
// 为汇总表11 毕业证图片和扫描件二选一
// 学历备案表, 学历验证报告 二选一
const isElevenType = computed(() => {
  return educationType.value === 11
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
  console.log(' hj ~ file: index.vue:532 ~ getTemplateList ~ otherInfoTemplateList:', otherInfoTemplateList.value)

  extfieldList.value = templateList.value.filter((tem) => {
    return /EXTFIELD/.test(tem.key)
  })
  imgExtfieldList.value = templateList.value.filter((tem) => {
    return /UPLOAD_EXTFIELD/.test(tem.key) && /IMAGE/.test(tem.type)
  })
  docExtfieldList.value = templateList.value.filter((tem) => {
    return /UPLOAD_EXTFIELD/.test(tem.key) && /DOC/.test(tem.type)
  })
  console.log('🚀 ~ file: index.vue ~ line 614 ~ getTemplateList ~ extfieldList', extfieldList.value)
  educationType.value = data.educationType
  getMuliteTempData()
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

// 多选多的数据
const getMuliteTempData = () => {
  const result = { keyNameMap: {}, tempData: {} }
  muliteTempData.value = templateList.value
    .filter((item) => item.chooseName)
    .reduce(({ keyNameMap, tempData }, curr) => {
      if (!keyNameMap[curr.key]) {
        keyNameMap[curr.key] = curr.chooseName
      }
      if (tempData[curr.chooseName]) {
        tempData[curr.chooseName].inputParamArr.push(curr.inputParameter)
      } else {
        tempData[curr.chooseName] = {
          minChooseCount: curr.minChooseCount,
          inputParamArr: [curr.inputParameter]
        }
      }
      return { keyNameMap, tempData }
    }, result)

  muliteKeyNameMap.value = result.keyNameMap
  muliteTempData.value = result.tempData

  console.log('🚀 ~ file: index.vue ~  ~ muliteTempData.value', muliteKeyNameMap.value, muliteTempData.value)
}

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
  const cphotoForm = {}
  const cfileForm = {}
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
    if (isStrImageEnd(key) || imgExtfieldList.value.map((item) => item.inputParameter).includes(key)) {
      // 图片有值-> = [{url}],  为空 -> = []
      cphotoForm[key] = data[key] ? [{ url: data[key] }] : []
    } else if (isStrFileEnd(key) || docExtfieldList.value.map((item) => item.inputParameter).includes(key)) {
      cfileForm[key] = data[key] ? [data[key]] : []
    } else if (AUDIT_STATUS_KEYS.includes(key)) {
      cauditForm[key] = data[key]
    } else {
      cbaseForm[key] = data[key]
    }
  })

  const { signUpMobile, cardNo, customerMobile, provinceId, areaId } = cbaseForm
  // 默认设置为浙江杭州
  baseForm.value = {
    ...cbaseForm,
    provinceId: isSevenType.value ? 10110000 : provinceId,
    areaId: isSevenType.value ? 10110100 : areaId,
    examRoom: isSevenType.value ? '总部1102' : '',
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
  photoForm.value = cphotoForm
  fileForm.value = cfileForm
  oldBaseInfo.value = { ...baseForm.value }
  console.log('getCustomerInfo -> baseForm.value', baseForm.value)
  console.log('getCustomerInfo -> auditForm.value', auditForm.value)
  console.log('getCustomerInfo -> photoForm.value', photoForm.value)
}

// 选择地区
const handleChangeArea = ({ provinceId, areaId }: any) => {
  console.log('handleChangeArea -> val', provinceId, areaId)
  baseForm.value = {
    ...baseForm.value,
    provinceId,
    areaId
  }
  console.log('handleChangeArea -> ', baseForm.value)
}
const setAreaInfo = (value: any) => {
  baseForm.value = {
    ...baseForm.value,
    ...value
  }
  console.log('handleChangeArea -> ', baseForm.value)
}

// 判断是否展示对应的输入项
const showFormItem = (prop: any) => {
  return templateList.value.find((template) => template.key === prop)
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
    if (!checkRequiredParams()) return
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
  if (
    showFormItem(BASIS_TEMPLATE_KEY_MAP.INPUT_CARDNO) &&
    oldCardNo.toLocaleLowerCase() !== cardNo.toLocaleLowerCase()
  ) {
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

  if (!checkSaveParams(cparams)) return
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

const photoInfoFormRef = ref()
const buildSaveParams = () => {
  photoForm.value = photoInfoFormRef.value.photoForm
  fileForm.value = photoInfoFormRef.value.fileForm

  const cphotoForm = Object.keys(photoForm.value).reduce((res, imageKey) => {
    const imgObj = photoForm.value[imageKey][0]
    if (imgObj) {
      res[imageKey] = imgObj.url || ''
    } else {
      res[imageKey] = ''
    }
    return res
  }, {})
  const cfileForm = Object.keys(fileForm.value).reduce((res, fileKey) => {
    const fileValue = fileForm.value[fileKey][0]
    if (fileValue) {
      res[fileKey] = fileValue.url || ''
    }
    return res
  }, {})
  console.log('buildSaveParams -> cphotoForm', cphotoForm)
  return {
    ...baseForm.value,
    ...cphotoForm,
    ...cfileForm,
    userInfo: JSON.stringify(otherInfoTemplateList.value),
    signUpRecordId: queryInfo.value.signUpRecordId
  }
}

// 检验 userInfo 里面的必填项是否有值
const checkRequiredParams = () => {
  if (baseForm.value.userInfo) {
    const result = baseForm.value.userInfo.find((item: any) => {
      return !item.unnecessary && (Array.isArray(item.value) ? !item.value.length : !item.value)
    })
    console.log(' hj ~ file: index.vue:1024 ~ result ~ result:', result)
    if (result) {
      Toast(`${result.desc}必填`)
      return false
    }
  }
  return true
}
// 保存接口的必填校验
const checkSaveParams = (params: any) => {
  const { AREA_APPLYAREA } = BASIS_TEMPLATE_KEY_MAP

  // 不需要校验的参数(非必填) 智慧消防确认书
  const NO_VALID_KEY_LIST = getNoValidKeyList()

  // 1.得到总的templateList
  // 总表为6时，从业证书和资格证书 为选填，需特殊判断
  const validTemplateList = templateList.value.filter((item) => {
    // 选填，无需校验 filter掉
    return !NO_VALID_KEY_LIST.includes(item.key) && !item.unnecessary
  })
  console.log('checkSaveParams -> templateList.value', templateList.value.length)
  console.log('checkSaveParams -> templateList', validTemplateList.length)
  console.log('🚀 ~ file: index.vue ~ line 705 ~ checkSaveParams ~ validTemplateList', validTemplateList)
  // 2.找出未传值的模板
  const emptyValueTemp = validTemplateList.find((item) => {
    const { inputParameter, key } = item
    // 需要特殊处理的校验
    // 未选择省或者市
    if (key === AREA_APPLYAREA) {
      return !params.provinceId || !params.areaId
    }

    // 其余的普通的模板，都根据 inputParameter 来查找是否为空
    if (inputParameter) {
      const val = params[inputParameter]
      return !val && val !== 0
    }
    return false
  })
  console.log('🚀 ~ file: index.vue ~ line 829 ~ checkSaveParams ~ emptyValueTemp', emptyValueTemp)
  // 3.开始判断空值
  if (emptyValueTemp) {
    const sameKeyTemp = BASIS_TEMPLATE_KEY_LIST.find((item) => item.key === emptyValueTemp.key)
    const desc = sameKeyTemp?.desc || emptyValueTemp.aliasLabelName || ''
    Toast(`${desc}必填`)
    return false
  }
  // 4.特殊判断
  if (isSixType.value) {
    if (!params.employmentImage && !params.qualificationImage) {
      Toast('从业证书和资格证书必选其一')
      return false
    }
  }
  if (isElevenType.value) {
    let flag = true

    const findItem = Object.keys(muliteTempData.value).find((choosName) => {
      const { inputParamArr, minChooseCount } = muliteTempData.value[choosName]
      // params 中传递的 inputParamArr(需要校验的) 中的参数的个数 < minChooseCount
      if (inputParamArr.filter((cinputP: any) => params[cinputP]).length < minChooseCount) {
        Toast(`${choosName}至少选择${minChooseCount}个保存`)
        // flag = false
        return true
      }
      return false
    })
    flag = !findItem
    return flag
  }
  return true
}

// 无需校验的模板
const getNoValidKeyList = () => {
  const {
    UPLOAD_EDUCATION,
    UPLOAD_EMPLOYMENT,
    UPLOAD_QUALIFICATION,
    UPLOAD_FIRE_CONFIRMATION_IMAGE,
    UPLOAD_TEMPLATE_DOCFILE,
    UPLOAD_PREEDUCATION,
    UPLOAD_EDUCATION_DOCFILE
  } = BASIS_TEMPLATE_KEY_MAP

  let list = [UPLOAD_FIRE_CONFIRMATION_IMAGE]
  if (isThreeType.value) {
    list.push(UPLOAD_EDUCATION)
  }
  if (isSixType.value) {
    list = [
      ...list,
      // 从业证书, 资格证书 二选一
      UPLOAD_EMPLOYMENT,
      UPLOAD_QUALIFICATION
    ]
  }
  if (isElevenType.value) {
    list = [
      ...list,
      UPLOAD_EDUCATION_DOCFILE, // 学历扫描件选填
      UPLOAD_PREEDUCATION, // 前置学历照片选填
      ...Object.keys(muliteKeyNameMap.value)
    ]
  }
  if (educationType.value === 12) {
    // 三类人员带模板的报名表非必填
    list.push(UPLOAD_TEMPLATE_DOCFILE)
  }
  return list
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
