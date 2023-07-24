<!--
 * @Author: huangjin
 * @Date: 2021-07-20 20:49:19
 * @LastEditors: huangjin
 * @LastEditTime: 2023-07-24 15:13:18
 * @Description: 模板-通讯地址
-->
<template>
  <div class="app-container">
    <Title :tip-title="templateItem.tips" :label="templateItem.aliasLabelName || '通讯地址'" />
    <van-field
      v-model="templateValue"
      class="info-space"
      :placeholder="`请输入${templateItem.aliasLabelName || '通讯地址'}`"
      :readonly="!couldEdit"
      :rules="[
        {
          required: !templateItem.unnecessary,
          message: `请填写${templateItem.aliasLabelName || '正确的通讯地址'}`
        }
      ]"
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
  emits: ['update:value'],
  data() {
    return {}
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
