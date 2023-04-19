<!--
 * @Author: HuZhangjie
 * @Date: 2020-07-11 13:01:04
 * @LastEditors: huangjin
 * @LastEditTime: 2023-04-19 15:06:49
 * @Description: 模板-报考省市
-->
<template>
  <div class="app-container">
    <Title :title="templateItem.tips" :label="titleLabel" />
    <van-field
      readonly
      clickable
      name="area"
      class="info-space"
      :placeholder="`请选择${titleLabel}`"
      :value="areaName"
      :right-icon="couldEdit ? 'arrow' : ''"
      :rules="[{ required: couldEdit, message: `请选择${titleLabel}` }]"
      @click="handleShowPop"
    />
    <van-popup v-model="showArea" position="bottom">
      <van-area :area-list="areaList" :columns-num="2" @confirm="onConfirmArea" @cancel="showArea = false" />
    </van-popup>
  </div>
</template>

<script>
import { getAreaList } from '@/common/api/signUp/common'
import { Field, Popup, Area } from 'vant'
import Title from '../Title/index.vue'

export default {
  components: {
    Title,
    'van-field': Field,
    'van-popup': Popup,
    'van-area': Area
  },
  props: {
    // 省份id
    provinceId: {
      type: [String, Number],
      default: ''
    },
    areaId: {
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
    // 教育类型(其实是汇总表的数字),为汇总表7时 title 为考试地点
    educationType: {
      type: Number,
      default: 0
    }
  },
  emits: ['input', 'change'],
  data() {
    return {
      loading: true,
      showArea: false,
      // 带id的省数据
      provinceTotalList: [],
      // 带id的市数据
      cityTotalList: [],

      // 组件所需的数据
      areaList: []
    }
  },
  computed: {
    areaName: {
      get() {
        const { provinceId, areaId, provinceTotalList, cityTotalList } = this
        if (!provinceTotalList.length || !cityTotalList.length || !provinceId || !areaId) return ''
        const findProvince = provinceTotalList.find((item) => item.id === provinceId) || {}
        const findCity = cityTotalList.find((item) => item.id === areaId) || {}
        const provinceName = findProvince.name
        const cityName = findCity.name

        // return `${provinceName && cityName ? '' : ''}/${_findCity.name}`
        return provinceName && cityName ? `${provinceName}/${cityName}` : ''
      },
      set(val) {
        this.$emit('input', val)
      }
    },
    titleLabel() {
      if (this.templateItem.aliasLabelName) {
        return this.templateItem.aliasLabelName
      }
      return this.educationType === 7 ? '考试地点' : '报考省市'
    }
  },
  created() {
    this.getList()
  },
  methods: {
    // 查询省和市的数据
    async getList() {
      const provinceList = {}
      const cityList = {}
      const params = {
        layers: [2, 3]
      }
      const res = await getAreaList(params)
      console.log('getList -> getareaList', res)
      res.forEach((item) => {
        if (item.layer === 2) {
          this.provinceTotalList.push(item)
          provinceList[item.code] = item.name
        }
        if (item.layer === 3) {
          this.cityTotalList.push(item)
          cityList[item.code] = item.name
        }
      })
      this.areaList = {
        province_list: provinceList,
        city_list: cityList
      }
      console.log('getList -> this.areaList', this.areaList)
    },
    handleShowPop() {
      if (!this.couldEdit) return
      this.showArea = true
    },
    onConfirmArea(values) {
      const [province, city] = values
      const findProvinceId = this.provinceTotalList.find((item) => +item.code === +province.code)
      const findCity = this.cityTotalList.find((item) => +item.code === +city.code)

      this.$emit('change', { provinceId: findProvinceId.id, areaId: findCity.id })
      this.showArea = false
    }
  }
}
</script>

<style scoped lang="scss"></style>
