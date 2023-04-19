<!--
 * @Author: HuZhangjie
 * @Date: 2020-07-11 13:01:04
 * @LastEditors: huangjin
 * @LastEditTime: 2023-04-19 14:55:14
 * @Description: 模板-姓名拼音
-->
<template>
  <div class="app-container">
    <Title :tip-title="templateItem.tips" label="工作年限" />
    <van-field
      v-model="templateValue"
      class="info-space years"
      placeholder="请输入工作年限"
      type="number"
      label="年"
      :readonly="!couldEdit"
      :rules="[
        {
          required: !templateItem.unnecessary,
          validator: !templateItem.unnecessary ? basisValidator.workYear : undefined,
          message: '工作年限不可超出50年'
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
      type: [String, Number],
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
        this.$emit('input', val)
      }
    }
  },
  methods: {}
}
</script>

<style scoped lang="scss"></style>
