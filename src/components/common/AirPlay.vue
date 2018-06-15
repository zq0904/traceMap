<template>
  <div class="AirPlay">
    <div class="AirPlay-start pull-left">
      <div class="AirPlay-start-top"></div>
      <div class="AirPlay-start-heart">
        <span class="iconfont"
          @click.prevent="playStart"
          :class="AirPlayId ? 'icon-zanting' : 'icon-zanting1'"></span>
      </div>
    </div>
    <div class="AirPlay-date pull-left">
      <!-- copy样式做背景 -->
      <div class="el-slider__runway text">
        <!-- 灰色背景 -->
        <div class="text-bg-gray"
          v-for="val in AirPlayMax" :key="val"
          v-if="val > dataLength"
          :style="`left: ${ (val - 1) * 100 / AirPlayMax}%;`"></div>
        <!-- | 线背景 -->
        <div class="el-slider__stop" style="left: 4.16667%;"><span class="text-val">02</span></div>
        <div class="el-slider__stop" style="left: 8.33333%;"><span class="text-val">04</span></div>
        <div class="el-slider__stop" style="left: 12.5%;"><span class="text-val">06</span></div>
        <div class="el-slider__stop" style="left: 16.6667%;"><span class="text-val">08</span></div>
        <div class="el-slider__stop" style="left: 20.8333%;"><span class="text-val">10</span></div>
        <div class="el-slider__stop" style="left: 25%;"><span class="text-val">12</span></div>
        <div class="el-slider__stop" style="left: 29.1667%;"><span class="text-val">14</span></div>
        <div class="el-slider__stop" style="left: 33.3333%;"><span class="text-val">16</span></div>
        <div class="el-slider__stop" style="left: 37.5%;"><span class="text-val">18</span></div>
        <div class="el-slider__stop" style="left: 41.6667%;"><span class="text-val">20</span></div>
        <div class="el-slider__stop" style="left: 45.8333%;"><span class="text-val">22</span></div>
        <div class="el-slider__stop" style="left: 50%;"><span class="text-line"></span></div>
        <div class="el-slider__stop" style="left: 54.1667%;"><span class="text-val">02</span></div>
        <div class="el-slider__stop" style="left: 58.3333%;"><span class="text-val">04</span></div>
        <div class="el-slider__stop" style="left: 62.5%;"><span class="text-val">06</span></div>
        <div class="el-slider__stop" style="left: 66.6667%;"><span class="text-val">08</span></div>
        <div class="el-slider__stop" style="left: 70.8333%;"><span class="text-val">10</span></div>
        <div class="el-slider__stop" style="left: 75%;"><span class="text-val">12</span></div>
        <div class="el-slider__stop" style="left: 79.1667%;"><span class="text-val">14</span></div>
        <div class="el-slider__stop" style="left: 83.3333%;"><span class="text-val">16</span></div>
        <div class="el-slider__stop" style="left: 87.5%;"><span class="text-val">18</span></div>
        <div class="el-slider__stop" style="left: 91.6667%;"><span class="text-val">20</span></div>
        <div class="el-slider__stop" style="left: 95.8333%;"><span class="text-val">22</span></div>
      </div>
      <el-slider
        class="position"
        show-stops
        :show-tooltip="false"
        v-model="AirPlayValue"
        :step="1"
        :min="0"
        :max="dataLength"
        :style="`width: ${AirPlayWidth}`"
        @change="setIntervalStartVal = AirPlayValue"
        ></el-slider>
      <div class="AirPlay-date-time pull-left">{{ formatTime[0] }}</div>
      <div class="AirPlay-date-time pull-right">{{ formatTime[1] }}</div>
    </div>
    <div class="AirPlay-flag pull-right">
      <div class="AirPlay-flag-item"><em class="AirPlay-flag-item-em rgb-0-228-0"></em>优</div>
      <div class="AirPlay-flag-item"><em class="AirPlay-flag-item-em rgb-255-255-0"></em>良</div>
      <div class="AirPlay-flag-item"><em class="AirPlay-flag-item-em rgb-255-126-0"></em>轻度</div>
      <div class="AirPlay-flag-item"><em class="AirPlay-flag-item-em rgb-255-0-0"></em>中度</div>
      <div class="AirPlay-flag-item"><em class="AirPlay-flag-item-em rgb-153-0-76"></em>重度</div>
      <div class="AirPlay-flag-item"><em class="AirPlay-flag-item-em rgb-126-0-35"></em>严重</div>
    </div>
  </div>
</template>

<script>
import moment from 'moment'

export default {
  props: {
    dataLength: { // 数组长度
      type: Number,
      required: true
    },
    nowDateTime: {
      type: String,
      required: true
    }
  },
  data () {
    return {
      AirPlayMax: 48, // 最大值 固定不变
      AirPlayValue: this.dataLength, // 初始值 取数组长度
      AirPlayId: false, // 定时器ID
      setIntervalStartVal: 1 // 开启定时器 起始值
    }
  },
  watch: {
    AirPlayValue(val) {
      if (val < 1) { // 保证0取不到
        this.AirPlayValue = 1
        return false
      }
      // 通知父组件 当前选择的 index
      this.$emit('nowSelectIndex', this.AirPlayValue)
    }
  },
  computed: {
    // 动态计算宽度 限定范围
    AirPlayWidth() {
      for (let i = 1; i <= this.AirPlayMax; i++) {
        if (i > this.dataLength) {
          return (i - 1) * 100 / this.AirPlayMax + '%'
        }
      }
    },
    // 格式化时间
    formatTime() {
      let timestamp = moment(this.nowDateTime).valueOf()
      return [moment(timestamp - 24 * 3600 * 1000).format('YYYY-MM-DD (dddd)'), moment(timestamp).format('YYYY-MM-DD (dddd)')]
    }
  },
  methods: {
    // 开始播放 或 停止
    playStart() {
      if (this.AirPlayId) {
        clearInterval(this.AirPlayId)
        this.AirPlayId = false
        --this.setIntervalStartVal
      } else {
        const handlerSetInterval = () => {
          this.AirPlayValue = this.setIntervalStartVal
          if (++this.setIntervalStartVal > this.dataLength) {
            this.setIntervalStartVal = 1
          }
        }
        handlerSetInterval() // 初始执行一次
        this.AirPlayId = setInterval(handlerSetInterval, 2000)
      }
    }
  }
}
</script>

<style lang="scss">
@import '../../assets/scss/app';

.AirPlay {
  position: absolute;
  left: 0;
  bottom: 0;
  width: 100%;
  height: 80px;
  background-color: rgba(0, 0, 0, 0.3);
  &-start {
    position: relative;
    width: 7%;
    height: 100%;
    &-top {
      width: 100%;
      height: 10px;
      background-color: #0263BB;
    }
    &-heart {
      position: relative;
      width: 100%;
      height: 70px;
      .iconfont {
        position: absolute;
        top: 50%;
        left: 50%;
        font-size: 40px;
        color: #fff;
        @include c3(transform, translate3d(-50%, -50%, 0))
        cursor: pointer;
      }
    }
  }
  &-date {
    width: 62%;
    height: 80px;
    // 滑块样式覆盖
    .el-slider__runway {
      height: 10px;
      margin: 0;
      background-color: transparent;
      border-radius: 0px;
      .el-slider__bar {
        height: 10px;
        background-color: transparent;
        border-radius: 0;
      }
      .el-slider__button-wrapper {
        top: -13px;
      }
      .el-slider__stop {
        width: 1px;
        height: 10px;
        background-color: #fff;
      }
    }
    // 隐藏真正执行功能的样式
    .position {
      margin-top: -10px;
      .el-slider__stop {
        background-color: transparent;
      }
    }
    &-time  {
      width: 50%;
      height: 70px;
      padding-top: 36px;
      color: #fff;
      font-size: 14px;
      text-align: center;
    }
    // 数值文本
    .text {
      position: relative;
      background-color: #0263BB;
      &-bg-gray {
        position: absolute;
        width: 2.08333%;
        height: 10px;
        background-color: #B5BDC2;
      }
      .el-slider__stop {
        border-radius: 0;
      }
      &-val {
        position: absolute;
        top: 20px;
        left: 50%;
        @include c3(transform, translateX(-50%));
        font-size: 12px;
        color: #fff;
      }
      // 3条线
      &::before, &::after {
        content: '';
        position: absolute;
        top: 0;
        width: 1px;
        height: 80px;
        background-color: #fff;
        z-index: 1;
      }
      &::before {
        left: 0;
      }
      &::after {
        right: 0;
      }
      &-line {
        position: absolute;
        top: 0;
        left: 50%;
        @include c3(transform, translateX(-50%));
        width: 1px;
        height: 80px;
        background-color: #fff;
        z-index: 1;
      }
    }
  }
  &-flag {
    @include c3(display, flex);
    width: 31%;
    &-item {
      @include c3(flex, 1);
      position: relative;
      height: 70px;
      line-height: 70px;
      text-align: center;
      font-size: 14px;
      color: #fff;
      &-em {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 10px;
      }
    }
  }
}
</style>
