<!--
 * @Author: HuZhangjie
 * @Date: 2020-07-02 09:55:22
 * @LastEditors: HuZhangjie
 * @LastEditTime: 2020-07-15 20:45:37
 * @Description: 提交信息通过成功弹窗
-->

<template>
  <BaseDialog :show="showDialog" @close="handleClose">
    <img
      class="success-dialog__img"
      src="@/assets/images/signUp/bim_home_check@2x.png"
    />
    <div class="success-dialog__text">
      提交成功
    </div>
    <div class="success-dialog__no">
      您的报名编号为{{ signNo }}，请等待审核哦！
    </div>
    <div class="success-dialog__btn" @click="handleReSubmit">
      确定
    </div>
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
    // 报名编号
    signNo: {
      type: String,
      default: ''
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
    handleReSubmit () {
      this.$emit('confirm')
    }
  }
}
</script>

<style lang="scss" scoped>
@import "@/styles/var.scss";

.success-dialog {
  &__img {
    width: 98px;
  }
  &__text {
    margin-top: 10px;
    font-size: 16px;
  }
  &__no {
    margin-top: 6px;
    color: #999;
    font-size: 13px;
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
