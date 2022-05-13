<!--
 * @Author: HuZhangjie
 * @Date: 2020-07-11 13:01:04
 * @LastEditors: huangjin
 * @LastEditTime: 2021-11-16 14:27:45
 * @Description: 模板-选择专业
-->
<template>
  <div class='app-container'>
    <Title
      :tipTitle="templateItem.tips"
      label="专业"
    />
    <tab-module
      v-model="templateValue"
      :tab-type="true"
      :list="majorList"
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
  components: {
    Title,
    TabModule
  },
  data () {
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
      get () {
        return this.value
      },
      set (val) {
        this.$emit('input', val)
      }
    }
  },
  created () {},
  mounted () {
    if (this.templateItem.options) {
      this.majorList = this.templateItem.options.split(',')
    }
  },
  methods: {

  }
}
</script>

<style scoped lang="scss">

</style>
