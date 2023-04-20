<!--
 * @Author: HuZhangjie
 * @Date: 2020-07-11 13:01:04
 * @LastEditors: huangjin
 * @LastEditTime: 2023-04-20 10:18:08
 * @Description: 模板-姓名
-->
<template>
  <div class="app-container">
    <Title :tip-title="tipTitle" label="姓名" />
    <van-field
      v-model="templateValue"
      class="info-space"
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
import Title from '../Title/index.vue'

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
    return {}
  },
  computed: {
    templateValue: {
      get() {
        console.log(' hj ~ file: TempName.vue:60 ~ get ~ this.value:', this.value)
        return this.value
      },
      set(val) {
        console.log(' hj ~ file: TempName.vue:62 ~ set ~ val:', val)
        this.$emit('update:value', val)
      }
    }
  },
  methods: {}
}
</script>

<style scoped lang="scss"></style>
