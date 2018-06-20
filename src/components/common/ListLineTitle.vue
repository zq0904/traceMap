<template>
  <div class="ListLineTitle">
    <div class="line"></div>
    <div class="ListLineTitle-name" v-if="title">{{title}}</div>
  </div>
</template>

<script>
export default {
  props: {
    title: {
      default: ''
    }
  },
  data () {
    return {
    }
  }
}
</script>

<style lang="scss">
  .ListLineTitle {
    .line {
      width: 100%;
      height: 20px;
      background-color: #F5F7FA;
    }
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
