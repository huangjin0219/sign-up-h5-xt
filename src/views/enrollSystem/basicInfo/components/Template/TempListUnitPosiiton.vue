<!--
 * @Author: HuZhangjie
 * @Date: 2020-07-11 13:01:04
 * @LastEditors: HuZhangjie
 * @LastEditTime: 2020-09-17 10:10:07
 * @Description: 模板-职位
-->
<template>
  <div class='app-container'>
    <Title
      :tipTitle="tipTitle"
      label="单位职务"
    />
    <!-- <tab-module
      v-model="templateValue"
      :tab-type="true"
      :list="list"
      :couldEdit="couldEdit"
    ></tab-module> -->
    <van-field
      class="info-space"
      v-model="templateValue"
      placeholder="请输入单位职务"
      maxlength="32"
      :readonly="!couldEdit"
      :rules="[{ required: couldEdit, message: '请填写单位职务' }]"
    />
  </div>
</template>

<script>
import Title from '../Title'
// import TabModule from '../TabModule'
import { Field } from 'vant'

export default {
  props: {
    value: {
      type: [String, Number],
      default: ''
    },
    tipTitle: {
      type: String,
      default: ''
    },
    // 能否编辑
    couldEdit: {
      type: Boolean,
      default: true
    }
  },
  components: {
    Title,
    'van-field': Field
    // TabModule
  },
  data () {
    return {
      // list: [
      //   '设计师',
      //   '工程师',
      //   '造价员',
      //   '施工员',
      //   '工长',
      //   '总工',
      //   '项目经理',
      //   '工程监理',
      //   '工程咨询',
      //   '采购',
      //   '测量员',
      //   '调度员',
      //   '绘图员'
      // ]
    }
  },
  computed: {
    templateValue: {
      get () {
        return this.value
      },
      set (val) {
        this.$emit('input', val)
      }
    }
  }
}
</script>

<style scoped lang="scss">

</style>
