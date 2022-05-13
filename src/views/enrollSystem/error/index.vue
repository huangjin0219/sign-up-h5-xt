<!--
 * @Author: HuZhangjie
 * @Date: 2020-06-30 17:33:53
 * @LastEditors: HuZhangjie
 * @LastEditTime: 2020-07-23 09:51:53
 * @Description: 线上报名系统-错误状态提示页
-->
<template>
  <div class="page-home__bg">
    <div class="page-home">
      <div class="enroll-time">
      </div>
      <div class="enroll-content__bg">
        <div class="enroll-content" :class="isErrorLink ? 'flex-center' : ''">
          <!-- 错误情况下的页面展示 -->
          <div v-if="isNotExist" class="error-page">
            <img src="~@/assets/images/bim_home_failure@2x.png" class="error-page__img">
            <div class="error-page__text">链接不存在，请联系您的报名老师</div>
          </div>
          <div v-if="isInvalidLink" class="error-page">
            <img src="~@/assets/images/bim_home_failure@2x.png" class="error-page__img">
            <div class="error-page__text">链接已作废，请联系您的报名老师</div>
          </div>
          <div v-if="isFineshed" class="error-page">
            <img src="~@/assets/images/bim_home_past_due@2x.png" class="error-page__img">
            <div class="error-page__text">已过报名时间！请参与下期报名哦</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { PRE_ERR_CODE, ERR_CODE_MAP } from '@/constant'

export default {
  name: 'EnrollSystemErrorPage',
  components: {
  },
  props: {},
  data () {
    return {
      errorCode: '',
      enrollInfo: {}
      // isNotExist: false, // 链接不存在
      // isInvalidLink: false, // 为失效链接
      // isFineshed: false, // 过报名时间
    }
  },
  computed: {
    isErrorLink () {
      return this.isNotExist || this.isInvalidLink || this.isFineshed
    },
    // 链接不存在
    isNotExist () {
      return this.errorCode === PRE_ERR_CODE + ERR_CODE_MAP.NOT_EXIST
    },
    // 为失效链接
    isInvalidLink () {
      return this.errorCode === PRE_ERR_CODE + ERR_CODE_MAP.GIVE_UP
    },
    // 过报名时间
    isFineshed () {
      return this.errorCode === PRE_ERR_CODE + ERR_CODE_MAP.TIME_ILLEGAL
    }
  },
  mounted () {
    const { code } = this.$route.query
    this.errorCode = code
  },
  methods: {
  }
}
</script>

<style lang="scss" scoped>
@import "~@/styles/mixin.scss";
@import "~@/styles/var.scss";
$disabledTextColor: #999;
$borderColor: #DCDFE6;

.page-home__bg {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: #1B36AB;
  overflow: auto;
}
.page-home {
  display: flex;
  flex-direction: column;
  align-items: center;
  color: #fff;
  @include bg-url('~@/assets/images/bim_home_bg@2x.png');
  background-size: contain;
  background-repeat: no-repeat;
  .enroll-time {
    margin-top: 142px;
    opacity: .6;
    font-size: 14px;
    font-family: PingFangSC-Regular,PingFang SC;
  }
  .enroll-content__bg {
    width: 329px;
    margin: 28px 0;
    padding: 8px;
    background: #4E6AE4;
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
      .login-panel, .info-panel {
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
            border-left: .5px solid $borderColor;
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
          color: #FF325C;
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
        background: #F8FAFF;
        border-radius: 4px;
        box-sizing: border-box;
        font-size: 12px;
        .saleman-header {
          display: flex;
          justify-content: space-between;
          padding: 0 20px;
          color: $bimPrimary;
          &__left, &__right {
            position: relative;
            width: 1px;
            height: 1px;
            &::before {
              content: '';
              position: absolute;
              top: 4px;
              width: 26px;
              height: .5px;
              background-color: $bimPrimary;
            }
            &::after {
              content: '';
              position: absolute;
              top: 8px;
              width: 18.5px;
              height: .5px;
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
        background: #F4F4F4;
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
