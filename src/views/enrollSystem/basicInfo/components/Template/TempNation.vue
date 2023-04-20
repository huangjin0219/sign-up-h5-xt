<!--
 * @Author: HuZhangjie
 * @Date: 2020-07-11 13:01:04
 * @LastEditors: huangjin
 * @LastEditTime: 2023-04-20 10:20:44
 * @Description: 模板-民族
-->
<template>
  <div class="app-container">
    <Title :tip-title="tipTitle" label="民族" />
    <!-- <van-field
      class="info-space"
      v-model="templateValue"
      placeholder="请输入民族"
      :rules="[{ required: true, message: '请填写民族' }]"
    /> -->
    <van-field
      readonly
      clickable
      class="info-space"
      :model-value="templateValue"
      :rules="[{ required: couldEdit, message: '请选择民族' }]"
      placeholder="请选择民族"
      :right-icon="couldEdit ? 'arrow' : ''"
      @click="handleShowPicker"
    />
    <van-popup v-model:show="showPicker" round position="bottom">
      <van-picker
        title="民族"
        show-toolbar
        :loading="loading"
        value-key="dictdataName"
        :columns="nationList"
        @cancel="showPicker = false"
        @confirm="onConfirm"
      />
    </van-popup>
  </div>
</template>

<script>
import { getNationList } from '@/common/api/signUp/common'
import { Field, Popup, Picker } from 'vant'
import Title from '../Title/index.vue'

export default {
  components: {
    Title,
    'van-field': Field,
    'van-popup': Popup,
    'van-picker': Picker
  },
  props: {
    // 传入民族的 id,key
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
      loading: true,
      showPicker: false,
      nationList: []
    }
  },
  computed: {
    templateValue: {
      get() {
        const currNation = this.nationList.find((item) => +item.dictdataValue === +this.value) || {}
        return currNation.dictdataName
      },
      set(val) {
        console.log(' hj ~ file: TempNation.vue:84 ~ set ~ val:', val)
        this.$emit('update:value', val)
      }
    }
  },
  created() {
    this.getList()
  },
  methods: {
    async getList() {
      const params = {
        dictKey: 'nation',
        pageNum: 1,
        pageSize: 100
      }
      const res = await getNationList(params)
      console.log('getList -> getNationList', res)
      this.loading = false
      this.nationList = res.list
    },
    handleShowPicker() {
      if (this.couldEdit) {
        this.showPicker = true
      }
    },
    onConfirm(value) {
      console.log('onConfirm -> value', value, value.dictdataValue)
      this.templateValue = value.dictdataValue
      this.showPicker = false
    }
  }
}
</script>

<style scoped lang="scss"></style>
