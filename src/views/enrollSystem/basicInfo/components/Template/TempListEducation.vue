<!--
 * @Author: HuZhangjie
 * @Date: 2020-07-11 13:01:04
 * @LastEditors: huangjin
 * @LastEditTime: 2023-04-19 15:01:42
 * @Description: 模板-学历
-->
<template>
  <div class="app-container">
    <Title :tip-title="templateItem.tips" label="学历" />
    <tab-module v-model="templateValue" :tab-type="true" :list="list" :could-edit="couldEdit"></tab-module>
  </div>
</template>

<script>
import Title from '../Title/index.vue'
import TabModule from '../TabModule/index.vue'

const EDUCATION_LIST = [
  { key: '无', values: [2, 18, 19] },
  { key: '初中', values: [6, 18, 19] },
  { key: '高中', values: [3, 6, 18, 19] },
  { key: '中专', values: [2, 3, 6, 7, 11, 12, 13, 14, 15, 18, 19] },
  { key: '大专', values: [1, 6, 18, 19] },
  { key: '专科', values: [2, 3, 7, 11, 12, 13, 14, 15, 18, 19] },
  { key: '在校生', values: [6, 18, 19] },
  { key: '本科', values: [1, 2, 3, 6, 7, 11, 12, 13, 14, 15, 18, 19] },
  { key: '研究生', values: [1, 2, 3, 7, 18, 19] },
  { key: '硕士', values: [6, 11, 12, 13, 14, 15, 18, 19] },
  { key: '博士', values: [6, 18, 19] }
]

export default {
  components: {
    Title,
    TabModule
  },
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
    },
    // 教育类型(其实是汇总表的数字),跟根据该值过滤list
    educationType: {
      type: Number,
      default: 0
    }
  },
  emits: ['input'],
  data() {
    return {
      // list: [
      //   '初中',
      //   '高中',
      //   '中专',
      //   '在校生',
      //   '大专',
      //   '本科',
      //   '硕士',
      //   '博士'
      // ]
    }
  },
  computed: {
    templateValue: {
      get() {
        return this.value
      },
      set(val) {
        this.$emit('input', val)
      }
    },
    list() {
      if (this.templateItem.options) {
        return this.templateItem.options.split(',')
      }
      return EDUCATION_LIST.filter((item) => item.values.includes(this.educationType)).map((item) => item.key)
    }
  }
}
</script>

<style scoped lang="scss"></style>
