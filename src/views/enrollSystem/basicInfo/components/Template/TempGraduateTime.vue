<!--
 * @Author: HuZhangjie
 * @Date: 2020-07-11 13:01:04
 * @LastEditors: huangjin
 * @LastEditTime: 2021-07-20 20:43:43
 * @Description: 模板-毕业日期
-->
<template>
  <div class='app-container'>
    <Title
      :tipTitle="templateItem.tips"
      label="毕业日期"
    />
    <van-field
      readonly
      clickable
      class="info-space"
      name="datetimePicker"
      placeholder="请选择毕业日期"
      :rules="[{ required: !templateItem.unnecessary, message: '请选择毕业日期' }]"
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
        @confirm="handleConfrimGraduateTime"
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
      type: [String, Number, Date],
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
    'van-field': Field,
    'van-popup': Popup,
    'van-datetime-picker': DatetimePicker
  },
  data () {
    return {
      showPicker: false,
      currentDate: this.value ? new Date(this.value) : new Date(),
      minDate: new Date(1970, 0, 1)
      // maxDate: new Date()
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
  watch: {
    value (val) {
      if (val) {
        this.currentDate = new Date(this.value)
      }
    }
  },
  created () {},
  mounted () {},
  methods: {
    // 确认选择毕业日期
    handleConfrimGraduateTime (value) {
      console.log('handleConfrimGraduateTime -> value', value)
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
