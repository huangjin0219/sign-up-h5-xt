<!--
 * @Author: HuZhangjie
 * @Date: 2020-07-11 13:01:04
 * @LastEditors: huangjin
 * @LastEditTime: 2023-04-19 14:59:54
 * @Description: 模板-选择专业
-->
<template>
  <div class="app-container">
    <Title :tip-title="templateItem.tips" label="专业" />
    <tab-module v-model="templateValue" :tab-type="true" :list="majorList" :could-edit="couldEdit"></tab-module>
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
      majorList: [
        '土木工程',
        '建筑学',
        '工程管理',
        '结构工程',
        '城乡规划',
        '交通工程',
        '建筑环境与能源应用工程',
        '给排水科学与工程',
        '电气工程及其自动化',
        '建筑电气与智能化',
        '工程造价'
      ]
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
  mounted() {
    if (this.templateItem.options) {
      this.majorList = this.templateItem.options.split(',')
    }
  },
  methods: {}
}
</script>

<style scoped lang="scss"></style>
