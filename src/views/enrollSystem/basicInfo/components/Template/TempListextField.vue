<!--
 * @Author: HuZhangjie
 * @Date: 2020-07-11 13:01:04
 * @LastEditors: huangjin
 * @LastEditTime: 2023-07-03 15:52:06
 * @Description: 模板-拓展列表
-->
<template>
  <div class="app-container">
    <Title :tip-title="templateItem.tips" :label="templateItem.aliasLabelName" />
    <tab-module
      v-if="!multiple"
      v-model="templateValue"
      :tab-type="true"
      :list="list"
      :could-edit="couldEdit"
    ></tab-module>
    <TabModuleMultiple v-else v-model="templateValue" :list="list" :could-edit="couldEdit"></TabModuleMultiple>
  </div>
</template>

<script>
import Title from '../Title/index.vue'
import TabModule from '../TabModule/index.vue'
import TabModuleMultiple from '../TabModule/multiple.vue'

export default {
  components: {
    Title,
    TabModule,
    TabModuleMultiple
  },
  props: {
    value: {
      type: [String, Number, Array],
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
    multiple: {
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
