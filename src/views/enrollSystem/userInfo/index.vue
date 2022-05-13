<!--
 * @Descripttion:
 * @version: 1.0.0
 * @Author: 刘帅楠
 * @Date: 2020-07-09 14:31:37
 * @LastEditors: 刘帅楠
 * @LastEditTime: 2021-06-11 18:30:10
-->
<template>
  <div class="page-home__bg">
    <div class="page-home">
      <div class="enroll-time">
        报名开放时间：{{enrollInfo.startTime | date('YY/MM/dd hh:mm')}}-{{enrollInfo.endTime | date('YY/MM/dd hh:mm')}}
      </div>
      <div class="enroll-content__bg">
        <div class="enroll-content">

          <!-- 已经登录，显示客户信息面板 -->
          <div class="info-panel">
            <div class="form-item disabled">
              <span class="form-item-label">姓名：</span>
              <span>{{enrollInfo.customerName}}</span>
            </div>
            <div class="form-item disabled">
              <span class="form-item-label">身份证号：</span>
              <span>{{enrollInfo.cardNo}}</span>
            </div>
            <div class="form-item disabled">
              <span class="form-item-label">报考项目：</span>
              <span>{{enrollInfo.majorName}}</span>
            </div>
            <div class="form-item disabled">
              <span class="form-item-label">报考等级：</span>
              <span>{{enrollInfo.gradeName}}</span>
            </div>
            <div class="form-item disabled">
              <span class="form-item-label">报考单位：</span>
              <span>{{enrollInfo.organizationName}}</span>
            </div>
            <div
              class="confirm-btn login-btn"
              @click="handleNext"
            >{{isDataStatusWaitWrite ? '确认' : '下一页'}}</div>
            <div class="sureTips" v-if="isDataStatusWaitWrite">请确认以上申请资料确认无误哦</div>
          </div>

          <!-- 底部的销售信息列表 -->
          <div class="saleman-panel">
            <div class="saleman-header">
              <div class="saleman-header__left"></div>
              <div>若有疑问，请及时联系</div>
              <div class="saleman-header__right"></div>
            </div>
            <div class="saleman-content">
              <div class="saleman-content__name">
                招生老师：{{enrollInfo.saleName}}
              </div>
              <div class="saleman-content__tel">
                联系电话：{{enrollInfo.saleMobile}}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- 审核成功弹窗 -->
    <AuditSuccessDialog v-if="showAuditSuccess" :show.sync="showAuditSuccess" />
    <AuditFailDialog v-if="showAuditFail" :show.sync="showAuditFail" />
  </div>
</template>

<script>
import AuditFailDialog from './components/AuditFailDialog.vue'
import AuditSuccessDialog from './components/AuditSuccessDialog.vue'
import { acquireConfirmInfo, cmdConfirm, queryCustomerInfo } from '@/api/enrollSys'
import { AUDIT_STATUS_MAP, DATA_WRITE_STATUS_MAP } from '@/constant'

export default {
  name: 'EnrollSystemUserInfo',
  components: {
    AuditFailDialog,
    AuditSuccessDialog
  },
  data () {
    return {
      signUpRecordId: null,
      enrollInfo: {
        startTime: '',
        endTime: '',
        mobile: '',
        salemanName: '',
        salemanMobile: '',
        customerName: '',
        idNo: '',
        level: '',
        directoryName: '',
        unit: ''
      },
      customerInfo: {},
      showAuditSuccess: false, // 审核通过的弹窗
      showAuditFail: false // 审核不通过的弹窗
    }
  },
  computed: {
    // 填写状态为待填写
    isDataStatusWaitWrite () {
      return this.customerInfo.dataStatus === DATA_WRITE_STATUS_MAP.WAIT_WRITE
    }
  },
  mounted () {
    const { signUpRecordId } = this.$route.query
    this.signUpRecordId = signUpRecordId
    this.getInfo(signUpRecordId)
    this.getCustomerInfo()
  },
  methods: {
    // 获取用户表单信息和审核信息
    async getCustomerInfo () {
      const data = await queryCustomerInfo({ signUpRecordId: this.signUpRecordId })
      this.customerInfo = data
      const { dataCheckStatus } = this.customerInfo
      if (dataCheckStatus === AUDIT_STATUS_MAP.AUDIT_SUCCESS) {
        this.showAuditSuccess = true
      }
      if (dataCheckStatus === AUDIT_STATUS_MAP.AUDIT_FAIL) {
        this.showAuditFail = true
      }
    },
    // 为待填写状态-> 承诺书页，其他状态-> 填写资料页
    async handleNext () {
      const { query } = this.$route
      const signUpRecordId = this.signUpRecordId
      if (query.source) {
        this.$router.push({
          name: 'AddInfo',
          query
        })
        return
      }
      if (!this.isDataStatusWaitWrite) {
        this.$router.push({
          name: 'BasicInfo',
          query
        })
        return
      }
      await cmdConfirm({ signUpRecordId })
      this.$router.push({
        path: '/enrollSystem/promise',
        query
      })
    },
    async getInfo (signUpRecordId) {
      const params = {
        signUpRecordId
      }
      const res = await acquireConfirmInfo(params)
      this.enrollInfo = res
    }
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
    padding: 0 20px;
    text-align: center;
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
