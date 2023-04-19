<!--
 * @Author: HuZhangjie
 * @Date: 2020-07-11 13:01:04
 * @LastEditors: huangjin
 * @LastEditTime: 2023-04-19 15:04:04
 * @Description: 模板-考场名称
-->
<template>
  <div class="app-container">
    <Title :tip-title="tipTitle" label="考场名称" />
    <van-field
      v-model="templateValue"
      class="info-space"
      placeholder="请输入考场名称"
      maxlength="32"
      :readonly="!couldEdit"
      :rules="[{ required: couldEdit, message: '请输入考场名称' }]"
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
    }
  },
  emits: ['input'],
  data() {
    return {}
  },
  computed: {
    templateValue: {
      get() {
        return this.value
      },
      set(val) {
        this.$emit('input', val)
      }
    }
  },
  methods: {}
}
</script>

<style scoped lang="scss"></style>
