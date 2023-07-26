<!--
 * @Author: HuZhangjie
 * @Date: 2020-07-11 13:01:04
 * @LastEditors: huangjin
 * @LastEditTime: 2023-07-26 15:32:58
 * @Description: 模板-身份证号
-->
<template>
  <div class="app-container">
    <Title :tip-title="templateItem.tips" :label="templateItem.aliasLabelName || '身份证号'" />
    <van-field
      v-model="templateValue"
      class="info-space"
      :placeholder="`请输入${templateItem.aliasLabelName || '身份证号'}`"
      :readonly="!couldEdit"
      :disabled="disabled"
      :rules="[
        {
          required: !templateItem.unnecessary,
          validator: basisValidator.cardNo,
          message: `请填写${templateItem.aliasLabelName || '正确的身份证号'}`
        }
      ]"
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
    templateItem: {
      type: Object,
      default: () => ({})
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
