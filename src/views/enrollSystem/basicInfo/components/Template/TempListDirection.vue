<!--
 * @Author: HuZhangjie
 * @Date: 2020-07-11 13:01:04
 * @LastEditors: HuZhangjie
 * @LastEditTime: 2020-07-24 09:08:13
 * @Description: 模板-方向
-->
<template>
  <div class="app-container">
    <Title :tip-title="tipTitle" label="方向" />
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
    }
  },
  emits: ['input'],
  data() {
    return {
      list: ['建筑设计BIM应用', '结构工程BIM应用', '设备工程BIM应用', 'BIM建模', '综合BIM应用']
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
  }
}
</script>

<style scoped lang="scss"></style>
