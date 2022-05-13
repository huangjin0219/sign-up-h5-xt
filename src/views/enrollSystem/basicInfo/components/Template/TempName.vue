<!--
 * @Author: HuZhangjie
 * @Date: 2020-07-11 13:01:04
 * @LastEditors: huangjin
 * @LastEditTime: 2021-11-17 16:11:40
 * @Description: 模板-姓名
-->
<template>
  <div class='app-container'>
    <Title
      :tipTitle="tipTitle"
      label="姓名"
    />
    <van-field
      class="info-space"
      v-model="templateValue"
      placeholder="请输入姓名"
      maxlength="16"
      :disabled="disabled"
      :readonly="!couldEdit"
      :rules="[{ required: couldEdit, message: '请填写姓名' }]"
    />
  </div>
</template>

<script>
import { Field } from 'vant'
import Title from '../Title'

export default {
  props: {
    value: {
      type: String,
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
    },
    disabled: {
      type: Boolean,
      default: false
    }
  },
  components: {
    Title,
    'van-field': Field
  },
  data () {
    return {

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
  },
  created () {},
  mounted () {},
  methods: {

  }
}
</script>

<style scoped lang="scss">

</style>
