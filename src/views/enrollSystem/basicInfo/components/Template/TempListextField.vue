<!--
 * @Author: HuZhangjie
 * @Date: 2020-07-11 13:01:04
 * @LastEditors: huangjin
 * @LastEditTime: 2023-06-30 13:38:19
 * @Description: 模板-拓展列表
-->
<template>
  <div class="app-container">
    <Title :tip-title="templateItem.tips" :label="templateItem.aliasLabelName" />
    <tab-module v-model="templateValue" :tab-type="true" :list="list" :could-edit="couldEdit"></tab-module>
  </div>
</template>

<script>
import Title from '../Title/index.vue'
import TabModule from '../TabModule/index.vue'

export default {
  components: {
    Title,
    TabModule
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
    },
    list() {
      if (this.templateItem.options) {
        if (Array.isArray(this.templateItem.options)) return this.templateItem.options
        return this.templateItem.options.split(',')
      }
      return []
    }
  }
}
</script>

<style scoped lang="scss"></style>
