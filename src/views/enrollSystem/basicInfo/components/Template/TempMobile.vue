<!--
 * @Author: HuZhangjie
 * @Date: 2020-07-11 13:01:04
 * @LastEditors: huangjin
 * @LastEditTime: 2023-07-26 16:40:41
 * @Description: 模板-手机号
-->
<template>
  <div class="app-container">
    <Title :tip-title="templateItem.tips" :label="templateItem.aliasLabelName || '手机号'" />
    <van-field
      v-model="templateValue"
      class="info-space"
      :placeholder="`请输入${templateItem.aliasLabelName || '手机号'}`"
      :readonly="!couldEdit"
      :disabled="disabled"
      :rules="[
        {
          required: !templateItem.unnecessary,
          validator: basisValidator.mobile,
          message: '请输入正确的手机号'
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
