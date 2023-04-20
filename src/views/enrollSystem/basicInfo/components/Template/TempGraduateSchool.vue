<!--
 * @Author: HuZhangjie
 * @Date: 2020-07-11 13:01:04
 * @LastEditors: huangjin
 * @LastEditTime: 2021-07-20 18:41:25
 * @Description: 模板-毕业院校
-->
<template>
  <div class="app-container">
    <Title :tip-title="templateItem.tips" label="毕业院校" />
    <van-field
      v-model="templateValue"
      class="info-space"
      placeholder="请输入毕业院校"
      maxlength="32"
      :readonly="!couldEdit"
      :rules="[{ required: !templateItem.unnecessary, message: '请填写毕业院校' }]"
    />
  </div>
</template>

<script>
import { Field } from 'vant'
import Title from '../Title/index.vue'

export default {
  components: {
    Title,
    'van-field': Field
  },
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
  emits: ['update:value'],
  data() {
    return {}
  },
  computed: {
    templateValue: {
      get() {
        return this.value
      },
      set(val) {
        this.$emit('update:value', val)
      }
    }
  },
  methods: {}
}
</script>

<style scoped lang="scss"></style>
