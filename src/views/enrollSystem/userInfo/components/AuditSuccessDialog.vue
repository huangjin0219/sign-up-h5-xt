<!--
 * @Author: HuZhangjie
 * @Date: 2020-07-02 09:55:22
 * @LastEditors: HuZhangjie
 * @LastEditTime: 2020-10-17 12:18:10
 * @Description: 审核通过弹窗
-->

<template>
  <BaseDialog :show="showDialog" @close="handleClose">
    <img
      class="success-dialog__img"
      src="~@/assets/images/bim_home_sucess@2x.png"
    />
    <div class="success-dialog__text">
      恭喜！审核已通过
    </div>
    <div class="success-dialog__btn" @click="handleConfirm">
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
      const { query } = this.$route
      this.$router.push({
        name: 'BasicInfo',
        query
      })
    }
  }
}
</script>

<style lang="scss" scoped>
@import "~@/styles/var.scss";

.success-dialog {
  &__img {
    width: 98px;
  }
  &__text {
    margin-top: 10px;
    font-size: 16px;
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
