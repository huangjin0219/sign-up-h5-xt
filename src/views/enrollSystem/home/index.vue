<!--
 * @Author: HuZhangjie
 * @Date: 2020-06-30 17:33:53
 * @LastEditors: huangjin
 * @LastEditTime: 2023-04-18 17:44:23
 * @Description: bim报名系统-首页登录页和信息确认页
-->
<template>
  <div class="page-home__bg">
    <div class="page-home">
      <div class="enroll-time">报名开放时间：{{ enrollInfo.startTime }}-{{ enrollInfo.endTime }}</div>
      <div class="enroll-content__bg">
        <div class="enroll-content">
          <!-- 未登录，显示登录面板 -->
          <div class="login-panel">
            <div class="form-item disabled">{{ enrollInfo.customerMobile }}</div>
            <div class="form-item">
              <input v-model="enrollInfo.captcha" type="input" class="captch-input" placeholder="请输入验证码" />
              <div class="captch-btn" :disabled="captchaDisabled" @click="getCaptcha">{{ captchaText }}</div>
            </div>
            <div class="confirm-btn login-btn" :disabled="loginLoading" @click="handleLogin">登录</div>
          </div>

          <!-- 底部的销售信息列表 -->
          <div class="saleman-panel">
            <div class="saleman-header">
              <div class="saleman-header__left"></div>
              <div>若有疑问，请及时联系</div>
              <div class="saleman-header__right"></div>
            </div>
            <div class="saleman-content">
              <div class="saleman-content__name">招生老师：{{ enrollInfo.saleName }}</div>
              <div class="saleman-content__tel">联系电话：{{ enrollInfo.saleMobile }}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { bizType } from '@/config/index'
// import md5 from 'js-md5'
// import { setStore } from '@/utils/store'
import { sendVerifyCode } from '@/common/api/signUp/user'
import { enrollCheck } from '@/common/api/signUp/enrollSys'
// import { SING_UP_RECORD_ID_STORE_KEY, LOGIN_STATUS_STORE_KEY } from '@/permission'

export default {
  name: 'EnrollSystemHome',
  props: {},
  data() {
    return {
      enrollInfo: {},
      captchaText: '获取验证码',
      captchaDisabled: false, // 获取验证码是否可点击
      loginLoading: false,
      signUpRecordId: ''
    }
  },
  computed: {},
  mounted() {
    const { signUpRecordId } = this.$route.query
    this.signUpRecordId = signUpRecordId
    this.getLink(signUpRecordId)
  },
  methods: {
    async getLink(signUpRecordId) {
      const res = await enrollCheck({ signUpRecordId })
      this.enrollInfo = res
    },
    async getCaptcha() {
      if (this.captchaDisabled) return
      const { customerMobile } = this.enrollInfo
      if (!customerMobile) return this.$toast('请输入手机号码')
      this.enrollInfo.captcha = ''
      const params = {
        mobile: customerMobile,
        bizType
      }
      await sendVerifyCode(params)
      this.captchaDisabled = true
      this.$toast('正在发送验证码')
      // TODO: fetch getCaptcha
      this.handleCountdown()
    },
    // 处理验证码倒计时展示
    handleCountdown() {
      let countdown = 60
      this.captchaText = `${countdown}s后获取`
      this.captchaDisabled = true
      this.timer = setInterval(() => {
        countdown -= 1
        this.captchaText = `${countdown}s后获取`
        if (countdown <= 0) {
          this.captchaText = '发送验证码'
          this.captchaDisabled = false
          clearInterval(this.timer)
        }
      }, 1000)
    },
    async handleLogin() {
      console.log('handleLogin -> ', this.loginLoading)
      if (this.loginLoading) return
      const { customerMobile, captcha } = this.enrollInfo
      if (!captcha) return this.$toast('请输入验证码')
      const params = {
        loginType: 2,
        mobile: customerMobile,
        verificationCode: captcha,
        bizType,
        appType: '1005'
      }
      console.log('handleLogin -> params', params)
      await this.$store.dispatch('user/registerOrLogin', params)

      // 将登录状态存下来
      // setStore(SING_UP_RECORD_ID_STORE_KEY, md5(`${SING_UP_RECORD_ID_STORE_KEY}${this.signUpRecordId}`))
      // setStore(LOGIN_STATUS_STORE_KEY, md5(`${LOGIN_STATUS_STORE_KEY}${this.signUpRecordId}`))

      const { query } = this.$route
      const { redirect, ...otherQuery } = this.$route.query
      if (redirect) {
        this.$router.push({
          path: redirect,
          query: otherQuery
        })
      } else {
        if (query.source) {
          this.$router.push({
            name: 'AddInfo',
            query
          })
          return
        }
        this.$router.push({
          path: '/enrollSystem/userInfo',
          query
        })
      }
      this.loginLoading = true
      // TODO: fetch login 登录成功后清除定时器
      setTimeout(() => {
        this.loginLoading = false
      }, 1000)
    }
  }
}
</script>

<style lang="scss" scoped>
@import '@/styles/mixin.scss';
@import '@/styles/var.scss';
$disabledTextColor: #999;
$borderColor: #dcdfe6;

.page-home__bg {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: #1b36ab;
  overflow: auto;
}
.page-home {
  display: flex;
  flex-direction: column;
  align-items: center;
  color: #fff;
  @include bg-url('@/assets/images/signUp/bim_home_bg@2x.png');
  background-size: contain;
  background-repeat: no-repeat;
  .enroll-time {
    margin-top: 142px;
    opacity: 0.6;
    font-size: 14px;
    font-family: PingFangSC-Regular, PingFang SC;
  }
  .enroll-content__bg {
    width: 329px;
    margin: 28px 0;
    padding: 8px;
    background: #4e6ae4;
    border-radius: 8px;
    color: #333;
    @include box-shadow();

    .enroll-content {
      position: relative;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      align-items: center;
      min-height: 350px;
      padding: 20px 22px;
      border-radius: 8px;
      background: #fff;
      .login-panel,
      .info-panel {
        width: 100%;
        .form-item {
          display: flex;
          justify-content: flex-start;
          align-items: center;
          margin-top: 15px;
          height: 43px;
          padding: 0 19px;
          border-radius: 8px;
          border: 1px solid $borderColor;
          font-size: 15px;

          // background-color: #fff;
          .captch-input {
            width: 60%;
            color: $disabledTextColor;
            &::placeholder {
              color: $disabledTextColor;
            }
          }
          .captch-btn {
            // width: 25%;
            flex: 1;
            height: 24px;
            padding-left: 18px;
            line-height: 24px;
            color: $bimPrimary;
            font-size: 13px;
            border-left: 0.5px solid $borderColor;
            &[disabled] {
              color: $disabledTextColor;
            }
          }

          .form-item-label {
            font-size: 15px;
            color: #333;
          }
        }

        .sureTips {
          width: 100%;
          margin-top: 10px;
          text-align: center;
          font-size: 12px;
          color: #ff325c;
        }
      }

      .saleman-panel {
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        width: 100%;
        height: 70px;
        margin-top: 20px;
        padding: 10px 16px;
        background: #f8faff;
        border-radius: 4px;
        box-sizing: border-box;
        font-size: 12px;
        .saleman-header {
          display: flex;
          justify-content: space-between;
          padding: 0 20px;
          color: $bimPrimary;
          &__left,
          &__right {
            position: relative;
            width: 1px;
            height: 1px;
            &::before {
              content: '';
              position: absolute;
              top: 4px;
              width: 26px;
              height: 0.5px;
              background-color: $bimPrimary;
            }
            &::after {
              content: '';
              position: absolute;
              top: 8px;
              width: 18.5px;
              height: 0.5px;
              background-color: $bimPrimary;
            }
          }
          &__left {
            &::after {
              right: -30px;
            }
          }
          &__right {
            &::before {
              left: -25px;
            }
            &::after {
              left: -32px;
            }
          }
        }
        .saleman-content {
          display: flex;
          justify-content: space-between;
          color: #666;
        }
      }

      .confirm-btn {
        margin-top: 40px;
        height: 45px;
        text-align: center;
        line-height: 45px;
        color: #fff;
        background: $bimPrimary;
        border-radius: 4px;
        font-size: 16px;
      }

      .disabled {
        color: $disabledTextColor;
        background: #f4f4f4;
      }

      .error-page {
        text-align: center;
        font-size: 12px;
        &__img {
          width: 101px;
        }
        &__text {
          color: #333;
          font-size: 8px;
        }
      }
    }
  }

  .flex-center {
    justify-content: center !important;
  }
}
</style>
