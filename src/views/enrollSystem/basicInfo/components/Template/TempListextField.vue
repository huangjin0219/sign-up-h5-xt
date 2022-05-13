<!--
 * @Author: HuZhangjie
 * @Date: 2020-07-11 13:01:04
 * @LastEditors: huangjin
 * @LastEditTime: 2021-12-27 09:45:12
 * @Description: 模板-拓展列表
-->
<template>
  <div class='app-container'>
    <Title
      :tipTitle="templateItem.tips"
      :label="templateItem.aliasLabelName"
    />
    <tab-module
      v-model="templateValue"
      :tab-type="true"
      :list="list"
      :couldEdit="couldEdit"
    ></tab-module>
  </div>
</template>

<script>
import Title from '../Title'
import TabModule from '../TabModule'

export default {
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
  components: {
    Title,
    TabModule
  },
  data () {
    return {
    }
  },
  computed: {
    templateValue: {
      get () {
        return this.value
      },
      set (val) {
        this.$emit('input', val)
      }
    },
    list () {
      if (this.templateItem.options) {
        return this.templateItem.options.split(',')
      }
      return []
    }
  }
}
</script>

<style scoped lang="scss">

</style>
