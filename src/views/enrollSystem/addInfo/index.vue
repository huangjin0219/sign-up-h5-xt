<template>
  <div class="bg-view">
    <div class="title">补充资料</div>
    <vant-form ref="baseFormRef" class="basis-form" scroll-to-error>
      <div v-if="ticketShow" class="form-item">
        <Title label="准考证照" />
        <div class="info-space">
          <vant-uploader
            v-model="baseForm.ad_ticket_photo"
            max-count="1"
            class="upload-one-inch"
            :after-read="(file) => handleUploadImage(file, 'ad_ticket_photo')"
          >
            <upload-slot :upload-bg="oneInchBg"></upload-slot>
          </vant-uploader>
        </div>
      </div>
      <TempTime v-if="basisShow" v-model:value="baseForm.basisTime" title="基础考试时间" />
      <TempTime v-if="practiceShow" v-model:value="baseForm.practiceTime" title="实务考试时间" />
    </vant-form>
    <div v-if="basisShow || practiceShow || ticketShow" class="bottom">
      <div class="save" @click="handleReWrite">重新填写</div>
      <div class="submit" @click="submitAction">提交</div>
    </div>
  </div>
</template>
<script>
import { Form, Uploader } from 'vant'
import { uploadImage } from '@/utils/request'
import { queryAddInfoTemplateList, submitAddInfo } from '@/common/api/signUp/enrollSys'
import { getSignUpImageUrl } from '@/utils'
import Title from '../basicInfo/components/Title/index.vue'
import UploadSlot from '../basicInfo/components/UploadSlot/index.vue'
import { handleCompressImg } from '../basicInfo/upload'

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
  name: 'AddInfo',
  components: {
    Title,
    UploadSlot,
    'vant-form': Form,
    'vant-uploader': Uploader,
    // template 中的模块
    ...modules
  },
  data() {
    return {
      queryInfo: {}, // 路由信息
      oneInchBg: getSignUpImageUrl('bim_answer_lphoto@2x.png'),
      baseForm: {
        basisTime: '',
        practiceTime: '',
        ad_ticket_photo: [] // 准考证
      },
      basisShow: true,
      practiceShow: true,
      ticketShow: true
    }
  },
  async created() {
    this.queryInfo = this.$route.query
    await this.getTemplateList()
  },
  methods: {
    async handleUploadImage(file, urlType) {
      const type = file.file.name.split('.')[1]
      if (!type || ['png', 'jpg'].every((item) => item !== type.toLocaleLowerCase())) {
        this.baseForm[urlType] = []
        this.$toast('请上传jpg或png格式的图片')
        return false
      }
      const fileCompress = await handleCompressImg(file.file)
      if (fileCompress.size > 2 * 1024 * 1024) {
        this.baseForm[urlType] = []
        this.$toast('准考证照大小超过2M限制')
        return false
      }
      uploadImage(fileCompress)
        .then((res) => {
          this.baseForm[urlType] = [{ url: res }]
        })
        .catch((err) => {
          console.log('handleUploadImage -> error', err)
          this.baseForm[urlType] = []
        })
    },
    // 获取列表数据
    async getTemplateList() {
      const data = await queryAddInfoTemplateList({ signUpRecordId: this.queryInfo.signUpRecordId })
      const dic = data.supplementData
      this.baseForm = {
        basisTime: dic['3'] || '',
        practiceTime: dic['4'] || '',
        ad_ticket_photo: dic['5'] ? [{ url: dic['5'] }] : []
      }
      this.basisShow = dic['3'] != null
      this.practiceShow = dic['4'] != null
      this.ticketShow = dic['5'] != null
      console.log('列表', data)
    },
    handleReWrite() {
      this.baseForm = {
        ...this.baseForm,
        basisTime: '',
        practiceTime: '',
        ad_ticket_photo: [] // 准考证
      }
    },
    async submitAction() {
      if (this.ticketShow && this.baseForm.ad_ticket_photo.length <= 0) {
        this.$toast('准考证必填')
        return
      }
      try {
        await this.$refs.baseFormRef.validate()
        // 拼接参数
        const param = { signUpRecordId: this.queryInfo.signUpRecordId }
        const supplementData = {}
        Object.keys(this.baseForm).forEach((element) => {
          if (element === 'basisTime' && this.baseForm[element]) {
            supplementData['3'] = this.baseForm[element]
          } else if (element === 'practiceTime' && this.baseForm[element]) {
            supplementData['4'] = this.baseForm[element]
          } else if (element === 'ad_ticket_photo' && this.baseForm[element].length > 0) {
            const { url } = this.baseForm[element][0]
            supplementData['5'] = url
          }
        })
        param.supplementData = supplementData
        submitAddInfo(param).then(() => {
          this.$toast.success('提交成功')
        })
      } catch (error) {
        console.log('', error)
      }
    }
  }
}
</script>

<style lang="scss">
@import '@/styles/mixin.scss';
.bg-view {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  padding-bottom: 89px;
  overflow: auto;
  background: #f4f5f9;
}
.title {
  // background: #f1f2f8;
  padding: 10px;
  width: 100%;
  height: 40px;
  text-align: center;
  line-height: 40px;
  font-size: 20px;
  // font-weight: 500;
}
.basis-form {
  padding-top: 10px;
  background: #fff;
  .info-space {
    padding: 14px 24px 27px 24px;

    .van-uploader__wrapper {
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
  }
}

.upload-one-inch {
  width: 85px;
  height: 120px;
  border: 1px solid #ececec;
  // display: flex;
  // align-items: center;
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
  .submit {
    border-radius: 4px;
    font-size: 16px;
    width: 100%;
    height: 49px;
    line-height: 49px;
    text-align: center;
    color: #fff;
    border-radius: 4px;
  }
  .save {
    background: #37ce81;
    margin-right: 15px;
  }
  .submit {
    background: $bimPrimary;
    margin-right: 0;
  }
}
</style>
