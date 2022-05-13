<!--
 * @Author: HuangJin
 * @Date: 2021-06-07 17:53:46
 * @LastEditors: huangjin
 * @LastEditTime: 2022-05-12 14:36:32
 * @Description: 模板-报考地点
-->
<template>
  <div class='app-container'>
    <Title
      :tipTitle="tipTitle"
      label="报考地点"
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
  components: {
    Title,
    TabModule
  },
  data () {
    return {}
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
      if (this.options) {
        return this.options.split(',')
      }
      return []
    }
  }
}
</script>

<style scoped lang="scss">

</style>
