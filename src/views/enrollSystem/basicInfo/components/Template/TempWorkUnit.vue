<!--
 * @Author: HuZhangjie
 * @Date: 2020-07-11 13:01:04
 * @LastEditors: HuZhangjie
 * @LastEditTime: 2020-07-25 10:54:10
 * @Description: 模板-工作单位
-->
<template>
  <div class='app-container'>
    <Title
      :tipTitle="tipTitle"
      label="工作单位"
    />
    <van-field
      class="info-space"
      v-model="templateValue"
      placeholder="请输入工作单位"
      maxlength="32"
      :readonly="!couldEdit"
      :rules="[{ required: couldEdit, message: '请填写工作单位' }]"
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
    'van-field': Field
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
