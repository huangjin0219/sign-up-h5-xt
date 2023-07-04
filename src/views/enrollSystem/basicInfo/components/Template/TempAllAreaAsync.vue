<!--
 * @Author: huangjin
 * @Description: 模板-省/市/区 - 异步 省市区三个接口分开调
 此组件使用省市区三个接口分别获取各级数据，稍显繁琐，但是可满足需求
 省市区显示几级可通过 level 控制
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
    <van-popup v-model:show="showArea" position="bottom" :lock-scroll="false">
      <Picker show-toolbar :columns="columns" @change="onChange" @confirm="sureRegion" @cancel="handleCloseArea" />
    </van-popup>
  </div>
</template>

<script lang="ts" setup>
import { getProvince, getCity, getArea } from '@/common/api/signUp/user'
import { Field as VanField, Popup as VanPopup, Picker } from 'vant'
import { Area } from '@/typings/address'
import { TEMPLATE_ITEM } from '@/typings/sign-up'
import Title from '../Title/index.vue'

interface Value {
  provinceId?: number
  provinceName?: string
  cityId?: number
  cityName?: string
  areaId?: number
  areaName?: string
}

interface Props {
  value?: Value
  templateItem?: TEMPLATE_ITEM
  // 能否编辑
  couldEdit?: boolean
  // 教育类型(其实是汇总表的数字),为汇总表7时 title 为考试地点
  educationType?: number
  // 省市区都显示为3
  level?: number
}
const props = withDefaults(defineProps<Props>(), {
  value: () => ({}),
  templateItem: () => ({}),
  couldEdit: true,
  educationType: 0,
  level: 3
})

const emit = defineEmits(['change', 'update:value'])

const showArea = ref<boolean>(false)
const defaultColumns = (level: number) => {
  switch (level) {
    case 1:
      return [
        {
          values: [],
          defaultIndex: 0
        }
      ]
    case 2:
      return [
        {
          values: [],
          defaultIndex: 0
        },
        {
          values: [],
          defaultIndex: 0
        }
      ]
    case 3:
      return [
        {
          values: [],
          defaultIndex: 0
        },
        {
          values: [],
          defaultIndex: 0
        },
        {
          values: [],
          defaultIndex: 0
        }
      ]
    default:
      return [
        {
          values: [],
          defaultIndex: 0
        }
      ]
  }
}
// 组件所需的数据
const columns = ref(defaultColumns(props.level))

onMounted(async () => {
  await handleProvince()
})

// 省市区的文字展示
const areaName = computed(() => {
  if (!columns.value.length || !props.value.provinceId || !props.value.provinceName) return ''
  const { provinceName, cityName, areaName } = props.value
  let completeName
  switch (props.level) {
    case 1:
      completeName = provinceName
      break
    case 2:
      completeName = provinceName && cityName ? `${provinceName}/${cityName}` : ''
      break
    case 3:
      completeName = provinceName && cityName && areaName ? `${provinceName}/${cityName}/${areaName}` : ''
      break
    default:
      break
  }
  return completeName
})

const handleShowPop = () => {
  if (!props.couldEdit) return
  showArea.value = true
}

const onChange = (value: Area[], index: number) => {
  switch (index) {
    case 0:
      if (props.level !== 1) handleCity(value[index].areaId)
      break
    case 1:
      if (props.level === 3) handleArea(value[index].areaId)
      break

    default:
      break
  }
}
const handleCloseArea = () => {
  showArea.value = false
}

const sureRegion = (sureArea: Area[]) => {
  const { areaId: provinceId, text: provinceName } = sureArea[0] || {}
  const { areaId: cityId, text: cityName } = sureArea[1] || {}
  const { areaId, text: areaName } = sureArea[2] || {}
  // 把 value 传递出去
  console.log('value', { provinceId, cityId, areaId, provinceName, cityName, areaName })
  emit('update:value', { provinceId, cityId, areaId, provinceName, cityName, areaName })

  showArea.value = false
}

const handleProvince = () => {
  getProvince().then(({ data }: any) => {
    if (data && data.length) {
      columns.value[0].values = data.map((item: Area) => {
        return { text: item.name, areaId: item.areaId }
      })
      if (props.value.provinceId) {
        const index = columns.value[0].values.findIndex((i: any) => i.areaId === props.value.provinceId)
        columns.value[0].defaultIndex = index
      }
      if (props.level !== 1) handleCity(props.value.provinceId || data[0].areaId)
    } else {
      columns.value[0].values = []
      columns.value[1].values = []
      columns.value[2].values = []
    }
  })
}

const handleCity = async (provinceId: number) => {
  getCity({ provinceId: `${provinceId}` }).then(({ data }: any) => {
    if (data && data.length) {
      columns.value[1].values = data.map((item: Area) => {
        return { text: item.name, areaId: item.areaId }
      })
      if (props.value.cityId) {
        const index = columns.value[1].values.findIndex((i: any) => i.areaId === props.value.cityId)
        columns.value[1].defaultIndex = index
      }
      if (props.level === 3) handleArea(props.value.cityId || data[0].areaId)
    } else {
      columns.value[1].values = []
      columns.value[2].values = []
    }
  })
}

const handleArea = async (cityId: number) => {
  getArea({ cityId: `${cityId}` }).then(({ data }: any) => {
    if (data && data.length) {
      columns.value[2].values = data.map((item: Area) => {
        return { text: item.name, areaId: item.areaId }
      })
      if (props.value.areaId) {
        const index = columns.value[2].values.findIndex((i: any) => i.areaId === props.value.areaId)
        columns.value[2].defaultIndex = index
      }
    } else {
      columns.value[2].values = []
    }
  })
}
</script>

<style scoped lang="scss"></style>
