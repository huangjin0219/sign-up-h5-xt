<!--
 * @Author: huangjin
 * @Date: 2021-07-20 20:49:19
 * @LastEditors: huangjin
 * @LastEditTime: 2021-07-21 13:42:29
 * @Description: 模板-通讯地址
-->
<template>
  <div class='app-container'>
    <Title
      :tipTitle="templateItem.tips"
      label="通讯地址"
    />
    <van-field
      class="info-space"
      v-model="templateValue"
      placeholder="请输入通讯地址"
      :readonly="!couldEdit"
      :rules="[{required: !templateItem.unnecessary,message: '请输入正确的通讯地址'}]"
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
    return {}
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
