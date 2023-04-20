<!--
 * @Author: HuZhangjie
 * @Date: 2020-07-11 13:01:04
 * @LastEditors: huangjin
 * @LastEditTime: 2023-04-19 15:03:41
 * @Description: 模板-姓名拼音
-->
<template>
  <div class="app-container">
    <Title :tip-title="tipTitle" label="性别" />
    <van-radio-group v-model="templateValue" direction="horizontal" class="info-space" :disabled="!couldEdit">
      <van-radio
        v-for="(item, index) in genderList"
        :key="index"
        :name="item.name"
        icon-size="15px"
        style="margin-right: 41px"
      >
        <template #icon="props">
          <div :class="[{ 'radio-size-color': !props.checked }, 'radio-sex']">
            <img class="img-icon" :src="props.checked ? activeIcon : inactiveIcon" />
            {{ item.label }}
          </div>
        </template>
      </van-radio>
    </van-radio-group>
  </div>
</template>

<script>
import { RadioGroup, Radio } from 'vant'
import Title from '../Title/index.vue'

export default {
  components: {
    Title,
    'van-radio': Radio,
    'van-radio-group': RadioGroup
  },
  props: {
    value: {
      type: [String, Number],
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
  emits: ['update:value'],
  data() {
    return {
      genderList: [
        { name: 1, label: '男' },
        { name: 2, label: '女' },
        { name: 0, label: '未知' }
      ],
      inactiveIcon:
        'https://xuetian.oss-cn-hangzhou.aliyuncs.com/wangxiao/staticfile/png/202007/02/48/48d7ff74a2cd4405877c3fbcc41e6a9a.png',
      activeIcon:
        'https://xuetian.oss-cn-hangzhou.aliyuncs.com/wangxiao/staticfile/png/202007/02/fe/fe8556e8038a4975a0ea71a28d05ec0e.png'
    }
  },
  computed: {
    templateValue: {
      get() {
        console.log('get -> this.value', this.value)
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
