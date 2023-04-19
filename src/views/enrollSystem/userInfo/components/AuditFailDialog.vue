<!--
 * @Author: HuZhangjie
 * @Date: 2020-07-02 09:55:22
 * @LastEditors: huangjin
 * @LastEditTime: 2023-04-19 11:34:12
 * @Description: 审核不通过弹窗
-->

<template>
  <BaseDialog :show="showDialog" @close="handleClose">
    <img class="fail-dialog__img" src="@/assets/images/signUp/bim_home_failure_color@2x.png" />
    <div class="fail-dialog__text">审核不通过！</div>
    <div class="fail-dialog__btn" @click="handleReSubmit">重新提交</div>
  </BaseDialog>
</template>

<script lang="ts" setup>
import BaseDialog from '@/components/SignUpDialog.vue'

const route = useRoute()
const router = useRouter()
interface Props {
  show?: boolean
}
const props = withDefaults(defineProps<Props>(), {
  show: false
})
const { show } = toRefs(props)
const emit = defineEmits(['update:show'])
const handleClose = () => {
  showDialog.value = false
}

const showDialog = computed({
  get() {
    return show.value
  },
  set(val) {
    emit('update:show', val)
  }
})

const handleReSubmit = () => {
  const { query } = route.query
  console.log('handleReSubmit -> handleReSubmit')
  router.push({
    name: 'BasicInfo',
    query: { ...(query as object) }
  })
}
</script>

<style lang="scss" scoped>
@import '@/styles/var.scss';

.fail-dialog {
  &__img {
    width: 98px;
  }
  &__text {
    margin-top: 10px;
    font-size: 16px;
  }
  &__btn {
    margin-top: 30px;
    width: 121px;
    height: 34px;
    color: #fff;
    line-height: 34px;
    text-align: center;
    border-radius: 4px;
    background: $bimPrimary;
  }
}
</style>
