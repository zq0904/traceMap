<template>
  <span class="SingleButton"
    :class="{'fixed': fixedSize, 'noFixed': !fixedSize, 'on': active === false && isOn, 'active': active}"
    @click.stop="isOn = !isOn"
    >{{ text }}</span>
</template>

<script>
export default {
  props: {
    text: { // 文本
      type: String,
      required: true
    },
    fixedSize: { // 是否固定宽
      type: Boolean,
      default: false
    },
    active: { // 高亮的方式 默认click
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      isOn: false
    }
  },
  watch: {
    isOn: {
      handler(val) {
        this.$emit('click', val)
      }
    }
  }
}
</script>

<style lang="scss">
  .SingleButton {
    display: inline-block;
    height: 36px;
    line-height: 36px;
    border: 1px solid #E6E6E6;
    border-radius: 4px;
    font-size: 14px;
    text-align: center;
    color: #333;
    background-color: #fff;
    cursor: pointer;
    &.on {
      color: #0087FF;
      border-color: #0087FF;
    }
    &.active:active {
      color: #0087FF;
      border-color: #0087FF;
    }
    &.noFixed {
      padding: 0 10px;
    }
    &.fixed {
      width: 90px;
    }
  }
</style>
