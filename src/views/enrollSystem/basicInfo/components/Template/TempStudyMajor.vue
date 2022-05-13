<!--
 * @Author: HuZhangjie
 * @Date: 2020-07-11 13:01:04
 * @LastEditors: huangjin
 * @LastEditTime: 2021-07-20 20:39:36
 * @Description: 模板-所学专业
-->
<template>
  <div class='app-container'>
    <Title
      :tipTitle="templateItem.tips"
      label="所学专业"
    />
    <van-field
      class="info-space"
      v-model="templateValue"
      placeholder="请输入所学专业"
      maxlength="32"
      :readonly="!couldEdit"
      :rules="[{ required: !templateItem.unnecessary, message: '请填写所学专业' }]"
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
