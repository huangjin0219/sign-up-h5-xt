<!--
 * @Author: HuZhangjie
 * @Date: 2020-07-11 13:01:04
 * @LastEditors: huangjin
 * @LastEditTime: 2021-12-27 09:49:57
 * @Description: 模板-input
-->
<template>
  <div class='app-container'>
    <Title
      :tipTitle="templateItem.tips"
      :label="templateItem.aliasLabelName"
    />
    <van-field
      class="info-space"
      v-model="templateValue"
      :placeholder="`请输入${templateItem.aliasLabelName}`"
      :readonly="!couldEdit"
      :disabled="disabled"
      :rules="[{ required: couldEdit, message: `请填写${templateItem.aliasLabelName}` }]"
    />
  </div>
</template>

<script>
import { Field } from 'vant'
import Title from '../Title'

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
    },
    disabled: {
      type: Boolean,
      default: false
    }
  },
  components: {
    Title,
    'van-field': Field
  },
  data () {
    return {
      // basisValidator
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
  mounted () {},
  methods: {

  }
}
</script>

<style scoped lang="scss">

</style>
