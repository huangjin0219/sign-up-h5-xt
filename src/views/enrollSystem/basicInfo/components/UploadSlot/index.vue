<!--
 * @Author: HuZhangjie
 * @Date: 2020-07-02 17:06:07
 * @LastEditors: HuZhangjie
 * @LastEditTime: 2020-07-02 18:08:54
 * @Description: 上传组件的内部自定义slot
-->
<template>
  <div class="upload-slot" :style="{ width }">
    <div class="upload-img">
      <img :src="uploadBg" style="width: 100%" />
      <img class="upload-img__add" src="@/assets/images/signUp/bim_answer_add@2x.png" />
    </div>
    <div class="upload-text">{{text}}</div>
  </div>
</template>

<script>
export default {
  components: {},
  props: {
    width: {
      type: String,
      default: ''
    },
    // 底图
    uploadBg: {
      type: String,
      default: require('../../../../../assets/images/signUp/bim_answer_lidcard_front@2x.png')
    },
    text: {
      type: String,
      default: '正面'
    }
  },
  data () {
    return {
    }
  },
  computed: {},
  methods: {}
}
</script>

<style lang="scss" scoped>
.upload-slot {
  // width: 156px;
  // height: 115px;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  // border: 1px solid #ECECEC;
  .upload-img {
    width: 50%;
    position: relative;
    &__add {
      width: 28px;
      height: 28px;
      position: absolute;
      left: 50%;
      top: 50%;
      transform: translate(-50%, -50%);
    }
  }
  .upload-text {
    margin-top: 11px;
    color: #999;
    font-size: 13px;
  }
}
</style>
