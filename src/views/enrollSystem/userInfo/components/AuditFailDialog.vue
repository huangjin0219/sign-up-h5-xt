<!--
 * @Author: HuZhangjie
 * @Date: 2020-07-02 09:55:22
 * @LastEditors: HuZhangjie
 * @LastEditTime: 2020-10-17 12:17:57
 * @Description: 审核不通过弹窗
-->

<template>
  <BaseDialog :show="showDialog" @close="handleClose">
    <img
      class="fail-dialog__img"
      src="~@/assets/images/bim_home_failure_color@2x.png"
    />
    <div class="fail-dialog__text">
      审核不通过！
    </div>
    <div class="fail-dialog__btn" @click="handleReSubmit">
      重新提交
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
    handleReSubmit () {
      const { query } = this.$route.query
      console.log('handleReSubmit -> handleReSubmit')
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

.fail-dialog {
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
