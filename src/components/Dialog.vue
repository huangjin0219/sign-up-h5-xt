<template>
  <Overlay :show="show" :custom-style="styles">
    <div class="xt-dialog">
      <div v-if="title" class="title no-select">{{ title }}</div>
      <SvgIcon v-if="enableClose" name="close" class="close-icon" @click="handleClose" />
      <div class="body">
        <slot></slot>
      </div>
      <div v-if="cancelText || okText" class="footer no-select">
        <span v-if="cancelText" class="btn dark" href="javascript:;" @click="handleCancel">{{ cancelText }}</span>
        <span v-if="okText" class="btn light" href="javascript:;" @click="handleOk">{{ okText }}</span>
      </div>
    </div>
  </Overlay>
</template>

<script>
import { defineComponent } from 'vue'
import { Overlay } from 'vant'

export default defineComponent({
  name: 'XTDialog',
  components: {
    Overlay
  },
  props: {
    show: {
      default: false,
      type: Boolean
    },
    title: {
      default: '',
      type: String
    },
    cancelText: {
      default: '',
      type: String
    },
    okText: {
      default: '',
      type: String
    },
    enableClose: {
      default: true,
      type: Boolean
    }
  },
  emits: ['onCancel', 'onOk'],
  setup() {
    return {
      styles: {
        background: 'rgba(0, 0, 0, 0.3)'
      }
    }
  },
  mounted() {
    this.$nextTick(() => {
      const body = document.querySelector('body')
      if (body.append) {
        body.append(this.$el)
      } else {
        body.appendChild(this.$el)
      }
    })
  },
  methods: {
    handleClose() {
      this.$emit('onCancel')
    },
    handleCancel() {
      this.$emit('onCancel')
    },
    handleOk() {
      this.$emit('onOk')
    }
  }
})
</script>

<style lang="scss" scoped>
@import '@/styles/var.scss';
.svg-icon {
  width: 1em;
  height: 1em;
  vertical-align: -0.15em;
  fill: currentColor;
  overflow: hidden;
}
.xt-dialog {
  width: 270px;
  min-height: 208px;
  background-color: white;
  border-radius: 8px;
  margin: auto;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  font-size: 14px;
  padding-top: 15px;
  overflow: hidden;
  .title {
    font-size: 18px;
    line-height: 20px;
    height: 20px;
    font-weight: $font-bold;
    text-align: center;
    margin-bottom: 15px;
  }
  .close-icon {
    position: absolute;
    right: 12px;
    top: 12px;
  }
  .body {
    padding: 0 10px;
  }
  .footer {
    width: 100%;
    position: absolute;
    bottom: 0;
    text-align: center;
    // background: #dbdbdb;
    display: flex;
    justify-content: space-around;
    .btn {
      font-size: 15px;
      font-weight: 400;
      width: 100%;
      height: 40px;
      line-height: 40px;
      &.dark {
        background-color: #dbdbdb;
        color: #999;
      }
      &.light {
        background-color: $primary;
        color: white;
      }
      &:active {
        opacity: 0.8;
      }
    }
  }
}
</style>
