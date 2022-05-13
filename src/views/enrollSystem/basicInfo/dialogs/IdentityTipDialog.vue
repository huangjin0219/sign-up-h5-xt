<!--
 * @Author: HuZhangjie
 * @Date: 2020-07-02 09:55:22
 * @LastEditors: HuZhangjie
 * @LastEditTime: 2020-07-25 10:55:59
 * @Description: 提示上传身份证格式弹窗
-->

<template>
  <BaseDialog :show="showDialog" @close="handleClose">
    <div class="tip-dialog__header">证件上传示例</div>
    <img
      class="tip-dialog__img"
      :src="contentSrc"
    />
    <div class="tip-dialog__btn" @click="handleReSubmit">
      确定
    </div>
  </BaseDialog>
</template>

<script>
import BaseDialog from '@/components/base/Dialog.vue'
import frontSrc from '@/assets/images/pbim_answer_ldcardback@2x.png'
import backSrc from '@/assets/images/pbim_answer_ldcardpositive@2x.png'

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
      // frontSrc: '/images/pbim_answer_ldcardback@2x.png',
      // backSrc: '/images/pbim_answer_ldcardpositive@2x.png'
      frontSrc,
      backSrc
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
    contentSrc () {
      return this.isFront ? this.frontSrc : this.backSrc
    }
  },
  methods: {
    handleClose () {
      this.showDialog = false
    },
    handleReSubmit () {
      this.showDialog = false
    }
  }
}
</script>

<style lang="scss" scoped>
@import "~@/styles/var.scss";

.tip-dialog {
  &__header {
    margin-top: 27px;
    margin-bottom: 30px;
    font-size: 18px;
    color: #333;
    font-weight: 500;
  }
  &__img {
    width: 245px;
  }
  &__text {
    margin-top: 10px;
    font-size: 16px;
  }
  &__btn {
    margin-top: 30px;
    margin-bottom: 30px;
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
