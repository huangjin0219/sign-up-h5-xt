<!--
 * @Author: HuZhangjie
 * @Date: 2020-07-11 13:01:04
 * @LastEditors: huangjin
 * @LastEditTime: 2021-11-16 14:49:12
 * @Description: 模板-注册证书编号
-->
<template>
  <div class='app-container'>
    <Title
      :tipTitle="templateItem.tips"
      label="注册证书编号"
    />
    <van-field
      class="info-space years"
      v-model="templateValue"
      placeholder="请输入注册证书编号"
      :readonly="!couldEdit"
      :rules="[{ required: couldEdit, message: '必填项' }]"
    />
  </div>
</template>

<script>
import { Field } from 'vant'
import Title from '../Title'
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
    'van-field': Field
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
