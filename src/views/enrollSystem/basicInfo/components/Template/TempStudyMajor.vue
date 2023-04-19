<!--
 * @Author: HuZhangjie
 * @Date: 2020-07-11 13:01:04
 * @LastEditors: huangjin
 * @LastEditTime: 2023-04-19 14:56:38
 * @Description: 模板-所学专业
-->
<template>
  <div class="app-container">
    <Title :tip-title="templateItem.tips" label="所学专业" />
    <van-field
      v-model="templateValue"
      class="info-space"
      placeholder="请输入所学专业"
      maxlength="32"
      :readonly="!couldEdit"
      :rules="[{ required: !templateItem.unnecessary, message: '请填写所学专业' }]"
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
    templateItem: {
      type: Object,
      default: () => ({})
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
