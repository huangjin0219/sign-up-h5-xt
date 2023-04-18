<!--
 * @Author: jiangruohui
 * @Date: 2022-07-20 13:48:34
 * @LastEditors: jiangruohui
 * @LastEditTime: 2022-09-23 14:52:56
 * @Description: 登录弹窗
-->
<template>
  <Popup v-model:show="show" @close="handleMaskClick">
    <div class="login-popup">
      <div class="login-title">
        <h5>登录学天网校</h5>
        <div v-if="enableClose" class="login-close" @click="close">
          <SvgIcon class="icon-close" name="close" />
        </div>
      </div>
      <Form ref="loginFormRef" @submit="handleSubmit">
        <Field
          v-model="mobile"
          name="mobile"
          maxlength="11"
          placeholder="请输入手机号码"
          :clearable="true"
          :rules="rules.mobile"
        >
          <template #left-icon>
            <SvgIcon class="icon" name="mobile" />
          </template>
        </Field>
        <Field
          v-model="captcha"
          class="captcha-field"
          type="text"
          name="captcha"
          maxlength="10"
          placeholder="请输入验证码"
          :clearable="true"
          :rules="rules.captcha"
        >
          <template #left-icon>
            <SvgIcon class="icon" name="captcha" />
          </template>
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
        <div class="btn-block">
          <VanButton round block type="primary" :disabled="!enableSubmit" class="btn submit-btn" native-type="submit">
            立即登录
          </VanButton>
        </div>
        <div class="login-protocol">
          提示：未注册学天网校账号的手机号，登录时将自动注册，且代表您已同意
          <a href="/registerProtocol.html">《学天教育服务协议》</a>
        </div>
      </Form>
    </div>
  </Popup>
</template>

<script lang="ts" setup>
import { Popup, Form, Field } from 'vant'
import type { FormInstance } from 'vant'
import { useThrottleFn } from '@vueuse/core'
import { useUserStore } from '@/store/index'
import useCaptacha from '@/common/use/useCaptacha'
import { fetchCaptcha } from '@/common/api/user'
import { LoginVerificationType, LoginOperationType } from '@/utils/enum'
import { rules } from '@/utils/rules'

interface Props {
  show: boolean
  enableClose: boolean
}
const props = withDefaults(defineProps<Props>(), {
  show: false,
  enableClose: true
})
const { show, enableClose } = toRefs(props)
const { captchaCountdown, enableGetCaptcha, getCaptcha } = useCaptacha()
const mobile = ref<string>('') // 手机号
const captcha = ref<string>('') // 验证码
const enableSubmit = ref<boolean>(true) // 是否允许提交表单
const loginFormRef = ref<FormInstance>()
const userStore = useUserStore()
const { registerOrLogin } = userStore

const emit = defineEmits(['close', 'loginComplete'])

const close = () => {
  emit('close')
}

const handleMaskClick = () => {
  if (enableClose.value) {
    close()
  }
}

/**
 * 获取验证码
 */
const handleCaptchaClick = useThrottleFn(() => {
  if (!enableGetCaptcha.value) {
    return false
  }
  loginFormRef.value?.validate('mobile').then(() => {
    getCaptcha(fetchCaptcha, { mobile: mobile.value })
  })
}, 1000)

/**
 * 登录
 */
const handleSubmit = () => {
  if (!enableSubmit.value) {
    return false
  }
  const params = {
    mobile: mobile.value,
    verificationCode: captcha.value,
    loginVerificationType: LoginVerificationType.MobileCaptch, // 手机号验证码登录
    loginOperationType: LoginOperationType.LoginOrRegister
  }
  registerOrLogin(params)
    .then(() => {
      enableSubmit.value = true
      emit('loginComplete')
    })
    .finally(() => {
      enableSubmit.value = true
    })
}
</script>
<script lang="ts">
export default {
  name: 'LoginPopup'
}
</script>

<style lang="scss" scoped>
@import '@/styles/var.scss';
@import '@/styles/mixin.scss';

:deep(.van-popup) {
  border-radius: 4px;
}
.login-popup {
  width: 301px;
  height: 361px;
  background: url('https://oss.xuetian.cn/multimedia_knowledge/R1744e4fa6980003_zx_windows_bg@2x.png') no-repeat top
    left;
  background-size: 100% 100%;
  border-radius: 4px;
  z-index: 2302 !important;
}
.login-title {
  padding: 50px 0 0 0;
  text-align: center;
  position: relative;
  h5 {
    font-size: 22px;
    line-height: 29px;
    font-weight: $font-bold;
    color: $font-color;
  }
  .login-close {
    position: absolute;
    top: 15px;
    right: 15px;
    transform: scale(0.92);
    display: flex;
    .icon-close {
      font-size: 12px;
      color: $font-light-gray;
    }
  }
}
:deep(.van-form) {
  padding: 9px 28px 0 28px;
  .van-cell {
    margin-top: 20px;
    padding: 6px 0;
    // height: 36px;
    background: none;
    overflow: visible;
    &.captcha-field {
      margin-top: 24px;
    }
    &::after {
      @include hairline;
      border-radius: 36px;
    }

    .van-field__control {
      font-size: 14px;
    }

    .van-field__left-icon {
      display: flex;
      width: 18px;
      height: 18px;
      margin: 3px 6px 0 12px;
      .icon {
        font-size: 18px;
      }
    }
    .van-field__button {
      padding-right: 6px;
      .captcha-btn.disabled {
        color: $font-light-gray;
      }
    }
    .van-field__error-message {
      position: absolute;
      bottom: -29px;
      z-index: 100;
    }
  }
}

.btn-block {
  margin: 29px 0 0;
  :deep(.van-button--normal) {
    font-size: 14px;
  }
}
.login-protocol {
  margin: 20px 0 0;
  font-size: 10px;
  line-height: 14px;
  color: $font-light-gray;
  a {
    color: $primary;
  }
}
</style>
