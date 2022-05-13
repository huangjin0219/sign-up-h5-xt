<!--
 * @Descripttion:
 * @version: 1.0.0
 * @Author: 刘帅楠
 * @Date: 2020-07-01 17:24:27
 * @LastEditors: HuZhangjie
 * @LastEditTime: 2020-07-28 18:45:24
-->
<template>
    <div class="stpebar-title">
        <div class="column"></div>
        <div class="label">{{label}}</div>
        <div v-if="tipTitle" class="tip">({{tipTitle}})</div>
    </div>
</template>
<script>
export default {
  props: {
    label: {
      type: String,
      default: ''
    },
    tipTitle: {
      type: String,
      default: ''
    }
  },
  data () {
    return {
    }
  }
}
</script>
<style lang="scss" scoped>
@import "~@/styles/mixin.scss";
.stpebar-title {
    display: flex;
    align-items: center;
    padding-left: 15px;
    margin-top: 1px;

    .column {
        width: 2px;
        height: 14px;
        background: $bimPrimary;
    }

    .label {
        font-size: 17px;
        font-weight: 500;
        margin: 0 7px;
    }

    .tip {
      flex: 1;
      padding-right: 10px;
      color: #999999;
      font-size: 12px;
      line-height: 20px;
    }
}
</style>
