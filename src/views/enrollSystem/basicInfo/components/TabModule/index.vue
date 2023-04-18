<!--
 * @Descripttion:
 * @version: 1.0.0
 * @Author: 刘帅楠
 * @Date: 2020-07-01 17:24:27
 * @LastEditors: HuZhangjie
 * @LastEditTime: 2020-07-14 17:54:08
-->
<template>
  <div class="tab-wrap">
    <div
      class="tab-content"
      :class="[{'tab-project': tabType}, {'is-active': value === item}]"
      v-for="item in list"
      :key="item"
      @click="handleTabClick(item)"
    >{{item}}</div>
  </div>
</template>
<script>
export default {
  props: {
    value: {
      type: [String, Number],
      default: ''
    },
    list: {
      type: Array
    },
    tabType: {
      type: Boolean,
      default: true
    },
    // 能否编辑
    couldEdit: {
      type: Boolean,
      default: true
    }
  },
  data () {
    return {
    }
  },
  computed: {
    tabValue: {
      get () {
        return this.value
      },
      set (val) {
        if (this.couldEdit) {
          this.$emit('input', val)
        }
      }
    }
  },
  methods: {
    handleTabClick (item) {
      this.tabValue = item
    }
  }
}
</script>
<style lang="scss" scoped>
@import "@/styles/mixin.scss";
.tab-wrap {
    padding: 14px 15px 14px 14px;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;

    .tab-content{
        min-width: 73px;
        height: 35px;
        border-radius: 4px;
        text-align: center;
        line-height: 35px;
        border: 1px solid $bimPrimary;
        color: $bimPrimary;
        margin-bottom: 15px;
        font-size: 13px;
    }

    .tab-project {
        min-width: 157px;
    }
    .is-active {
      color: #fff;
      background-color: $bimPrimary;
    }
}

</style>
