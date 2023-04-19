<!--
 * @Author: HuZhangjie
 * @Date: 2020-07-02 09:55:22
 * @LastEditors: huangjin
 * @LastEditTime: 2023-04-19 11:37:15
 * @Description: 审核通过弹窗
-->

<template>
  <BaseDialog :show="showDialog" @close="handleClose">
    <img class="success-dialog__img" src="@/assets/images/signUp/bim_home_sucess@2x.png" />
    <div class="success-dialog__text">恭喜！审核已通过</div>
    <div class="success-dialog__btn" @click="handleConfirm">确定</div>
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

const handleConfirm = () => {
  const { query } = route.query
  router.push({
    name: 'BasicInfo',
    query: { ...(query as object) }
  })
}
</script>

<style lang="scss" scoped>
@import '@/styles/var.scss';

.success-dialog {
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
