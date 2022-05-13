<!--
 * @Author: HuZhangjie
 * @Date: 2020-07-11 13:01:04
 * @LastEditors: HuZhangjie
 * @LastEditTime: 2020-09-04 17:51:10
 * @Description: 模板-考场名称
-->
<template>
  <div class='app-container'>
    <Title
      :tipTitle="tipTitle"
      label="考场名称"
    />
    <van-field
      class="info-space"
      v-model="templateValue"
      placeholder="请输入考场名称"
      maxlength="32"
      :readonly="!couldEdit"
      :rules="[{ required: couldEdit, message: '请输入考场名称' }]"
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
