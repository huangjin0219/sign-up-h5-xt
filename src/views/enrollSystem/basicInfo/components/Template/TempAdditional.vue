<!--
 * @Author: HuZhangjie
 * @Date: 2020-07-11 13:01:04
 * @LastEditors: huangjin
 * @LastEditTime: 2021-11-16 17:05:36
 * @Description: 模板-主项/增项
-->
<template>
  <div class='app-container'>
    <Title
      :tipTitle="templateItem.tips"
      label="主项/增项"
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
import { basisValidator } from '../../validate'

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
      basisValidator
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
  },
  created () {},
  mounted () {},
  methods: {

  }
}
</script>

<style scoped lang="scss">

</style>
