<template>
  <div class="btns">
    <span class="btns-span"
      v-for="(e, i) in btnMap" :key="i"
      :class="{'on': point === e.point}"
      @click.stop="$emit('update:point', e.point)"
      v-html="e.text"></span>
  </div>
</template>

<script>
export default {
  props: {
    point: { // 当前选中
      type: String,
      required: true
    },
    btnMap: {
      type: Array,
      default() {
        return [ // btn按钮映射
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
    }
  },
  data() {
    return {
    }
  }
}
</script>

<style lang="scss">
.btns {
  position: absolute;
  top: 20px;
  left: 50%;
  border: 1px solid #e6e6e6;
  background-color: #fff;
  transform: translateX(-50%);
  border-radius: 6px;
  z-index: 300;
  &-span {
    position: relative;
    float: left;
    height: 40px;
    line-height: 40px;
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
      height: 20px;
      border-right: 1px solid #e6e6e6;
    }
    &:last-of-type::before {
      content: none;
    }
  }
}
</style>
