<template>
  <div class="btns">
    <span class="btns-span"
      v-for="(item, index) in buttonMap"
      :key="index"
      @click="selectPoint(item.point)"
      :class="nowPoint === item.point ? 'on' : ''"
      v-html="item.text"></span>
  </div>
</template>

<script>
export default {
  data () {
    return {
      nowPoint: 'aqi', // 当前选中按钮的值
      buttonMap: [ // btn按钮映射
        {text: 'AQI', point: 'aqi'},
        {text: 'PM2.5', point: 'pm25'},
        {text: 'PM10', point: 'pm10'},
        {text: 'SO<sub>2</sub>', point: 'so2'},
        {text: 'NO<sub>2</sub>', point: 'no2'},
        {text: 'CO', point: 'co'},
        {text: 'O<sub>3</sub>', point: 'o3'},
        {text: '综合指数', point: 'synthesis'}
      ]
    }
  },
  methods: {
    selectPoint(val) {
      this.nowPoint = val
      this.$emit('select-point', this.nowPoint)
    }
  }
}
</script>

<style lang="scss">
.btns {
  position: absolute;
  top: 20px;
  left: 50%;
  background-color: #fff;
  transform: translateX(-50%);
  border-radius: 6px;
  z-index: 300;
  &-span {
    position: relative;
    float: left;
    height: 46px;
    line-height: 46px;
    padding: 0 17px;
    color: #333;
    font-size: 14px;
    cursor: pointer;
    &.on {
      color: #0087ff;
    }
    &::before {
      content: '';
      position: absolute;
      top: 10px;
      right: 0;
      height: 24px;
      border-right: 1px solid #e6e6e6;
    }
    &.last-of-type {
      border-right: 0 none;
    }
  }
}
</style>
