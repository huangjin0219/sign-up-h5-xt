<!--
 * @Author: HuZhangjie
 * @Date: 2020-07-11 13:01:04
 * @LastEditors: HuZhangjie
 * @LastEditTime: 2020-07-14 17:55:29
 * @Description: 模板-手机号
-->
<template>
  <div class='app-container'>
    <Title
      :tipTitle="tipTitle"
      label="手机号"
    />
    <van-field
      class="info-space"
      v-model="templateValue"
      placeholder="请输入手机号"
      :readonly="!couldEdit"
      :disabled="disabled"
      :rules="[{
        required: couldEdit,
        validator: basisValidator.mobile,
        message: '请输入正确的手机号'
      }]"
    />
  </div>
</template>

<script>
import { Field } from 'vant'
import Title from '../Title'
import { basisValidator } from '../../validate'

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
      basisValidator
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
