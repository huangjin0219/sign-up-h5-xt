<!--
 * @Author: huangjin
 * @Description: 模板-邮箱
-->
<template>
  <div class="app-container">
    <Title :tip-title="templateItem.tips" :label="templateItem.aliasLabelName || '邮箱'" />
    <van-field
      v-model="templateValue"
      class="info-space"
      :placeholder="`请输入${templateItem.aliasLabelName || '邮箱'}`"
      :readonly="!couldEdit"
      :rules="[
        {
          required: !templateItem.unnecessary,
          validator: basisValidator.email,
          message: `请填写${templateItem.aliasLabelName || '正确的邮箱'}`
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
