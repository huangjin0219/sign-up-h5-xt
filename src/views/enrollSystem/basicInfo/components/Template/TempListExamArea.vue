<!--
 * @Author: HuangJin
 * @Date: 2021-06-07 17:53:46
 * @LastEditors: huangjin
 * @LastEditTime: 2023-04-19 15:01:18
 * @Description: 模板-报考地点
-->
<template>
  <div class="app-container">
    <Title :tip-title="tipTitle" label="报考地点" />
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
    tipTitle: {
      type: String,
      default: ''
    },
    // 能否编辑
    couldEdit: {
      type: Boolean,
      default: true
    },
    // 列表的选项数组
    options: {
      type: String,
      default: ''
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
      if (this.options) {
        return this.options.split(',')
      }
      return []
    }
  }
}
</script>

<style scoped lang="scss"></style>
