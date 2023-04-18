<!--
 * @Author: jiangruohui
 * @Date: 2020-12-03 14:22:11
 * @LastEditors: jiangruohui
 * @LastEditTime: 2023-01-06 15:23:57
 * @Description: 广告轮播
-->
<template>
  <div class="m-banner-swipe">
    <van-swipe :autoplay="5000" @change="onChange">
      <van-swipe-item v-for="(item, index) in list" :key="index" @click="handleClick(item, index)">
        <div class="banner">
          <img class="banner-pic" :src="item.adImageUrl" />
        </div>
      </van-swipe-item>
      <template #indicator>
        <div class="indicator-wrapper">
          <div
            v-for="(item, index) in list"
            :key="index"
            :class="{ active: index === +current }"
            class="indicator-item"
          />
        </div>
      </template>
    </van-swipe>
  </div>
</template>
<script>
import { Swipe, SwipeItem } from 'vant'

export default {
  name: 'BannerSwipe',
  components: {
    'van-swipe': Swipe,
    'van-swipe-item': SwipeItem
  },
  props: {
    list: {
      type: Array,
      required: true
    }
  },
  data() {
    return {
      current: 0
    }
  },
  methods: {
    onChange(index) {
      this.current = index
    },
    handleClick(adv, index) {
      // eslint-disable-next-line vue/require-explicit-emits
      this.$emit('click', { adv, index })
      if (adv.adJumpUrl) {
        window.location.href = adv.adJumpUrl
      }
    }
  }
}
</script>
<style lang="scss" scoped>
.m-banner-swipe {
  width: 375px;
  height: 138px;

  .banner-block {
    width: 375px;
    height: 150px;

    .banner-pic {
      width: 375px;
      height: 150px;
    }
  }
}

.indicator-wrapper {
  position: absolute;
  bottom: 20px;
  display: flex;
  justify-content: center;
  width: 100%;
  text-align: center;
  .indicator-item {
    width: 4.5px;
    height: 4.5px;
    margin-right: 6px;
    background: #fff;
    border-radius: 3px;
    opacity: 0.4;

    &:last-of-type {
      margin-right: 0;
    }
  }

  .indicator-item.active {
    width: 12px;
    height: 5px;
    opacity: 0.9;
  }
}
</style>
