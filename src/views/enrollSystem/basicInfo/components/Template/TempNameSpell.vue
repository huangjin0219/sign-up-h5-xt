<!--
 * @Author: HuZhangjie
 * @Date: 2020-07-11 13:01:04
 * @LastEditors: HuZhangjie
 * @LastEditTime: 2020-07-14 17:55:42
 * @Description: 模板-姓名拼音
-->
<template>
  <div class="app-container">
    <Title :tip-title="tipTitle" label="姓名拼写" />
    <van-field
      v-model="templateValue"
      class="info-space"
      placeholder="请输入姓名拼写"
      :readonly="!couldEdit"
      :rules="[{ required: couldEdit, validator: basisValidator.userNameSpell, message: '请输入正确的姓名拼写' }]"
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
