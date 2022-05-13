<!--
 * @Author: HuZhangjie
 * @Date: 2020-07-11 13:01:04
 * @LastEditors: huangjin
 * @LastEditTime: 2021-07-20 20:44:46
 * @Description: 模板-姓名拼音
-->
<template>
  <div class='app-container'>
    <Title
      :tipTitle="templateItem.tips"
      label="邮箱"
    />
    <van-field
      class="info-space"
      v-model="templateValue"
      placeholder="请输入邮箱"
      :readonly="!couldEdit"
      :rules="[{ required: !templateItem.unnecessary, validator: basisValidator.email, message: '请输入正确的邮箱' }]"
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
