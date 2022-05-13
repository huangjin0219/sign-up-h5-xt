<template>
<div class="container">
  <Title
    :tipTitle="tipTitle"
    :label="title"/>
  <div class="subDiv">
    <vant-field
      readonly
      clickable
      :border="false"
      :value="startTime"
      :rules="[{ required: true},{ validator: verifyStartTime, message: '开始时间不能比结束时间晚' }]"
      placeholder="选择开始时间"
      @click="start_showPicker = true"
    />
    <div class="row"></div>
    <vant-field
      readonly
      clickable
      :border="false"
      :value="endTime"
      :rules="[{ required: true}]"
      placeholder="选择结束时间"
      @click="end_showPicker = true"
    />
  </div>
  <vant-popup v-model="start_showPicker" position="bottom">
    <vant-datetime-picker
      v-model="startDate"
      type="datetime"
      title="选择时间"
      :min-date="start_minDate"
      @cancel="start_showPicker = false"
      @confirm="handleStartDate"
    />
  </vant-popup>
  <vant-popup v-model="end_showPicker" position="bottom">
    <vant-datetime-picker
      v-model="endDate"
      type="datetime"
      title="选择时间"
      :min-date="end_minDate"
      @cancel="end_showPicker = false"
      @confirm="handleEndDate"
    />
  </vant-popup>
</div>
</template>
<script>
import Title from '../../../basicInfo/components/Title'
import { Field, Popup, DatetimePicker } from 'vant'
import dayjs from 'dayjs'
export default {
  props: {
    tipTitle: {
      type: String,
      default: ''
    },
    title: {
      type: String,
      default: '选择考试时间'
    },
    value: {
      type: String,
      default: ''
    }
  },
  components: {
    Title,
    'vant-field': Field,
    'vant-popup': Popup,
    'vant-datetime-picker': DatetimePicker
  },
  data () {
    return {
      startDate: this.value ? new Date(this.value.split(',')[0]) : new Date(),
      start_showPicker: false,
      start_minDate: new Date(2020, 1, 1),

      endDate: this.value ? new Date(this.value.split(',')[1]) : new Date(),
      end_showPicker: false,
      end_minDate: new Date(2020, 1, 1)
    }
  },
  computed: {
    startTime: {
      get () {
        console.log('value', this.value)
        if (!this.value) return ''
        const arr = this.value.split(',')
        return arr[0] || ''
      },
      set (val) {
        this.$emit('input', [val, this.endTime || ''].join(','))
      }
    },
    endTime: {
      get () {
        if (!this.value) return ''
        const arr = this.value.split(',')
        return arr[1] || ''
      },
      set (val) {
        this.$emit('input', [this.startTime || '', val].join(','))
      }
    }
  },
  methods: {
    handleStartDate (val) {
      this.start_showPicker = false
      console.log(val)
      this.startTime = dayjs(val).format('YYYY-MM-DD HH:mm')
    },
    handleEndDate (val) {
      this.end_showPicker = false
      this.endTime = dayjs(val).format('YYYY-MM-DD HH:mm')
    },
    verifyStartTime (val) {
      if (!this.endTime) return true
      const start = dayjs(val).valueOf()
      const end = dayjs(this.endTime).valueOf()
      return start < end
    }
  }
}

</script>
<style lang="scss">
.subDiv {
  display: flex;
  align-items: center;
  padding: 7px;
  .van-cell .van-field__control {
    text-align: center;
  }
  .row {
    margin: auto 10px;
    width: 10px;
    height: 1px;
    background: gray;
  }
}
</style>
