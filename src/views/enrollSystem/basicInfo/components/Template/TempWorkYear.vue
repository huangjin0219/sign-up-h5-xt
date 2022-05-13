<!--
 * @Author: HuZhangjie
 * @Date: 2020-07-11 13:01:04
 * @LastEditors: huangjin
 * @LastEditTime: 2021-07-22 14:31:58
 * @Description: 模板-姓名拼音
-->
<template>
  <div class='app-container'>
    <Title
      :tipTitle="templateItem.tips"
      label="工作年限"
    />
    <van-field
      class="info-space years"
      v-model="templateValue"
      placeholder="请输入工作年限"
      type="number"
      label="年"
      :readonly="!couldEdit"
      :rules="[{
        required: !templateItem.unnecessary,
        validator: !templateItem.unnecessary ? basisValidator.workYear : undefined,
        message: '工作年限不可超出50年'
      }]"
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
