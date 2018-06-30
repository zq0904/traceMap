<template>
  <div class="ListLineTitle">
    <RowLine v-if="showLine"></RowLine>
    <div class="ListLineTitle-name" v-if="title">{{title}}</div>
  </div>
</template>

<script>
import RowLine from './RowLine'

export default {
  props: {
    title: {
      default: ''
    },
    showLine: {
      default: false
    }
  },
  components: {
    RowLine
  },
  data () {
    return {
    }
  }
}
</script>

<style lang="scss">
  .ListLineTitle {
    overflow: hidden;
    &-name {
      position: relative;
      height: 24px;
      margin: 20px 0 20px 20px;
      padding-top: 5px;
      padding-left: 13px;
      font-size: 18px;
      color: #333333;
      &::before {
        position: absolute;
        top: 0;
        left: 0;
        content: '';
        height: 100%;
        width: 4px;
        background-color: #0087FF;
      }
    }
  }
</style>
