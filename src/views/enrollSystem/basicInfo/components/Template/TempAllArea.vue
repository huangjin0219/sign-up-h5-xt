<!--
 * @Author: huangjin
 * @Description: 模板-省/市/区
 使用的是 uic 的 getAllArea 获取所有数据
 但是实际使用中返回的数据只有省市两级，没有区，不符合省市区的需求
 此组件先留着 接口返回的数据有区级时可用
-->
<template>
  <div class="app-container">
    <Title :title="templateItem.tips" :label="templateItem.aliasLabelName" />
    <VanField
      readonly
      clickable
      name="area"
      class="info-space"
      :placeholder="`请选择${templateItem.aliasLabelName}`"
      :model-value="areaName"
      :right-icon="couldEdit ? 'arrow' : ''"
      :rules="[{ required: couldEdit, message: `请选择${templateItem.aliasLabelName}` }]"
      @click="handleShowPop"
    />
    <VanPopup v-model:show="showArea" position="bottom">
      <van-cascader
        title="请选择所在地区"
        :options="areaList"
        :field-names="{
          text: 'name',
          value: 'areaId',
          children: 'childList'
        }"
        @close="showArea = false"
        @finish="onConfirmArea"
      />
    </VanPopup>
  </div>
</template>

<script lang="ts" setup>
import { getAllArea } from '@/common/api/signUp/user'
import { Field as VanField, Popup as VanPopup, Cascader as VanCascader } from 'vant'
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
// 组件所需的数据
const areaList = ref<any[]>([])

onMounted(() => {
  getList()
})

const areaName = computed({
  get() {
    if (!areaList.value.length || !props.value.provinceId || !props.value.areaId) return ''
    const findProvince = areaList.value.find((item) => item.areaId === props.value.provinceId) || {}
    const findCity = findProvince.childList.find((item: any) => item.areaId === props.value.areaId) || {}
    const provinceName = findProvince.name
    const cityName = findCity.name

    console.log(' hj ~ file: TempCity.vue:105 ~ get ~ props.value:', props.value, provinceName)
    // return `${provinceName && cityName ? '' : ''}/${_findCity.name}`
    return provinceName && cityName ? `${provinceName}/${cityName}` : ''
  },
  set(val) {
    console.log(100, val)
    // emit('update:value', val)
  }
})

// 查询省和市的数据
const getList = async () => {
  const res: any = await getAllArea()
  console.log('getList -> getAllArea', res)
  areaList.value = res.data
  console.log('getList -> this.areaList', areaList.value)
}

const handleShowPop = () => {
  if (!props.couldEdit) return
  showArea.value = true
}
const onConfirmArea = ({ selectedOptions }: any) => {
  console.log(' hj ~ file: TempCity.vue:134 ~ onConfirmArea ~ values:', selectedOptions)
  const [province, city] = selectedOptions.map((i: any) => i.areaId)
  areaName.value = selectedOptions.map((option: any) => option.name).join('/')

  emit('update:value', { provinceId: province, areaId: city })
  showArea.value = false
}
</script>

<style scoped lang="scss"></style>
