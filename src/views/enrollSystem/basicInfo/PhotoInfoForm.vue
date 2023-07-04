<!--
 * @Author: HuZhangjie
 * @Date: 2020-07-02 16:06:49
 * @LastEditors: huangjin
 * @LastEditTime: 2023-07-04 18:23:50
 * @Description: 照片信息表单
-->
<template>
  <div class="photo-info">
    <div class="photo-info__tip">请上传清晰、完整、工整的照片</div>
    <van-form class="form-panel">
      <!-- 身份证照 -->
      <!-- 身份证照片二合一时，反面的隐藏即可 -->
      <div
        v-if="
          showFormItem(BASIS_TEMPLATE_KEY_MAP.UPLOAD_CARD_FRONT) ||
          showFormItem(BASIS_TEMPLATE_KEY_MAP.UPLOAD_CARD_BACK)
        "
        class="form-item"
      >
        <Title label="身份证照" :tip-title="showFormItem(BASIS_TEMPLATE_KEY_MAP.UPLOAD_CARD_FRONT).tips" />
        <div class="identity-card info-space">
          <!-- 身份证正面 -->
          <div>
            <div
              v-if="!aleradyShowIdentityForntDialog && !photoForm.cardFrontImage.length"
              class="identity-card__front"
              @click="handleClickIdentity('front')"
            >
              <upload-slot
                :text="showFormItem(BASIS_TEMPLATE_KEY_MAP.UPLOAD_CARD_FRONT).uploaderTips || '上传身份证国徽面'"
                :upload-bg="identityFrontBg"
              ></upload-slot>
            </div>
            <van-uploader
              v-else
              ref="frontIdentityUploadRef"
              v-model="photoForm.cardFrontImage"
              max-count="1"
              class="identity-card__front"
              :deletable="couldEdit"
              :after-read="(file) => handleAfterRead(file, 'cardFrontImage')"
            >
              <upload-slot
                :text="showFormItem(BASIS_TEMPLATE_KEY_MAP.UPLOAD_CARD_FRONT).uploaderTips || '上传身份证国徽面'"
                :upload-bg="identityFrontBg"
              ></upload-slot>
            </van-uploader>
          </div>

          <!-- 身份证反面 -->
          <div v-if="!showFormItem(BASIS_TEMPLATE_KEY_MAP.UPLOAD_CARD_BACK).unnecessary">
            <div
              v-if="!aleradyShowIdentityBackDialog && !photoForm.cardBackImage.length"
              class="identity-card__back"
              @click="handleClickIdentity('back')"
            >
              <upload-slot
                :text="showFormItem(BASIS_TEMPLATE_KEY_MAP.UPLOAD_CARD_BACK).uploaderTips || '上传身份证人像面'"
                :upload-bg="identityBackBg"
              ></upload-slot>
            </div>
            <van-uploader
              v-else
              ref="backIdentityUploadRef"
              v-model="photoForm.cardBackImage"
              max-count="1"
              class="identity-card__back"
              :deletable="couldEdit"
              :after-read="(file) => handleAfterRead(file, 'cardBackImage')"
            >
              <upload-slot
                :text="showFormItem(BASIS_TEMPLATE_KEY_MAP.UPLOAD_CARD_BACK).uploaderTips || '上传身份证人像面'"
                :upload-bg="identityBackBg"
              ></upload-slot>
            </van-uploader>
          </div>
        </div>
      </div>
      <!-- 身份证word文档 -->
      <div v-if="showFormItem(BASIS_TEMPLATE_KEY_MAP.UPLOAD_FRONT_AND_BACK_IDCARD_DOCFILE)" class="form-item">
        <Title
          label="身份证正反面word"
          :tip-title="showFormItem(BASIS_TEMPLATE_KEY_MAP.UPLOAD_FRONT_AND_BACK_IDCARD_DOCFILE).tips"
        />
        <div class="info-space">
          <van-uploader
            v-model="fileForm.idCardFrontBackDocFile"
            :accept="UPLOAD_PARAM_ACCEPT_MAP.idCardFrontBackDocFile"
            class="upload-file"
            :max-count="1"
            :deletable="couldEdit"
            :after-read="(file) => handleAfterRead(file, 'idCardFrontBackDocFile')"
            :max-size="4 * 1024 * 1024"
            @oversize="handleOverSize"
          >
            <template #preview-cover>
              <van-button
                v-if="!fileForm.idCardFrontBackDocFile || !fileForm.idCardFrontBackDocFile.length"
                icon="plus"
                type="primary"
                >上传文件</van-button
              >
              <div v-else class="upload-file__preview">
                <a :href="fileForm.idCardFrontBackDocFile[0]" download>点击下载查看</a>
              </div>
            </template>
          </van-uploader>
        </div>
      </div>
      <!-- 证件照 -->
      <div v-if="showFormItem(BASIS_TEMPLATE_KEY_MAP.UPLOAD_PHOTO)" class="form-item">
        <Title
          :label="showFormItem(BASIS_TEMPLATE_KEY_MAP.UPLOAD_PHOTO).label || '证件照'"
          :tip-title="showFormItem(BASIS_TEMPLATE_KEY_MAP.UPLOAD_PHOTO).tips"
        />
        <div class="info-space">
          <van-uploader
            v-model="photoForm.photoImage"
            max-count="1"
            class="upload-one-inch"
            :deletable="couldEdit"
            :after-read="(file) => handleAfterRead(file, 'photoImage')"
          >
            <upload-slot :upload-bg="oneInchBg"></upload-slot>
          </van-uploader>
        </div>
      </div>
      <!-- 学历照片 -->
      <div v-if="showFormItem(BASIS_TEMPLATE_KEY_MAP.UPLOAD_EDUCATION)" class="form-item">
        <Title label="学历照片" :tip-title="showFormItem(BASIS_TEMPLATE_KEY_MAP.UPLOAD_EDUCATION).tips" />
        <div class="info-space">
          <van-uploader
            v-model="photoForm.educationImage"
            max-count="1"
            class="upload-education"
            :deletable="couldEdit"
            :after-read="(file) => handleAfterRead(file, 'educationImage')"
          >
            <upload-slot :upload-bg="educationBg"></upload-slot>
          </van-uploader>
        </div>
      </div>
      <!-- 前置学历照片 -->
      <div v-if="showFormItem(BASIS_TEMPLATE_KEY_MAP.UPLOAD_PREEDUCATION)" class="form-item">
        <Title label="前置学历照片" :tip-title="showFormItem(BASIS_TEMPLATE_KEY_MAP.UPLOAD_PREEDUCATION).tips" />
        <div class="info-space">
          <van-uploader
            v-model="photoForm.preEducationImage"
            max-count="1"
            class="upload-education"
            :deletable="couldEdit"
            :after-read="(file) => handleAfterRead(file, 'preEducationImage')"
          >
            <upload-slot :upload-bg="educationBg"></upload-slot>
          </van-uploader>
        </div>
      </div>
      <!-- 学历扫描件文档 -->
      <div v-if="showFormItem(BASIS_TEMPLATE_KEY_MAP.UPLOAD_EDUCATION_DOCFILE)" class="form-item">
        <Title label="学历扫描件文档" :tip-title="showFormItem(BASIS_TEMPLATE_KEY_MAP.UPLOAD_EDUCATION_DOCFILE).tips" />
        <div class="info-space">
          <van-uploader
            v-model="fileForm.educationDocFile"
            accept=".pdf"
            class="upload-file"
            :max-count="1"
            :deletable="couldEdit"
            :after-read="(file) => handleAfterRead(file, 'educationDocFile')"
            :max-size="4 * 1024 * 1024"
            @oversize="handleOverSize"
          >
            <van-button
              v-if="!fileForm.educationDocFile || !fileForm.educationDocFile.length"
              icon="plus"
              type="primary"
              >上传文件</van-button
            >
            <template #preview-cover>
              <div class="upload-file__preview" @click="handlePreviewPdf(fileForm.educationDocFile)">点击下载查看</div>
            </template>
          </van-uploader>
        </div>
      </div>
      <!-- 学历备案表 和 学历验证报告 二选一 -->
      <!-- 学历备案表pdf文档 -->
      <div v-if="showFormItem(BASIS_TEMPLATE_KEY_MAP.UPLOAD_EDUCATION_PREPARE_DOCFILE)" class="form-item">
        <Title
          label="学历备案表pdf文档"
          :tip-title="showFormItem(BASIS_TEMPLATE_KEY_MAP.UPLOAD_EDUCATION_PREPARE_DOCFILE).tips"
        />
        <div class="info-space">
          <van-uploader
            v-model="fileForm.educationPrepareDocFile"
            accept=".pdf"
            class="upload-file"
            :max-count="1"
            :deletable="couldEdit"
            :after-read="(file) => handleAfterRead(file, 'educationPrepareDocFile')"
            :max-size="4 * 1024 * 1024"
            @oversize="handleOverSize"
          >
            <van-button
              v-if="!fileForm.educationPrepareDocFile || !fileForm.educationPrepareDocFile.length"
              icon="plus"
              type="primary"
              >上传文件</van-button
            >
            <template #preview-cover>
              <div class="upload-file__preview" @click="handlePreviewPdf(fileForm.educationPrepareDocFile)">
                点击下载查看
              </div>
            </template>
          </van-uploader>
        </div>
      </div>
      <!-- 学历验证报告pdf文档 -->
      <div v-if="showFormItem(BASIS_TEMPLATE_KEY_MAP.UPLOAD_EDUCATION_CHECK_REPORT_DOCFILE)" class="form-item">
        <Title
          label="学历验证报告pdf文档"
          :tip-title="showFormItem(BASIS_TEMPLATE_KEY_MAP.UPLOAD_EDUCATION_CHECK_REPORT_DOCFILE).tips"
        />
        <div class="info-space">
          <van-uploader
            v-model="fileForm.educationCheckReportDocFile"
            accept=".pdf"
            class="upload-file"
            :max-count="1"
            :deletable="couldEdit"
            :after-read="(file) => handleAfterRead(file, 'educationCheckReportDocFile')"
            :max-size="4 * 1024 * 1024"
            @oversize="handleOverSize"
          >
            <van-button
              v-if="!fileForm.educationCheckReportDocFile || !fileForm.educationCheckReportDocFile.length"
              icon="plus"
              type="primary"
              >上传文件</van-button
            >
            <template #preview-cover>
              <div class="upload-file__preview" @click="handlePreviewPdf(fileForm.educationCheckReportDocFile)">
                点击下载查看
              </div>
            </template>
          </van-uploader>
        </div>
      </div>

      <!-- 中国建设教育协会-BIM所需 职业资格证书 -->
      <div v-if="showFormItem(BASIS_TEMPLATE_KEY_MAP.UPLOAD_QUALIFICATION)" class="form-item">
        <Title label="资格证书" :tip-title="showFormItem(BASIS_TEMPLATE_KEY_MAP.UPLOAD_QUALIFICATION).tips" />
        <div class="info-space">
          <van-uploader
            v-model="photoForm.qualificationImage"
            max-count="1"
            class="upload-education"
            :deletable="couldEdit"
            :after-read="(file) => handleAfterRead(file, 'qualificationImage')"
          >
            <upload-slot :upload-bg="educationBg"></upload-slot>
          </van-uploader>
        </div>
      </div>
      <!-- 中国建设教育协会-BIM所需 BIM从业证明 -->
      <div v-if="showFormItem(BASIS_TEMPLATE_KEY_MAP.UPLOAD_EMPLOYMENT)" class="form-item">
        <Title label="从业证书" :tip-title="showFormItem(BASIS_TEMPLATE_KEY_MAP.UPLOAD_EMPLOYMENT).tips" />
        <div class="info-space">
          <van-uploader
            v-model="photoForm.employmentImage"
            max-count="1"
            class="upload-education"
            :deletable="couldEdit"
            :after-read="(file) => handleAfterRead(file, 'employmentImage')"
          >
            <upload-slot :upload-bg="educationBg"></upload-slot>
          </van-uploader>
        </div>
      </div>

      <!-- 工作证明 -->
      <div v-if="showFormItem(BASIS_TEMPLATE_KEY_MAP.UPLOAD_WORK_IMAGE)" class="form-item">
        <Title label="工作证明" :tip-title="showFormItem(BASIS_TEMPLATE_KEY_MAP.UPLOAD_WORK_IMAGE).tips" />
        <div class="info-space">
          <van-uploader
            v-model="photoForm.workImage"
            max-count="1"
            class="upload-education"
            :deletable="couldEdit"
            :after-read="(file) => handleAfterRead(file, 'workImage')"
          >
            <upload-slot :upload-bg="workProofBg"></upload-slot>
          </van-uploader>
        </div>
      </div>

      <!-- 建研院所需 报名审核表 或者 考核申报表-->
      <div v-if="showFormItem(BASIS_TEMPLATE_KEY_MAP.UPLOAD_APPLY_CHECK_IMAGE)" class="form-item">
        <Title
          :label="showFormItem(BASIS_TEMPLATE_KEY_MAP.UPLOAD_APPLY_CHECK_IMAGE).aliasLabelName || '报名审核表'"
          :tip-title="showFormItem(BASIS_TEMPLATE_KEY_MAP.UPLOAD_APPLY_CHECK_IMAGE).tips"
        />
        <div v-if="showFormItem(BASIS_TEMPLATE_KEY_MAP.UPLOAD_APPLY_CHECK_IMAGE).templateUrl" class="info-template">
          <a :href="showFormItem(BASIS_TEMPLATE_KEY_MAP.UPLOAD_APPLY_CHECK_IMAGE).templateUrl" download>点击下载模板</a>
        </div>
        <div class="info-space">
          <van-uploader
            v-model="photoForm.applyCheckImage"
            max-count="1"
            class="upload-education"
            :deletable="couldEdit"
            :after-read="(file) => handleAfterRead(file, 'applyCheckImage')"
          >
            <upload-slot :upload-bg="workProofBg"></upload-slot>
          </van-uploader>
        </div>
      </div>
      <!-- 带模板的报名表 -->
      <div v-if="showFormItem(BASIS_TEMPLATE_KEY_MAP.UPLOAD_TEMPLATE_DOCFILE)" class="form-item">
        <Title
          :label="showFormItem(BASIS_TEMPLATE_KEY_MAP.UPLOAD_TEMPLATE_DOCFILE).aliasLabelName || '报名表(有模板)'"
          :tip-title="showFormItem(BASIS_TEMPLATE_KEY_MAP.UPLOAD_TEMPLATE_DOCFILE).tips"
        />
        <div v-if="showFormItem(BASIS_TEMPLATE_KEY_MAP.UPLOAD_TEMPLATE_DOCFILE).templateUrl" class="info-template">
          <a :href="showFormItem(BASIS_TEMPLATE_KEY_MAP.UPLOAD_TEMPLATE_DOCFILE).templateUrl" download>点击下载模板</a>
        </div>
        <div class="info-space">
          <van-uploader
            v-model="fileForm.templateDocFile"
            :accept="
              showFormItem(BASIS_TEMPLATE_KEY_MAP.UPLOAD_TEMPLATE_DOCFILE).format ||
              UPLOAD_PARAM_ACCEPT_MAP.templateDocFile
            "
            class="upload-file"
            :max-count="1"
            :deletable="couldEdit"
            :after-read="
              (file) =>
                handleUploadFile(file, 'templateDocFile', showFormItem(BASIS_TEMPLATE_KEY_MAP.UPLOAD_TEMPLATE_DOCFILE))
            "
            :max-size="4 * 1024 * 1024"
            @oversize="handleOverSize"
          >
            <van-button v-if="!fileForm.templateDocFile || !fileForm.templateDocFile.length" icon="plus" type="primary"
              >上传文件</van-button
            >
            <template #preview-cover>
              <div class="upload-file__preview">
                <a :href="fileForm.templateDocFile[0]" download>点击下载查看</a>
              </div>
            </template>
          </van-uploader>
        </div>
      </div>

      <!-- 邮电通信，BIM/装配式/智慧消防所需 智慧消防确认书 -->
      <div v-if="showFormItem(BASIS_TEMPLATE_KEY_MAP.UPLOAD_FIRE_CONFIRMATION_IMAGE)" class="form-item">
        <Title
          label="智慧消防确认书"
          :tip-title="showFormItem(BASIS_TEMPLATE_KEY_MAP.UPLOAD_FIRE_CONFIRMATION_IMAGE).tips"
        />
        <div class="info-space">
          <van-uploader
            v-model="photoForm.fireConfirmationImage"
            max-count="1"
            class="upload-education"
            :deletable="couldEdit"
            :after-read="(file) => handleAfterRead(file, 'fireConfirmationImage')"
          >
            <upload-slot :upload-bg="workProofBg"></upload-slot>
          </van-uploader>
        </div>
      </div>

      <!-- 人社专技术、中国人事人才网所需 培训确认书 -->
      <div v-if="showFormItem(BASIS_TEMPLATE_KEY_MAP.UPLOAD_TRAINING_CONFIRM_IMAGE)" class="form-item">
        <Title
          label="培训确认书"
          :tip-title="showFormItem(BASIS_TEMPLATE_KEY_MAP.UPLOAD_TRAINING_CONFIRM_IMAGE).tips"
        />
        <div
          v-if="showFormItem(BASIS_TEMPLATE_KEY_MAP.UPLOAD_TRAINING_CONFIRM_IMAGE).templateUrl"
          class="info-template"
        >
          <a :href="showFormItem(BASIS_TEMPLATE_KEY_MAP.UPLOAD_TRAINING_CONFIRM_IMAGE).templateUrl" download
            >点击下载模板</a
          >
        </div>
        <div class="info-space">
          <van-uploader
            v-model="photoForm.trainingConfirmationImage"
            max-count="1"
            class="upload-education"
            :deletable="couldEdit"
            :after-read="(file) => handleAfterRead(file, 'trainingConfirmationImage')"
          >
            <upload-slot :upload-bg="workProofBg"></upload-slot>
          </van-uploader>
        </div>
      </div>

      <template v-for="item in extfieldList">
        <!-- 上传照片模板 -->
        <div v-if="/IMAGE/.test(item.type)" :key="item.inputParameter" class="form-item">
          <Title :label="item.aliasLabelName" :tip-title="item.tips" />
          <div class="info-space">
            <van-uploader
              v-model="photoForm[item.inputParameter]"
              max-count="1"
              class="upload-education"
              :deletable="couldEdit"
              :after-read="(file) => handleUploadImage(file, item.inputParameter)"
            >
              <upload-slot :upload-bg="educationBg"></upload-slot>
            </van-uploader>
          </div>
        </div>
        <!-- 上传文件的模板 -->
        <div v-if="/DOC/.test(item.type)" :key="item.inputParameter" class="form-item">
          <Title :label="item.aliasLabelName" :tip-title="item.tips" />
          <div v-if="item.templateUrl" class="info-template">
            <a :href="item.templateUrl" download>点击下载模板</a>
          </div>
          <!-- 这里的 format 是 '.doc,.docx' 的形式，与图片的 format 有所不同 'jpg,jpep' -->
          <div class="info-space">
            <van-uploader
              v-model="fileForm[item.inputParameter]"
              :accept="item.format || getFileAccept(item.type)"
              class="upload-file"
              :max-count="1"
              :deletable="couldEdit"
              :after-read="(file) => handleUploadFile(file, item.inputParameter, item)"
              :max-size="4 * 1024 * 1024"
              @oversize="handleOverSize"
            >
              <van-button
                v-if="!fileForm[item.inputParameter] || !fileForm[item.inputParameter].length"
                icon="plus"
                type="primary"
                >上传文件</van-button
              >
              <template #preview-cover>
                <div class="upload-file__preview">
                  <a :href="fileForm[item.inputParameter][0]" download>点击下载查看</a>
                </div>
              </template>
            </van-uploader>
          </div>
        </div>
      </template>
      <template v-for="item in photoAndFileTempItemList">
        <!-- 上传照片模板 -->
        <div v-if="['图片'].includes(item.desc!)" :key="item.ident" class="form-item">
          <Title :label="item.aliasLabelName" :tip-title="item.tips" />
          <div class="info-space">
            <van-uploader
              v-model="item.value"
              max-count="1"
              class="upload-education"
              :deletable="couldEdit"
              :after-read="(file) => handleUploadImage2(file, item)"
            >
              <upload-slot :upload-bg="educationBg"></upload-slot>
            </van-uploader>
          </div>
        </div>
        <!-- 上传文件的模板 -->
        <div v-if="['文件'].includes(item.desc!)" :key="item.ident" class="form-item">
          <Title :label="item.aliasLabelName" :tip-title="item.tips" />
          <div v-if="item.templateUrl" class="info-template">
            <a :href="item.templateUrl" download>点击下载模板</a>
          </div>
          <!-- 这里的 format 是 '.doc,.docx' 的形式，与图片的 format 有所不同 'jpg,jpep' -->
          <div class="info-space">
            <van-uploader
              v-model="item.value"
              :accept="item.format?.join(',')"
              class="upload-file"
              :max-count="1"
              :deletable="couldEdit"
              :after-read="(file) => handleUploadFile2(file, item)"
              :max-size="4 * 1024 * 1024"
              @oversize="handleOverSize"
            >
              <van-button v-if="!item.value || !item.value.length" icon="plus" type="primary">上传文件</van-button>
              <template #preview-cover>
                <div class="upload-file__preview">
                  <a :href="item.value[0].url" download>点击下载查看</a>
                </div>
              </template>
            </van-uploader>
          </div>
        </div>
      </template>
    </van-form>

    <IdentityTipDialog v-if="showIdentityDialog" v-model:show="showIdentityDialog" :is-front="isFrontDialog" />
  </div>
</template>

<script lang="ts" setup>
import { Form as vanForm, Uploader as vanUploader, Button as vanButton, Toast } from 'vant'
import { uploader as uploadImage, uploadImage as uploadImage2 } from '@/utils/request'
import { BASIS_TEMPLATE_KEY_MAP, ID_PHOTO_ORGAN_SIZE_MAP, PDF_VIEWER_HOST } from '@/constant'
import { isStrImageEnd, isStrFileEnd, getSignUpImageUrl } from '@/utils'
import { TEMPLATE_ITEM } from '@/typings/sign-up'
import Title from './components/Title/index.vue'
import UploadSlot from './components/UploadSlot/index.vue'
import IdentityTipDialog from './dialogs/IdentityTipDialog.vue'
import { handleCompressImg } from './upload'

// 文件类型和参数的map
const UPLOAD_PARAM_ACCEPT_MAP = {
  idCardFrontBackDocFile: '.doc,.docx',
  educationDocFile: '.pdf',
  educationPrepareDocFile: '.pdf',
  educationCheckReportDocFile: '.pdf',
  templateDocFile: '.doc,.docx'
}

interface Props {
  cphotoForm?: object
  cfileForm?: object
  templateList?: any[]
  userInfo?: TEMPLATE_ITEM[]
  couldEdit?: boolean
  organizationId?: number | string
}
const props = withDefaults(defineProps<Props>(), {
  cphotoForm: () => ({}),
  cfileForm: () => ({}),
  templateList: () => [],
  userInfo: () => [],
  couldEdit: true,
  organizationId: ''
})
const { cphotoForm, cfileForm, templateList, couldEdit, organizationId, userInfo } = toRefs(props)

const photoForm = ref<any>(cphotoForm.value)
const fileForm = ref<any>(cfileForm.value)
defineExpose({
  photoForm,
  fileForm
})

const photoAndFileTempItemList = computed(() =>
  userInfo.value.filter((i) => ['图片', '文件'].includes(i.desc as string))
)
console.log(' hj ~ file: PhotoInfoForm.vue:551 ~ photoAndFileTempItemList:', photoAndFileTempItemList)
// UPLOAD_PARAM_ACCEPT_MAP,
//       BASIS_TEMPLATE_KEY_MAP,
// 展示身份证提示的弹窗
const showIdentityDialog = ref<boolean>(false)
// 控制身份证提示弹窗内部的图片
const isFrontDialog = ref<boolean>(true)
// 记录正反弹窗的展示
const aleradyShowIdentityForntDialog = ref<boolean>(false)
const aleradyShowIdentityBackDialog = ref<boolean>(false)

const identityFrontBg = ref<string>(getSignUpImageUrl('bim_answer_lldcard_back@2x.png'))
const identityBackBg = ref<string>(getSignUpImageUrl('bim_answer_lidcard_front@2x.png'))
const oneInchBg = ref<string>(getSignUpImageUrl('bim_answer_lphoto@2x.png'))
const educationBg = ref<string>(getSignUpImageUrl('bim_answer_lDiploma@2x.png'))
const workProofBg = ref<string>(getSignUpImageUrl('bim_answer_work_proof@2x.png'))

const extfieldList = computed(() => {
  return templateList.value.filter((tem) => {
    return /UPLOAD_EXTFIELD/.test(tem.key)
  })
})

const getFileAccept = (type: any) => {
  if (!type) return false
  let acceptType
  switch (type.toLocaleLowerCase()) {
    case 'word':
      acceptType = '.doc,.docx'
      break
    case 'pdf':
      acceptType = '.pdf'
      break

    default:
      break
  }
  return acceptType
}
// 点击弹窗展示身份证的提示弹窗
const handleClickIdentity = (type: any) => {
  // 未展示过提示弹窗
  if (type === 'front' && !aleradyShowIdentityForntDialog.value) {
    showIdentityDialog.value = true
    aleradyShowIdentityForntDialog.value = true
    isFrontDialog.value = true
  } else if (type === 'back' && !aleradyShowIdentityBackDialog.value) {
    showIdentityDialog.value = true
    aleradyShowIdentityBackDialog.value = true
    isFrontDialog.value = false
  }
}

// 上传图片后的回调函数
const handleAfterRead = (file: any, urlType: any) => {
  console.log(' hj ~ file: PhotoInfoForm.vue:547 ~ handleAfterRead ~ urlType:', urlType)
  if (isStrImageEnd(urlType)) {
    handleUploadImage(file, urlType)
  } else if (isStrFileEnd(urlType)) {
    handleUploadFile(file, urlType)
  }
}
// 上传图片-压缩图片
const handleUploadImage = async (file: any, urlType: any) => {
  const type = file.file.name.split('.')[1]
  // templateList中增加format字段的处理
  const tempItem = templateList.value.find((item) => item.inputParameter === urlType)
  if (tempItem.format && tempItem.format.split(',').every((item: any) => item !== type.toLocaleLowerCase())) {
    photoForm.value[urlType] = []
    Toast(`请上传${tempItem.format}格式的图片`)
    return false
  }
  if (!type || ['png', 'jpg'].every((item) => item !== type.toLocaleLowerCase())) {
    photoForm.value[urlType] = []
    Toast('请上传jpg或png格式的图片')
    return false
  }
  const organImageSize = ID_PHOTO_ORGAN_SIZE_MAP[organizationId.value]

  console.log('🚀 ~ file:  ~ organImageSize', organImageSize)
  const fileCompress: any = await handleCompressImg(file.file)
  // 证件照的大小判断，某些机构有要求
  if (['photoImage'].includes(urlType) && organImageSize) {
    if (fileCompress.size > organImageSize * 1024) {
      photoForm.value[urlType] = []
      Toast(`证件照大小超过${organImageSize}K`)
      return false
    }
  }
  if (fileCompress.size > 200 * 1024) {
    photoForm.value[urlType] = []
    Toast('文件大小不能超过 - 200K')
    return false
  }
  uploadImage(fileCompress)
    .then((res: any) => {
      console.log(' hj ~ file: PhotoInfoForm.vue:587 ~ .then ~ res:', res)
      photoForm.value[urlType] = [{ url: res.data.url }]
    })
    .catch((err) => {
      console.log('handleAfterRead -> err', err)
      photoForm.value[urlType] = []
    })
}
// 上传word或者pdf文件
const handleUploadFile = async (file: any, urlType: any, item: any = {}) => {
  const str = file.file.name
  const type = str.substring(str.lastIndexOf('.') + 1, str.length)
  console.log('🚀 ~ file: PhotoInfoForm.vue ~ line 493 ~ handleUploadFile ~ type', type)
  const accept = item.format || UPLOAD_PARAM_ACCEPT_MAP[urlType]
  if (!type || accept.split(',').every((item: any) => item !== `.${type.toLocaleLowerCase()}`)) {
    fileForm.value[urlType] = []
    Toast(`请上传${accept}格式的文件`)
    return false
  }
  console.log('🚀 ~ file: PhotoInfoForm. ~ file, urlType', file, urlType)
  uploadImage(file.file)
    .then((res: any) => {
      fileForm.value[urlType] = [{ url: res.data.url }]
    })
    .catch((err) => {
      console.log('handleAfterRead -> err', err)
      fileForm.value[urlType] = []
    })
}
// 上传图片-压缩图片
const handleUploadImage2 = async (file: any, tempItem: any) => {
  const type = file.file.name.split('.')[1]
  // templateList中增加format字段的处理
  if (tempItem.format && tempItem.format.every((i: any) => i !== `.${type.toLocaleLowerCase()}`)) {
    tempItem.value = []
    Toast(`请上传${tempItem.format.join(',')}格式的图片`)
    return false
  }
  if (!type || ['png', 'jpg'].every((item) => item !== type.toLocaleLowerCase())) {
    tempItem.value = []
    Toast('请上传jpg或png格式的图片')
    return false
  }
  const organImageSize = ID_PHOTO_ORGAN_SIZE_MAP[organizationId.value]

  console.log('🚀 ~ file:  ~ organImageSize', organImageSize)
  const fileCompress: any = await handleCompressImg(file.file)
  // 证件照的大小判断，某些机构有要求
  if (organImageSize) {
    if (fileCompress.size > organImageSize * 1024) {
      tempItem.value = []
      Toast(`证件照大小超过${organImageSize}K`)
      return false
    }
  }
  if (fileCompress.size > 200 * 1024) {
    tempItem.value = []
    Toast('文件大小不能超过 - 200K')
    return false
  }
  uploadImage2(fileCompress)
    .then((res: any) => {
      console.log(' hj ~ file: PhotoInfoForm.vue:587 ~ .then ~ res:', res)
      // tempItem.value = [{ url: res.data.url }]
      tempItem.value = [{ url: res }]
    })
    .catch((err) => {
      console.log('handleAfterRead -> err', err)
      tempItem.value = []
    })
}
// 上传word或者pdf文件
const handleUploadFile2 = async (file: any, tempItem: any = {}) => {
  const str = file.file.name
  const type = str.substring(str.lastIndexOf('.') + 1, str.length)
  console.log('🚀 ~ file: PhotoInfoForm.vue ~ line 493 ~ handleUploadFile ~ type', type)
  const accept = tempItem.format
  if (!type || (accept && accept.every((item: any) => item !== `.${type.toLocaleLowerCase()}`))) {
    tempItem.value = []
    Toast(`请上传${accept.join(',')}格式的文件`)
    return false
  }
  console.log('🚀 ~ file: PhotoInfoForm. ~ file, urlType', file, tempItem)
  uploadImage2(file.file)
    .then((res: any) => {
      console.log(' hj ~ file: PhotoInfoForm.vue:726 ~ .then ~ res:', res)
      // tempItem.value = [{ url: res.data.url }]
      tempItem.value = [{ url: res }]
    })
    .catch((err) => {
      console.log('handleAfterRead -> err', err)
      tempItem.value = []
    })
}
const handlePreviewPdf = (fileUrl: any) => {
  window.open(`${PDF_VIEWER_HOST}?file=${encodeURIComponent(fileUrl)}`)
}
const handleOverSize = () => {
  Toast('文件大小不能超过 - 4M')
}
// 判断是否展示对应的输入项
const showFormItem = (prop: any) => {
  return templateList.value.find((template) => template.key === prop)
}
</script>

<style lang="scss" scoped>
.photo-info {
  :deep(.van-uploader__wrapper) {
    width: 100%;
    height: 100%;
    .van-uploader__preview,
    .van-uploader__preview-image {
      width: 95%;
      height: 95%;
    }
    .van-uploader__input-wrapper {
      width: 100%;
    }
    .van-uploader__preview {
      display: flex;
      justify-content: center;
      align-items: center;
    }
  }

  &__tip {
    padding: 10px 15px;
    color: #999;
  }
  .form-panel {
    padding-top: 15px;
    background: #fff;
    .info-space {
      padding: 14px 24px 27px 24px;
    }
    .info-template {
      padding: 5px 24px 0px 24px;
    }
    .identity-card {
      display: flex;
      justify-content: space-between;
      &__front,
      &__back {
        width: 156px;
        height: 115px;
        border: 1px solid #ececec;
      }
    }
    .upload-one-inch {
      width: 85px;
      height: 120px;
      border: 1px solid #ececec;
    }
    .upload-education {
      width: 165px;
      height: 120px;
      border: 1px solid #ececec;
    }
  }
  // 文件类型的 不展示icon
  .upload-file {
    :deep(.van-uploader__file-icon) {
      display: none;
    }

    :deep(.van-ellipsis) {
      display: none;
    }
    .upload-file__preview {
      height: 100%;
      display: flex;
      justify-content: center;
      align-items: center;
      text-align: center;
    }
  }
}
</style>
