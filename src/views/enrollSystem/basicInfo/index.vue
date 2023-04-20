<!--
 * @Descripttion:
 * @version: 1.0.0
 * @Author: 刘帅楠
 * @Date: 2020-07-01 09:25:35
 * @LastEditors: huangjin
 * @LastEditTime: 2023-04-20 10:18:58
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
        :tip-title="showFormItem(BASIS_TEMPLATE_KEY_MAP.INPUT_GENDER).tips"
        :could-edit="couldEdit"
      ></TempGender>

      <!-- 民族 -->
      <TempNation
        v-if="showFormItem(BASIS_TEMPLATE_KEY_MAP.INPUT_NATION)"
        v-model:value="baseForm.nation"
        :tip-title="showFormItem(BASIS_TEMPLATE_KEY_MAP.INPUT_NATION).tips"
        :could-edit="couldEdit"
      ></TempNation>

      <!-- 身份证号 -->
      <TempCardNo
        v-if="showFormItem(BASIS_TEMPLATE_KEY_MAP.INPUT_CARDNO)"
        v-model:value="baseForm.cardNo"
        :tip-title="showFormItem(BASIS_TEMPLATE_KEY_MAP.INPUT_CARDNO).tips"
        :could-edit="couldEdit && !isMakeupExam && !isJixuJiaoyu"
        :disabled="isMakeupExam || isJixuJiaoyu"
      ></TempCardNo>

      <!-- 手机号 -->
      <TempMobile
        v-if="showFormItem(BASIS_TEMPLATE_KEY_MAP.INPUT_MOBILE)"
        v-model:value="baseForm.signUpMobile"
        :tip-title="showFormItem(BASIS_TEMPLATE_KEY_MAP.INPUT_MOBILE).tips"
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
    </van-form>

    <PhotoInfoForm
      v-show="!showBasisStep"
      v-model:photo-form="photoForm"
      v-model:file-form="fileForm"
      :could-edit="couldEdit"
      :template-list="templateList"
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
<script>
import { Form, Field } from 'vant'
import { BASIS_TEMPLATE_KEY_LIST, BASIS_TEMPLATE_KEY_MAP, AUDIT_STATUS_MAP, DATA_WRITE_STATUS_MAP } from '@/constant'
import { isStrImageEnd, isStrFileEnd } from '@/utils'
import filters from '@/common/filters/index'
import { queryTemplateList, queryCustomerInfo, saveCustomerInfo } from '@/common/api/signUp/enrollSys'
import AuditResult from './components/AuditResult/index.vue'
import Stepbar from './components/Stepbar/index.vue'
import PhotoInfoForm from './PhotoInfoForm.vue'
import CheckDiffInfoTipDialog from './dialogs/CheckDiffInfoTipDialog.vue'
import InputCaptchaDialog from './dialogs/InputCaptchaDialog.vue'
import SubmitSuccessDialog from './dialogs/SubmitSuccessDialog.vue'
import Title from './components/Title/index.vue'

import { basisValidator } from './validate'

/**
 * 自动引入 templata中的所有vue 模板文件
 */
const modulesFiles = import.meta.globEager('./components/Template/*.vue')
const modules = {}
Object.keys(modulesFiles).forEach((modulePath) => {
  const moduleName = modulePath.replace(/^.\/components\/Template\/(.*)\.vue/, '$1')
  modules[moduleName] = modulesFiles[modulePath].default
})

// 审核相关的key
const AUDIT_STATUS_KEYS = [
  'isOutDate', // 是否在报名时间之外
  'dataCheckStatus', // 审核状态
  'dataStatus', // 填写状态
  'status', // 报名状态
  'examStatus', // 考试状态
  'remark' // 审核备注
]

export default {
  name: 'BasicInfo',

  components: {
    AuditResult,
    Stepbar,
    Title,
    PhotoInfoForm,
    CheckDiffInfoTipDialog,
    InputCaptchaDialog,
    SubmitSuccessDialog,

    // template中的模块
    ...modules,

    'van-form': Form,
    'van-field': Field
  },
  data() {
    return {
      queryInfo: {},
      BASIS_TEMPLATE_KEY_MAP,
      isReWrite: false, // 重新填写
      step: 'basis', // 填写的步骤
      basisValidator,
      // 接口请求到的需要展示的输入项
      templateList: [],
      extfieldList: [], // 所有包括拓展字段的数组
      educationType: 0, // 模板的学历类型
      muliteKeyNameMap: {}, // 多选多校验的key-name map
      muliteTempData: {}, // 多选多的校验数据
      // 老的基础信息
      oldBaseInfo: {},
      baseForm: {
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
      },
      auditForm: {},
      showArea: false,

      // 填写信息与下单信息不一致时的弹窗
      showCheckDiffDialog: false,
      // 填写验证码的弹窗
      showInputCaptchaDialog: false,

      showSubmitSuccessDialog: false, // 提交成功的提示弹窗
      // 报名图片信息
      photoForm: {
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
      },
      fileForm: {
        idCardFrontBackDocFile: [],
        educationDocFile: [],
        educationPrepareDocFile: [],
        educationCheckReportDocFile: []
      }
    }
  },
  computed: {
    // 是补考类型: 身份证号不能修改
    // signUpType: 1.初次报考 2.考务费报考 3.补考
    isMakeupExam() {
      return this.baseForm.signUpType === 3
    },
    // 一建继续教育类型的 姓名、身份证号、手机号 不可修改
    isJixuJiaoyu() {
      return this.educationType === 17
    },

    // 为填写状态
    isWritedStatus() {
      console.log('isWritedStatus -> this.', this.auditForm.dataStatus)
      return this.auditForm.dataStatus === DATA_WRITE_STATUS_MAP.WRITED
    },
    // dataCheckStatus 有值 && 为已填写状态
    showAuditResult() {
      const { dataCheckStatus } = this.auditForm
      return dataCheckStatus && this.isWritedStatus
    },
    // auditForm.dataCheckStatus
    // 展示基础信息的面板
    showBasisStep() {
      return this.step === 'basis'
    },
    // 是否可编辑 不为已填写状态 || 没有审核结果 || 重新填写状态
    couldEdit() {
      const { dataCheckStatus } = this.auditForm

      return !this.isWritedStatus || !dataCheckStatus || this.isReWrite
    },
    // 重新填写按钮 有审核结果 && 审核结果不为成功状态 && 不为重新填写状态
    showReWriteBtn() {
      const { dataCheckStatus } = this.auditForm

      // 审核通过状态: 一级审核成功 || 二级审核成功
      const isCheckSuccessStatus = [AUDIT_STATUS_MAP.FIRST_AUDIT_SUCCESS, AUDIT_STATUS_MAP.SECOND_AUDIT_SUCCESS].some(
        (item) => item === dataCheckStatus
      )

      return this.isWritedStatus && dataCheckStatus && !isCheckSuccessStatus && !this.isReWrite
    },
    // 汇总表3 人事人才网 学历证明 Image选填
    isThreeType() {
      return this.educationType === 3
    },
    // 类型为 美国AutoDsesk
    isOnlyOneStep() {
      return this.educationType === 4
    },
    // 为汇总表6 资格证书和从业证明 image选填
    isSixType() {
      return this.educationType === 6
    },
    // 为汇总表7 考试地点和考场名称不可编辑
    isSevenType() {
      return this.educationType === 7
    },
    // 为汇总表11 毕业证图片和扫描件二选一
    // 学历备案表, 学历验证报告 二选一
    isElevenType() {
      return this.educationType === 11
    }
  },
  async created() {
    this.queryInfo = this.$route.query

    await this.getTemplateList()
    this.getCustomerInfo()
  },
  methods: {
    // 选择地区
    handleChangeArea({ provinceId, areaId }) {
      console.log('handleChangeArea -> val', provinceId, areaId)
      this.baseForm = {
        ...this.baseForm,
        provinceId,
        areaId
      }
      console.log('handleChangeArea -> ', this.baseForm)
    },
    // 获取模板列表
    async getTemplateList() {
      const data = await queryTemplateList({ signUpRecordId: this.queryInfo.signUpRecordId })
      this.templateList = [
        ...data.inputData
        // { key: 'UPLOAD_FRONT_AND_BACK_IDCARD_DOCFILE', tip: '请上传身份证正反面word文档', inputParameter: 'idCardFrontAndBackDocFile' }
      ]
      this.extfieldList = this.templateList.filter((tem) => {
        return /EXTFIELD/.test(tem.key)
      })
      this.imgExtfieldList = this.templateList.filter((tem) => {
        return /UPLOAD_EXTFIELD/.test(tem.key) && /IMAGE/.test(tem.type)
      })
      this.docExtfieldList = this.templateList.filter((tem) => {
        return /UPLOAD_EXTFIELD/.test(tem.key) && /DOC/.test(tem.type)
      })
      console.log('🚀 ~ file: index.vue ~ line 614 ~ getTemplateList ~ extfieldList', this.extfieldList)
      this.educationType = data.educationType
      this.getMuliteTempData()
    },
    // 多选多的数据
    getMuliteTempData() {
      const result = { keyNameMap: {}, tempData: {} }
      this.muliteTempData = this.templateList
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

      this.muliteKeyNameMap = result.keyNameMap
      this.muliteTempData = result.tempData

      console.log('🚀 ~ file: index.vue ~  ~ this.muliteTempData', this.muliteKeyNameMap, this.muliteTempData)
    },
    // 获取用户表单信息和审核信息
    async getCustomerInfo() {
      const photoForm = {}
      const fileForm = {}
      const auditForm = {}
      const baseForm = {}
      const data = await queryCustomerInfo({ signUpRecordId: this.queryInfo.signUpRecordId })
      // 处理customer的信息，拆分为基础信息，图片信息，校验信息等
      Object.keys(data).forEach((key) => {
        if (isStrImageEnd(key) || this.imgExtfieldList.map((item) => item.inputParameter).includes(key)) {
          // 图片有值-> = [{url}],  为空 -> = []
          photoForm[key] = data[key] ? [{ url: data[key] }] : []
        } else if (isStrFileEnd(key) || this.docExtfieldList.map((item) => item.inputParameter).includes(key)) {
          fileForm[key] = data[key] ? [data[key]] : []
        } else if (AUDIT_STATUS_KEYS.includes(key)) {
          auditForm[key] = data[key]
        } else {
          baseForm[key] = data[key]
        }
      })

      const { signUpMobile, customerMobile, provinceId, areaId } = baseForm
      // 默认设置为浙江杭州
      this.baseForm = {
        ...baseForm,
        provinceId: this.isSevenType ? 10110000 : provinceId,
        areaId: this.isSevenType ? 10110100 : areaId,
        examRoom: this.isSevenType ? '总部1102' : '',
        signUpMobile: signUpMobile || customerMobile
      }
      this.auditForm = {
        ...auditForm
        // dataStatus: 3,
        // dataCheckStatus: 13,
        // // examStatus: 2,
        // status: 3
      }
      this.photoForm = photoForm
      this.fileForm = fileForm
      this.oldBaseInfo = { ...this.baseForm }
      console.log('getCustomerInfo -> this.baseForm', this.baseForm)
      console.log('getCustomerInfo -> this.auditForm', this.auditForm)
      console.log('getCustomerInfo -> this.photoForm', this.photoForm)
    },
    onConfirmArea(values) {
      this.baseForm.signArea = values.map((item) => item.name).join('/')
      this.showArea = false
    },
    // 判断是否展示对应的输入项
    showFormItem(prop) {
      return this.templateList.find((template) => template.key === prop)
    },
    // 重新填写
    handleReWrite() {
      console.log('handleReWrite -> this.auditForm', this.auditForm.isOutDate)
      if (this.auditForm.isOutDate) return this.$toast('报名提交资料时间已过，不可重新填写')

      this.isReWrite = true
    },
    // 保存草稿
    async handleSaveDraft() {
      const cparams = this.buildSaveParams()
      console.log('handleSaveDraft -> cparams', cparams)
      const data = await saveCustomerInfo({
        ...cparams,
        action: 2 // 保存草稿
      })
      console.log('handleSaveDraft -> data', data)
      this.$toast('保存成功~')
      this.getCustomerInfo()
    },
    // 点击上一步
    handlePreStep() {
      this.step = 'basis'
    },
    // 点击下一步
    async handleNextStep() {
      if (this.isJixuJiaoyu) {
        if (!this.baseForm.additional || !this.baseForm.studyMajor) {
          this.$toast('有必选项为空！')
          console.log('🚀 ~ file: 一建继续教育 ~ 有必选项为空！')
          return
        }
      }
      console.log('11111', this.baseForm)
      if (this.couldEdit) {
        const data = await this.$refs.baseFormRef.validate()
        console.log('handleNextStep -> data', data)
      }
      // 校验身份信息是否有变化
      const hasInfoChange = this.checkInfoChange()
      console.log('handleNextStep -> hasInfoChange', hasInfoChange)
      if (!this.infoChangeFlag && hasInfoChange) {
        this.showCheckDiffDialog = true
        return
      }
      this.step = 'photo'
    },
    // 校验身份信息是否有变化
    checkInfoChange() {
      const { customerName: oldName, cardNo: oldCardNo } = this.oldBaseInfo
      console.log('checkInfoChange -> oldName', oldName)
      const { customerName, cardNo } = this.baseForm
      console.log('checkInfoChange -> name', customerName)
      // 姓名变动过
      if (oldName !== customerName) {
        return true
      }
      // 需要填身份证号 && 身份证号输入不一致
      if (
        this.showFormItem(BASIS_TEMPLATE_KEY_MAP.INPUT_CARDNO) &&
        oldCardNo.toLocaleLowerCase() !== cardNo.toLocaleLowerCase()
      ) {
        return true
      }
      return false
    },
    // 提交信息
    async handleSubmit() {
      await this.$refs.baseFormRef.validate()

      const cparams = this.buildSaveParams()
      console.log('handleSubmit -> cparams', cparams)

      if (!this.checkSaveParams(cparams)) return

      // 只有一个步骤时 信息改变需要弹窗提示
      if (this.isOnlyOneStep && !this.infoChangeFlag && this.checkInfoChange()) {
        this.showCheckDiffDialog = true
        return
      }

      // 检查手机号是否变更
      if (!this.captchaFlag && this.hasMobileChange()) {
        this.showInputCaptchaDialog = true
        return
      }
      try {
        const data = await saveCustomerInfo({
          ...cparams,
          action: 3 // 提交
        })
        console.log('handleSubmit -> data', data)
        this.$toast('提交成功~')
        this.showSubmitSuccessDialog = true
      } catch {
        console.log('catch 1111111')
        this.infoChangeFlag = false
        this.captchaFlag = false
      }
    },
    // 手机号有变更
    hasMobileChange() {
      const { signUpMobile, customerMobile } = this.baseForm
      return signUpMobile !== customerMobile
    },
    buildSaveParams() {
      const cphotoForm = Object.keys(this.photoForm).reduce((res, imageKey) => {
        const imgObj = this.photoForm[imageKey][0]
        if (imgObj) {
          res[imageKey] = imgObj.url || ''
        } else {
          res[imageKey] = ''
        }
        return res
      }, {})
      const cfileForm = Object.keys(this.fileForm).reduce((res, fileKey) => {
        const fileValue = this.fileForm[fileKey][0]
        if (fileValue) {
          res[fileKey] = fileValue
        }
        return res
      }, {})
      console.log('buildSaveParams -> cphotoForm', cphotoForm)
      return {
        ...this.baseForm,
        ...cphotoForm,
        ...cfileForm,
        signUpRecordId: this.queryInfo.signUpRecordId
      }
    },
    // 保存接口的必填校验
    checkSaveParams(params) {
      const { AREA_APPLYAREA } = BASIS_TEMPLATE_KEY_MAP

      // 不需要校验的参数(非必填) 智慧消防确认书
      const NO_VALID_KEY_LIST = this.getNoValidKeyList()

      // 1.得到总的templateList
      // 总表为6时，从业证书和资格证书 为选填，需特殊判断
      const validTemplateList = this.templateList.filter((item) => {
        // 选填，无需校验 filter掉
        return !NO_VALID_KEY_LIST.includes(item.key) && !item.unnecessary
      })
      console.log('checkSaveParams -> this.templateList', this.templateList.length)
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
        const sameKeyTemp = BASIS_TEMPLATE_KEY_LIST.find((item) => item.key === emptyValueTemp.key) || {}
        const desc = sameKeyTemp.desc || emptyValueTemp.aliasLabelName || ''
        this.$toast(`${desc}必填`)
        return false
      }
      // 4.特殊判断
      if (this.isSixType) {
        if (!params.employmentImage && !params.qualificationImage) {
          this.$toast('从业证书和资格证书必选其一')
          return false
        }
      }
      if (this.isElevenType) {
        let flag = true

        const findItem = Object.keys(this.muliteTempData).find((choosName) => {
          const { inputParamArr, minChooseCount } = this.muliteTempData[choosName]
          // params 中传递的 inputParamArr(需要校验的) 中的参数的个数 < minChooseCount
          if (inputParamArr.filter((cinputP) => params[cinputP]).length < minChooseCount) {
            this.$toast(`${choosName}至少选择${minChooseCount}个保存`)
            // flag = false
            return true
          }
          return false
        })
        flag = !findItem
        return flag
      }
      return true
    },
    // 无需校验的模板
    getNoValidKeyList() {
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
      if (this.isThreeType) {
        list.push(UPLOAD_EDUCATION)
      }
      if (this.isSixType) {
        list = [
          ...list,
          // 从业证书, 资格证书 二选一
          UPLOAD_EMPLOYMENT,
          UPLOAD_QUALIFICATION
        ]
      }
      if (this.isElevenType) {
        list = [
          ...list,
          UPLOAD_EDUCATION_DOCFILE, // 学历扫描件选填
          UPLOAD_PREEDUCATION, // 前置学历照片选填
          ...Object.keys(this.muliteKeyNameMap)
        ]
      }
      if (this.educationType === 12) {
        // 三类人员带模板的报名表非必填
        list.push(UPLOAD_TEMPLATE_DOCFILE)
      }
      return list
    },
    // 信息有修改
    handleConfirmChangeInfo() {
      this.infoChangeFlag = true
      // 只有一个步骤 confirm 事件后直接submit
      if (this.isOnlyOneStep) {
        this.handleSubmit()
      } else {
        this.step = 'photo'
      }
    },
    // 发送验证码
    handleConfirmInputCaptcha(captcha) {
      this.baseForm.captcha = captcha
      this.captchaFlag = true
      this.handleSubmit()
    },
    // 刷新页面
    handleConfirmSubmitSuccess() {
      window.location.reload()
    }
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
