<!--
 * @Author: HuZhangjie
 * @Date: 2020-07-11 13:01:04
 * @LastEditors: HuZhangjie
 * @LastEditTime: 2020-08-14 09:40:46
 * @Description: 模板-出生日期
-->
<template>
  <div class='app-container'>
    <Title
      :tipTitle="tipTitle"
      label="出生日期"
    />
    <van-field
      readonly
      clickable
      class="info-space"
      name="datetimePicker"
      placeholder="请选择出生日期"
      :rules="[{ required: couldEdit, message: '请选择出生日期' }]"
      :value="templateValue"
      :right-icon="couldEdit ? 'arrow' : ''"
      @click="handleShowPop"
    />
    <van-popup v-model="showPicker" position="bottom">
      <van-datetime-picker
        v-model="currentDate"
        type="date"
        title="选择年月日"
        :min-date="minDate"
        :max-date="maxDate"
        @confirm="handleConfirmBornDate"
        @cancel="showPicker = false"
      />
    </van-popup>
  </div>
</template>

<script>
import { Field, Popup, DatetimePicker } from 'vant'
import Title from '../Title'
import dayjs from 'dayjs'

export default {
  props: {
    value: {
      type: [String, Date, Number],
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
    'van-field': Field,
    'van-popup': Popup,
    'van-datetime-picker': DatetimePicker
  },
  data () {
    return {
      showPicker: false,
      currentDate: this.value ? new Date(this.value) : new Date(),
      minDate: new Date(1940, 0, 1),
      maxDate: new Date()
    }
  },
  computed: {
    templateValue: {
      get () {
        if (!this.value) return ''
        return dayjs(this.value).format('YYYY-MM-DD')
      },
      set (val) {
        this.$emit('input', dayjs(val).valueOf())
      }
    }
  },
  methods: {
    // 确认选择出生日期
    handleConfirmBornDate (value) {
      console.log('handleConfirmBornDate -> value', value)
      this.templateValue = value
      this.showPicker = false
    },
    handleShowPop () {
      if (!this.couldEdit) return
      this.showPicker = true
    }
  }
}
</script>

<style scoped lang="scss">

</style>
