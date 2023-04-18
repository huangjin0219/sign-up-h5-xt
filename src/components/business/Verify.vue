<!--
 * @Author: huangjin
 * @Date: 2022-04-11 14:36:37
 * @LastEditors: jiangruohui
 * @LastEditTime: 2023-01-31 14:22:20
 * @Description: 实名认证
-->
<template>
  <!-- 实名认证表单 -->
  <div class="container">
    <!-- 人脸识别 -->
    <template v-if="authUrl">
      <iframe :src="authUrl" frameborder="0"></iframe>
    </template>
    <template v-if="!authUrl">
      <Form ref="formRef" class="vant-form">
        <!-- 标题 -->
        <div v-if="authentication" class="title flex-row">
          <img src="@/assets/images/verify/xt_pay_success.png" />已实名认证
        </div>
        <h3 v-else class="rzfs">认证方式：{{ isMobileAuthentication ? '手机号识别' : '人脸识别' }}</h3>
        <!-- 表单 -->
        <template v-if="!certificationInfo">
          <Field
            v-model="realName"
            name="realName"
            :rules="rules.realName"
            label-align="right"
            label-width="76"
            :border="false"
            type="text"
            label="姓名"
            placeholder="请输入您的真实姓名"
          />
          <Field
            v-model="cardNo"
            name="cardNo"
            :rules="rules.idCard"
            label-align="right"
            label-width="76"
            :border="false"
            type="text"
            label="身份证号"
            placeholder="请输入您的身份证号"
          />
          <Field
            v-if="isMobileAuthentication && !authentication"
            v-model="mobile"
            name="mobile"
            :rules="rules.mobile"
            label-align="right"
            label-width="76"
            :border="false"
            type="text"
            label="实名手机号"
            placeholder="请输入手机号码"
          />
          <Field
            v-if="isMobileAuthentication && !authentication"
            v-model="verifyCode"
            name="verifyCode"
            :rules="rules.captcha"
            label-align="right"
            label-width="76"
            :border="false"
            type="text"
            label="验证码"
            maxlength="6"
            placeholder="请输入验证码"
            :clearable="true"
          >
            <template #button>
              <a
                href="javascript:;"
                :class="{ disabled: !enableGetCaptcha }"
                class="captcha-btn"
                @click="handleCaptchaClick"
              >
                {{ captchaCountdown !== -1 ? '已发送' + captchaCountdown + 's' : '获取验证码' }}
              </a>
            </template>
          </Field>
        </template>
        <template v-else-if="certificationInfo">
          <Cell class="cell" title="姓名" :value="certificationInfo?.realName" />
          <Cell class="cell" title="身份证号" :value="certificationInfo?.idNumber" />
        </template>
        <p class="tips" :class="{ 'already-certification': certificationInfo }">
          本页面收集的用户姓名、身份证号、手机号码仅限确认相关协议的签署对象、协助考试报名、查询学习和考试信息使用。
        </p>
        <div v-if="!authentication" class="confirm-btn-block">
          <div class="confirm-btn" @click="handleSubmit">
            {{ isMobileAuthentication ? '提交申请' : '开始人脸识别' }}
          </div>
          <p v-if="isMobileAuthentication" @click="handleChangeAuthentication">没有实名手机号，切换为人脸认证</p>
          <p v-else @click="handleChangeAuthentication">切换为手机号认证</p>
        </div>
      </Form>
      <!-- 认证失败弹窗 - 手机号不匹配 -->
      <XTDialog
        :show="showMobileErrDialog"
        class="dialog"
        title="认证失败"
        ok-text="点击重填"
        cancel-text="人脸认证"
        @on-ok="showMobileErrDialog = false"
        @on-cancel="handleChangeAuthentication"
      >
        <div class="content">您的手机号和实名信息不匹配，请输入当前实名办理的手机号。</div>
        <div class="tips">注：若没有实名手机号，可尝试人脸认证。</div>
      </XTDialog>
      <!-- <XTDialog
        :show="showMobileErrDialog"
        class="dialog"
        title="认证失败"
        ok-text="点击重填"
        @on-ok="showMobileErrDialog = false"
      >
        <div class="content">您的手机号和实名信息不匹配，请输入当前实名办理的手机号。</div>
      </XTDialog> -->
      <!-- 认证失败弹窗 - 姓名和身份证号不匹配 -->
      <XTDialog
        :show="showErrDialog"
        title="认证失败"
        ok-text="好的"
        @on-ok="showErrDialog = false"
        @on-cancel="showErrDialog = false"
      >
        <div class="content-dialog2">
          <p>{{ errMessage }}</p>
        </div>
      </XTDialog>
      <!-- 认证成功弹窗 -->
      <XTDialog :show="showSuccessDialog" ok-text="下一步" @on-cancel="handleNextStep" @on-ok="handleNextStep">
        <div class="success-dialog">
          <img src="@/assets/images/verify/xt_pay_success.png" />
          <p>实名认证成功</p>
        </div>
      </XTDialog>
    </template>
  </div>
</template>

<script lang="ts" setup>
import { Form, Field, Cell, FormInstance, Toast } from 'vant'
import { storeToRefs } from 'pinia'
import { createTelecom3, createTelecom3Confirm, faceIdentity } from '@/common/api/learning-center/signonline'
import { rules } from '@/utils/rules'
import { useUserStore } from '@/store/index'
import useCaptacha from '@/common/use/useCaptacha'
import { useThrottleFn } from '@vueuse/core'

interface Props {
  enter: 'signonline' | 'certification' // 当前页面：网签 / 实名认证
  authentication?: boolean // 是否已实名认证
  certificationInfo?: any
}

const props = withDefaults(defineProps<Props>(), {
  enter: 'certification',
  authentication: false,
  certificationInfo: null
})
const { authentication } = toRefs(props)
const state = reactive({
  isMobileAuthentication: true, // 是否是手机号认证
  realName: '', // 姓名
  cardNo: '', // 身份证号
  mobile: '', // 手机号
  verifyCode: '', // 验证码
  flowId: '', // 流程id, 调获取验证码接口返回
  authUrl: '', // 实名认证链接
  showSuccessDialog: false, // 是否展示认证成功弹窗
  showErrDialog: false, // 是否展示认证失败弹窗
  showMobileErrDialog: false, // 是否展示认证失败弹窗 - 手机号不匹配
  errMessage: '' // 认证错误提示信息
})
const {
  isMobileAuthentication,
  realName,
  cardNo,
  mobile,
  verifyCode,
  flowId,
  showSuccessDialog,
  showErrDialog,
  showMobileErrDialog,
  authUrl,
  errMessage
} = toRefs(state)

const emit = defineEmits(['next'])
const formRef = ref<FormInstance>()
const route = useRoute()
const userStore = useUserStore()
const { user } = storeToRefs(userStore)
const { captchaCountdown, enableGetCaptcha, getCaptcha } = useCaptacha()

watch(authentication, (value) => {
  if (value && route.query.cb) {
    showSuccessDialog.value = true
  }
})

onMounted(() => {
  if (authentication.value && route.query.cb) {
    showSuccessDialog.value = true
  }
})
/**
 * 获取验证码
 */
const handleCaptchaClick = useThrottleFn(() => {
  if (!enableGetCaptcha.value) {
    return false
  }
  formRef.value?.validate(['realName', 'cardNo', 'mobile']).then(() => {
    getCaptcha(
      createTelecom3,
      {
        idNo: cardNo.value,
        mobileNo: mobile.value,
        name: realName.value
      },
      { hideErrMsg: true },
      60,
      (res: any) => {
        flowId.value = res.data?.flowId
      },
      (err: any) => {
        const { message = '' } = err
        dealAuthenticationErr(message)
      }
    )
  })
}, 1000)

/**
 * 提交表单
 */
const handleSubmit = () => {
  if (isMobileAuthentication.value) {
    formRef.value?.validate().then(() => {
      if (!flowId.value) {
        Toast('请获取验证码')
        return false
      }
      telecom3Confirm()
    })
  } else {
    formRef.value?.validate(['realName', 'cardNo']).then(() => {
      telecom2Confirm()
    })
  }
}
/**
 * 三要素认证
 */
const telecom3Confirm = () => {
  createTelecom3Confirm({
    authCode: verifyCode.value,
    flowId: flowId.value
  }).then((res: any) => {
    if (props.enter === 'signonline') {
      // 网签页面显示弹窗
      showSuccessDialog.value = true
    } else {
      // 实名认证
      Toast.success('实名认证成功')
      nextTick(() => emit('next', 2))
    }
  })
}

/**
 * 二要素认证
 */
const telecom2Confirm = () => {
  faceIdentity({
    idNo: cardNo.value,
    name: realName.value,
    mobile: user.value?.mobile as string,
    callbackUrl: `${window.location.href}${props.enter === 'signonline' ? '&cb=true' : ''}`
  }).then((res: any) => {
    authUrl.value = res.data?.authUrl
  })
}

/**
 * 下一步
 */
const handleNextStep = () => {
  showSuccessDialog.value = false
  nextTick(() => emit('next', 2))
}

/**
 * 切换认证方式
 */
const handleChangeAuthentication = () => {
  showMobileErrDialog.value = false
  isMobileAuthentication.value = !isMobileAuthentication.value
}

const dealAuthenticationErr = (message: string) => {
  const str = '详情：【'
  const startIndex = message.indexOf(str)
  let err = message
  if (startIndex !== -1) {
    const endIndex = message.indexOf('】', startIndex)
    err = message.substring(startIndex + str.length, endIndex || message.length)
  }
  if (err === '手机号与身份证号不⼀致') {
    showMobileErrDialog.value = true
  } else {
    errMessage.value = err === '姓名与⾝份证号不⼀致' ? '您填写的姓名和身份证号不匹配，请重新填写' : err
    showErrDialog.value = true
  }
}
</script>
<script lang="ts">
export default {
  name: 'VerifyVue'
}
</script>

<style lang="scss" scoped>
@import '@/styles/var.scss';

.container {
  flex: 1;
  height: 100%;
  overflow-y: auto;
  background-color: #fff;
  iframe {
    width: 100%;
    height: 100%;
  }
  .title {
    align-items: center;
    justify-content: center;
    height: 56px;
    font-size: 16px;
    font-weight: $font-bold;
    color: #333333;
    line-height: 22px;
    img {
      margin-right: 8px;
      width: 20px;
      height: 20px;
    }
  }
}
// 表单
.vant-form {
  position: relative;
  padding-top: 15px;
  // 认证方式
  .rzfs {
    padding: 0 15px;
    margin-bottom: 7px;
    height: 22px;
    color: #333333;
    line-height: 22px;
    font-size: 16px;
    font-weight: 600;
  }
  .tips {
    margin-top: 8px;
    padding: 0 15px;
    font-size: 12px;
    line-height: 16px;
    color: #666;
    &.already-certification {
      margin-top: 40px;
    }
  }
  .confirm-btn-block {
    // position: absolute;
    // bottom: 24px;
    // left: 0;
    // right: 0;
    margin-top: 92px;
    padding: 7px 15px;
    padding-bottom: calc(constant(safe-area-inset-bottom) + 7px);
    padding-bottom: calc(env(safe-area-inset-bottom) + 7px);
    .confirm-btn {
      width: 345px;
      height: 44px;
      font-size: 16px;
      color: #fff;
      line-height: 44px;
      text-align: center;
      background: $primary;
      border-radius: 22px;
    }

    .confirm-btn.disable {
      background: #ccc;
    }
    p {
      margin-top: 15px;
      height: 20px;
      line-height: 20px;
      text-align: center;
      font-size: 14px;
      color: $primary;
    }
  }
  :deep(.van-cell) {
    margin-top: 15px;
    padding: 0 15px 0 0 !important;
    .captcha-btn {
      color: $primary;
      &.disabled {
        color: $font-light-gray;
      }
    }
  }
  :deep(.van-cell__title) {
    width: 56px;
    line-height: 40px;
  }
  :deep(.van-field__body) {
    height: 40px;
    padding: 0 15px;
    border: 1px solid $border-color;
  }
  .cell {
    padding: 0 15px !important;
    :deep(.van-cell__title) {
      display: flex;
      align-items: center;
    }
  }
}

// 弹窗
.dialog {
  .content {
    color: #333333;
    font-weight: 400;
    margin: 30px auto 15px;
    width: 196px;
    height: 44px;
    font-size: 14px;
    line-height: 22px;
  }
  .tips {
    width: 228px;
    height: 16px;
    font-size: 12px;
    line-height: 16px;
    margin: 0 auto;
    color: $red;
  }
}
.content-dialog2 {
  width: 210px;
  height: 44px;
  margin: 40px auto 0;
  color: #333333;
  font-weight: 400;
  font-size: 14px;
  text-align: center;
  line-height: 22px;
}
.success-dialog {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 240px;
  margin: 20px auto;
  img {
    width: 61px;
    height: 60px;
  }
  p {
    margin-top: 16px;
    font-size: 18px;
    line-height: 20px;
    color: #333333;
    font-weight: 400;
  }
}
</style>
