<!--
 * @Author: HuZhangjie
 * @Date: 2020-07-11 13:01:04
 * @LastEditors: HuZhangjie
 * @LastEditTime: 2020-08-15 22:23:33
 * @Description: 模板-身份证号
-->
<template>
  <div class="app-container">
    <Title :tip-title="tipTitle" label="身份证号" />
    <van-field
      v-model="templateValue"
      class="info-space"
      placeholder="请输入正确的身份证号"
      :readonly="!couldEdit"
      :disabled="disabled"
      :rules="[{ required: couldEdit, validator: basisValidator.cardNo, message: '请输入正确的身份证号' }]"
    />
  </div>
</template>

<script>
import { Field } from 'vant'
import Title from '../Title/index.vue'
import { basisValidator } from '../../validate'

export default {
  components: {
    Title,
    'van-field': Field
  },
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
  emits: ['update:value'],
  data() {
    return {
      basisValidator
    }
  },
  computed: {
    templateValue: {
      get() {
        return this.value
      },
      set(val) {
        this.$emit('update:value', val)
      }
    }
  },
  methods: {}
}
</script>

<style scoped lang="scss"></style>
