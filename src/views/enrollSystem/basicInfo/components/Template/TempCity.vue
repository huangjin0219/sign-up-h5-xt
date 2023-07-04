<!--
 * @Author: huangjin
 * @Description: 模板-省/市
 从 TempArea 修改得来，主要是把 emit('change' 改为 emit('update:value'
 可以直接使用 v-model
 但是可以用 TempAllAreaAsync 代替 这个组件可用可不用
-->
<template>
  <div class="app-container">
    <Title :title="templateItem.tips" :label="titleLabel" />
    <VanField
      readonly
      clickable
      name="area"
      class="info-space"
      :placeholder="`请选择${titleLabel}`"
      :model-value="areaName"
      :right-icon="couldEdit ? 'arrow' : ''"
      :rules="[{ required: couldEdit, message: `请选择${titleLabel}` }]"
      @click="handleShowPop"
    />
    <VanPopup v-model:show="showArea" position="bottom">
      <VanArea :area-list="areaList" :columns-num="2" @confirm="onConfirmArea" @cancel="showArea = false" />
    </VanPopup>
  </div>
</template>

<script lang="ts" setup>
import { getAreaList } from '@/common/api/signUp/common'
import { Field as VanField, Popup as VanPopup, Area as VanArea } from 'vant'
import type { AreaList } from 'vant'
import { TEMPLATE_ITEM } from '@/typings/sign-up'
import Title from '../Title/index.vue'

interface Value {
  provinceId?: number
  areaId?: number
}

interface Props {
  value?: Value
  provinceId?: string | number
  areaId?: string | number
  templateItem?: TEMPLATE_ITEM
  // 能否编辑
  couldEdit?: boolean
  // 教育类型(其实是汇总表的数字),为汇总表7时 title 为考试地点
  educationType?: number
}
const props = withDefaults(defineProps<Props>(), {
  value: () => ({}),
  provinceId: '',
  areaId: '',
  templateItem: () => ({}),
  couldEdit: true,
  educationType: 0
})

const emit = defineEmits(['change', 'update:value'])

const showArea = ref<boolean>(false)
// 带id的省数据
const provinceTotalList = ref<any[]>([])
// 带id的市数据
const cityTotalList = ref<any[]>([])
// 组件所需的数据
const areaList = ref<AreaList>()

const titleLabel = computed(() => {
  if (props.templateItem.aliasLabelName) {
    return props.templateItem.aliasLabelName
  }
  return props.educationType === 7 ? '考试地点' : '报考省市'
})
console.log(' hj ~ file: TempCity.vue:79 ~ titleLabel ~ titleLabel:', titleLabel)

const areaName = computed({
  get() {
    // const { provinceId, areaId, provinceTotalList, cityTotalList } = this
    if (
      !provinceTotalList.value.length ||
      !cityTotalList.value.length ||
      !props.value.provinceId ||
      !props.value.areaId
    )
      return ''
    const findProvince = provinceTotalList.value.find((item) => item.id === props.value.provinceId) || {}
    const findCity = cityTotalList.value.find((item) => item.id === props.value.areaId) || {}
    const provinceName = findProvince.name
    const cityName = findCity.name

    console.log(' hj ~ file: TempCity.vue:105 ~ get ~ props.value:', props.value, provinceName)
    // return `${provinceName && cityName ? '' : ''}/${_findCity.name}`
    return provinceName && cityName ? `${provinceName}/${cityName}` : ''
  },
  set(val) {
    console.log(100, val)
    emit('update:value', val)
  }
})

onMounted(() => {
  getList()
})

// 查询省和市的数据
const getList = async () => {
  const provinceList = {}
  const cityList = {}
  const params = {
    layers: [2, 3]
  }
  const res = await getAreaList(params)
  console.log('getList -> getareaList', res)
  res.forEach((item: any) => {
    if (item.layer === 2) {
      provinceTotalList.value.push(item)
      provinceList[item.code] = item.name
    }
    if (item.layer === 3) {
      cityTotalList.value.push(item)
      cityList[item.code] = item.name
    }
  })
  areaList.value = {
    province_list: provinceList,
    city_list: cityList,
    county_list: {}
  }
  // as AreaProps['areaList']
  console.log('getList -> this.areaList', areaList.value)
}

const handleShowPop = () => {
  if (!props.couldEdit) return
  showArea.value = true
}
const onConfirmArea = (values: any) => {
  console.log(' hj ~ file: TempCity.vue:134 ~ onConfirmArea ~ values:', values)
  const [province, city] = values
  const findProvinceId = provinceTotalList.value.find((item) => +item.code === +province.code)
  const findCity = cityTotalList.value.find((item) => +item.code === +city.code)

  // emit('change', { provinceId: findProvinceId.id, areaId: findCity.id })
  emit('update:value', { provinceId: findProvinceId.id, areaId: findCity.id })
  showArea.value = false
}
</script>

<style scoped lang="scss"></style>
