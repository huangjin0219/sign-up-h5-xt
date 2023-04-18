<!--
 * @Author: HuZhangjie
 * @Date: 2020-07-02 13:08:56
 * @LastEditors: huangjin
 * @LastEditTime: 2023-04-18 17:41:16
 * @Description: 个人承诺书页面
-->
<template>
  <div class="page-promise">
    <!-- <img class="promise-letter__back" src="@/assets/images/signUp/bim_commitment_envelope_bottom@2x.png" /> -->
    <div class="promise-letter__content">
      <div class="promise-header">个人承诺书</div>
      <p class="promise-detail">
        1、本人确认以下填写的个人报名信息准确无误，否则因此导致的考试或证书信息有误，后果由本人承担。
      </p>
      <p class="promise-detail">
        2、本人确认为报名手机号用于考试报名注册，未借于他人注册使用，若因手机号注册产生问题，后果由本人承担
      </p>
      <div class="confrim-btn" @click="handleConfirm">确认</div>
    </div>
    <!-- <div class="promise-letter__btn" @click="handleConfirm">确认</div> -->
    <!-- <div class="promise-letter__front"></div> -->
  </div>
</template>

<script>
export default {
  name: 'EnrollSystemPromise',
  components: {},
  props: {},
  data() {
    return {}
  },
  computed: {},
  methods: {
    handleConfirm() {
      const { query } = this.$route
      this.$router.push({
        name: 'BasicInfo',
        query
      })
    }
  }
}
</script>

<style lang="scss">
@import '@/styles/mixin.scss';

.page-promise {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  display: flex;
  justify-content: center;
  padding: 52px 12px 24px 12px;
  @include bg-url('@/assets/images/signUp/bim_commitment_bg@2x.png');

  .promise-letter {
    &__back {
      width: 351px;
      position: absolute;
      bottom: 12px;
      z-index: 99;
    }
    &__btn {
      position: absolute;
      bottom: 156px; // 142 + 12 + 2
      width: 285px;
      height: 45px;
      line-height: 45px;
      text-align: center;
      color: #fff;
      background: $bimPrimary;
      z-index: 101;
    }
    &__front {
      width: 351px;
      height: 142px;
      position: absolute;
      bottom: 12px;
      z-index: 101;
      @include bg-url('@/assets/images/signUp/bim_commitment_envelope@2x.png');
      background-size: 107%;
      background-position: center;
    }
    &__content {
      padding: 40px 20px;
      position: absolute;
      bottom: 12px;
      width: 325px;
      height: 84%;
      z-index: 100;
      box-sizing: border-box;
      background: #fff;
      .promise-header {
        font-size: 25px;
        font-weight: 500;
        color: 333;
        line-height: 36px;
        text-align: center;
      }
      .promise-detail {
        margin-top: 10px;
        font-size: 15px;
        font-weight: 400;
        color: #666;
        line-height: 24px;
      }
      .confrim-btn {
        position: absolute;
        margin-top: 75px;
        width: 285px;
        height: 45px;
        // z-index: 999;
        line-height: 45px;
        text-align: center;
        color: #fff;
        background: $bimPrimary;
        z-index: 999;
      }
    }
  }
}
</style>
