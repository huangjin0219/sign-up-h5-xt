<!--
 * @Author: jiangruohui
 * @Date: 2022-04-28 11:45:37
 * @LastEditors: jiangruohui
 * @LastEditTime: 2022-08-22 17:02:05
 * @Description: 返回按钮
-->
<template>
  <div v-if="uaEnv !== 'minipro'" class="m-back-btn flex-row" :class="'back-btn__' + theme" @click="onClick">
    <SvgIcon v-if="showIcon" class="icon-back" name="next" />{{ text }}
  </div>
</template>

<script lang="ts" setup>
interface Props {
  text: string
  showIcon?: boolean
  theme?: 'dark' | 'light'
  link?: string
}
const props = withDefaults(defineProps<Props>(), {
  showIcon: true,
  text: '',
  theme: 'dark',
  link: '/'
})
const uaEnv = inject('uaEnv')
const router = useRouter()
const onClick = () => {
  router.push(props.link)
}
</script>
<script lang="ts">
export default {
  name: 'XtBack'
}
</script>

<style lang="scss" scoped>
.m-back-btn {
  display: inline-block;
  align-items: center;
  padding: 0 8px 0 5px;
  height: 24px;
  font-size: 12px;
  color: #fff;
  line-height: 24px;
  background: #7f7f7f;
  border-radius: 12px;

  .icon-back {
    margin-right: 1px;
    transform: rotate(180deg);
  }

  &.back-btn__light {
    padding: 0 21px;
    height: 28px;
    font-size: 13px;
    color: #999;
    background: transparent;
    border: 1px solid #ccc;
    border-radius: 14px;
  }
}
</style>
