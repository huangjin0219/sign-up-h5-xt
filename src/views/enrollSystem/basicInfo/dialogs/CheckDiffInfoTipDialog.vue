<!--
 * @Author: HuZhangjie
 * @Date: 2020-07-02 09:55:22
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2020-07-03 11:35:13
 * @Description: 填写信息与下单信息不一致时的提示弹窗
-->

<template>
  <BaseDialog :show="showDialog" @close="handleClose">
    <p class="tip-dialog__text">检测到您的姓名/身份证号与</p>
    <p class="tip-dialog__text">购买订单提交数据不一致，是否确认</p>
    <p class="tip-dialog__text">更改姓名与身份证号？</p>
    <div class="tip-dialog__btn" @click="handleConfirm">确认</div>
  </BaseDialog>
</template>

<script>
import BaseDialog from '@/components/base/Dialog.vue'

export default {
  components: {
    BaseDialog
  },
  props: {
    show: {
      type: Boolean,
      default: false
    },
    isFront: {
      type: Boolean,
      default: true
    }
  },
  data () {
    return {
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
    }
  },
  methods: {
    handleClose () {
      this.showDialog = false
    },
    handleConfirm () {
      this.$emit('confirm')
      this.showDialog = false
    }
  }
}
</script>

<style lang="scss" scoped>
@import "@/styles/var.scss";

.tip-dialog {
  &__header {
    margin-top: 27px;
    margin-bottom: 30px;
    font-size: 18px;
    color: #333;
    font-weight: 500;
  }
  &__text {
    margin-top: 10px;
    padding: 0 15px;
    text-align: center;
    font-size: 15px;
  }
  &__btn {
    margin-top: 30px;
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
