<!--
 * @Author: HuZhangjie
 * @Date: 2020-07-02 09:55:22
 * @LastEditors: huangjin
 * @LastEditTime: 2022-12-02 11:44:52
 * @Description: 填写信息与下单信息不一致时的提示弹窗
-->

<template>
  <BaseDialog :show="showDialog" @close="handleClose">
    <div class="tip-dialog">
      <div class="tip-dialog__header">请输入验证码</div>
      <div class="tip-dialog__text">验证码已经发送至你的手机</div>
      <div class="tip-dialog__text">{{ mobile }}</div>
      <div class="tip-dialog__captcha">
        <div>6位数字验证码</div>
        <div class="captch-btn" :disabled="captchaDisabled" @click="getCaptcha">
          {{ captchaText }}
        </div>
      </div>
      <template v-if="ish5">
        <!-- 验证码输入框 -->
        <van-password-input
          :value="captcha"
          :mask="false"
          :gutter="7"
          :focused="showKeyboard"
          @focus="showKeyboard = true"
        />
      </template>
      <template v-else>
        <!-- 验证码输入框 -->
        <van-field clickable v-model="captcha" />
        <!-- @touchstart.native.stop="showKeyboard = true" -->
      </template>
      <div class="btn-wrapper">
        <div class="tip-dialog__btn" @click="handleConfirm">确定</div>
      </div>
    </div>

    <!-- 数字键盘 -->
    <van-number-keyboard
      :show="showKeyboard"
      @input="handleInput"
      @delete="handleDelete"
      @blur="showKeyboard = false"
    />
  </BaseDialog>
</template>

<script>
import BaseDialog from '@/components/base/Dialog.vue'
import { PasswordInput, NumberKeyboard, Field } from 'vant'
import { sendVerifyDxdkCode } from '@/common/api/signUp/user'

const isH5 = () => {
  // // 判断是不是微信端打开的
  // if (/(micromessenger)/i.test(userAgent)) {
  //   console.log('微信')
  // }
  const { userAgent } = navigator
  console.log('普通浏览器')
  // 判断h5还是pc true就是h5
  if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(userAgent)) {
    console.log('h5')
    return true
  } else {
    console.log('pc')
  }
  return false
}
export default {
  components: {
    BaseDialog,
    'van-password-input': PasswordInput,
    'van-number-keyboard': NumberKeyboard,
    'van-field': Field
  },
  props: {
    show: {
      type: Boolean,
      default: false
    },
    mobile: {
      type: String,
      default: ''
    }
  },
  data () {
    return {
      captchaDisabled: false, // 获取验证码是否可点击
      captchaText: '获取验证码',
      // 输入的验证码
      captcha: '',
      showKeyboard: false
    }
  },
  computed: {
    showDialog: {
      get () {
        return this.show
      },
      set (val) {
        this.$emit('update:show', val)
      }
    },
    ish5 () {
      return isH5()
    }
  },
  created () {
    this.getCaptcha()
  },
  methods: {
    // 获取验证码
    async getCaptcha () {
      if (this.captchaDisabled) return
      if (!this.mobile) return this.$toast('手机号有误')
      this.captchaDisabled = true
      const params = {
        mobile: this.mobile,
        smsType: 'SMS_195261720'
      }
      await sendVerifyDxdkCode(params)
      this.$toast('正在发送验证码')
      // TODO: fetch getCaptcha
      this.handleCountdown()
    },
    // 处理验证码倒计时展示
    handleCountdown () {
      let countdown = 60
      this.captchaText = `${countdown}s`
      this.captchaDisabled = true
      this.timer = setInterval(() => {
        countdown--
        this.captchaText = `${countdown}s`
        if (countdown <= 0) {
          this.captchaText = '重新发送'
          this.captchaDisabled = false
          clearInterval(this.timer)
        }
      }, 1000)
    },
    handleInput (key) {
      this.captcha = (this.captcha + key).slice(0, 6)
      if (this.captcha.length === 6) {
        this.handleConfirm()
      }
    },
    handleDelete () {
      this.captcha = this.captcha.slice(0, this.captcha.length - 1)
    },
    handleClose () {
      this.showDialog = false
    },
    async handleConfirm () {
      if (!this.captcha) return this.$toast('请输入验证码~')

      clearInterval(this.timer)
      // TODO: 调用接口修改手机号
      this.showDialog = false
      this.$emit('confirm', this.captcha)
    }
  }
}
</script>

<style lang="scss" scoped>
@import "@/styles/var.scss";

.tip-dialog {
  display: flex;
  flex-direction: column;
  // align-items: center;
  justify-content: space-between;
  width: 100%;
  padding: 15px;
  box-sizing: border-box;

  // 验证码输入框的样式
  /deep/ .van-password-input {
    margin: 0;
    margin-top: 7px;
    li {
      width: 39px;
      height: 42px;
      border: 1px solid $bimPrimary;
    }
  }

  &__header {
    margin-top: 10px;
    margin-bottom: 20px;
    font-size: 18px;
    color: #333;
    font-weight: 500;
  }
  &__text {
    margin-top: 10px;
    font-size: 14px;
    color: #999;
  }
  &__captcha {
    display: flex;
    justify-content: space-between;
    margin-top: 28px;
    font-size: 12px;
    color: #999;
    .captch-btn {
      color: $bimPrimary;
    }
  }
  .btn-wrapper {
    width: 100%;
    text-align: center;
  }
  &__btn {
    display: inline-block;
    margin-top: 20px;
    width: 121px;
    height: 34px;
    color: #fff;
    line-height: 34px;
    text-align: center;
    border-radius: 4px;
    background: $bimPrimary;
  }
}
</style>
