<!--
 * @Author: HuZhangjie
 * @Date: 2020-07-11 13:01:04
 * @LastEditors: HuZhangjie
 * @LastEditTime: 2020-10-29 10:25:32
 * @Description: 模板-级别
-->
<template>
  <div class='app-container'>
    <Title
      :tipTitle="tipTitle"
      label="级别"
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
    }
  },
  components: {
    Title,
    TabModule
  },
  data () {
    return {
      list: [
        'BIM建模',
        '专业BIM应用',
        '综合BIM应用'
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
  }
}
</script>

<style scoped lang="scss">

</style>
