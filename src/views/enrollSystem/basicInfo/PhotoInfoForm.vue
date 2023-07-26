<!--
 * @Author: HuZhangjie
 * @Date: 2020-07-02 16:06:49
 * @LastEditors: huangjin
 * @LastEditTime: 2023-07-26 18:22:23
 * @Description: 照片信息表单
-->
<template>
  <div class="photo-info">
    <div class="photo-info__tip">请上传清晰、完整、工整的照片</div>
    <van-form class="form-panel">
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
              :after-read="(file) => handleUploadImage(file, item)"
            >
              <upload-slot text="" :upload-bg="educationBg"></upload-slot>
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
              :after-read="(file) => handleUploadFile(file, item)"
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
// 这里上传用的是新的
import { uploadImage } from '@/utils/request'
import { ID_PHOTO_ORGAN_SIZE_MAP } from '@/constant'
import { getSignUpImageUrl } from '@/utils'
import { TEMPLATE_ITEM } from '@/typings/sign-up'
import Title from './components/Title/index.vue'
import UploadSlot from './components/UploadSlot/index.vue'
import IdentityTipDialog from './dialogs/IdentityTipDialog.vue'
import { handleCompressImg } from './upload'

interface Props {
  userInfo?: TEMPLATE_ITEM[]
  couldEdit?: boolean
  organizationId?: number | string
}
const props = withDefaults(defineProps<Props>(), {
  userInfo: () => [],
  couldEdit: true,
  organizationId: ''
})
const { couldEdit, organizationId, userInfo } = toRefs(props)

const photoAndFileTempItemList = computed(() =>
  userInfo.value.filter((i) => ['图片', '文件'].includes(i.desc as string))
)
console.log(' hj ~ file: PhotoInfoForm.vue:551 ~ photoAndFileTempItemList:', photoAndFileTempItemList)
//       BASIS_TEMPLATE_KEY_MAP,
// 展示身份证提示的弹窗
const showIdentityDialog = ref<boolean>(false)
// 控制身份证提示弹窗内部的图片
const isFrontDialog = ref<boolean>(true)
// 记录正反弹窗的展示
// const aleradyShowIdentityForntDialog = ref<boolean>(false)
// const aleradyShowIdentityBackDialog = ref<boolean>(false)

// const identityFrontBg = ref<string>(getSignUpImageUrl('bim_answer_lldcard_back@2x.png'))
// const identityBackBg = ref<string>(getSignUpImageUrl('bim_answer_lidcard_front@2x.png'))
// const oneInchBg = ref<string>(getSignUpImageUrl('bim_answer_lphoto@2x.png'))
const educationBg = ref<string>(getSignUpImageUrl('bim_answer_lDiploma@2x.png'))
// const workProofBg = ref<string>(getSignUpImageUrl('bim_answer_work_proof@2x.png'))

// 点击弹窗展示身份证的提示弹窗
// const handleClickIdentity = (type: any) => {
//   // 未展示过提示弹窗
//   if (type === 'front' && !aleradyShowIdentityForntDialog.value) {
//     showIdentityDialog.value = true
//     aleradyShowIdentityForntDialog.value = true
//     isFrontDialog.value = true
//   } else if (type === 'back' && !aleradyShowIdentityBackDialog.value) {
//     showIdentityDialog.value = true
//     aleradyShowIdentityBackDialog.value = true
//     isFrontDialog.value = false
//   }
// }

// 上传图片-压缩图片
const handleUploadImage = async (file: any, tempItem: any) => {
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
  uploadImage(fileCompress)
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
const handleUploadFile = async (file: any, tempItem: any = {}) => {
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
  uploadImage(file.file)
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
const handleOverSize = () => {
  Toast('文件大小不能超过 - 4M')
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
      padding: 14px 24px 0px 24px;
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
