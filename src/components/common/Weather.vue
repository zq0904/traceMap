<template>
  <div class="weather">
    <p class="time">今天{{formatTime}}更新</p>
    <p class="info">
      <span class="temperature">{{data.temperature}}°</span>
      <img src="../../assets/images/暴雪.png" height="50" width="54" alt="">
      <span class="cloud">{{ data.weatherText }}</span>
    </p>
    <p class="level">
      <em class="iconfont icon-iconset0457"></em>
      <span class="level-span">湿度{{data.humidity}}%</span>
      <em class="iconfont icon-fengxiang" :class="mapWindDirection"></em>
      <span class="level-span">{{data.windDirection + data.windRank}}（风速{{data.windSpeed}}m/s）</span>
    </p>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import moment from 'moment'

export default {
  props: {
  },
  data () {
    return {
      data: {}
    }
  },
  computed: {
    ...mapGetters({
      api: 'getApi'
    }),
    // 风向映射
    mapWindDirection() {
      let str = 'icon-fengxiang'
      switch (this.data.windDirection) {
        case '南风':
          str += '-1'
          break
        case '西南风':
          str += '-2'
          break
        case '西风':
          str += '-3'
          break
        case '西北风':
          str += '-4'
          break
        case '北风':
          str += '-5'
          break
        case '东北风':
          str += '-6'
          break
        case '东风':
          str += '-7'
          break
        case '东南风':
          str += '-8'
          break
      }
      return str
    },
    formatTime() {
      return moment(this.data.time || Date.now()).format('HH:mm')
    }
  },
  created() {
    this.request()
  },
  methods: {
    // 请求 实时天气信息
    async request() {
      const {data} = await this.$fetch({ url: this.api.weatherInfo })
      // console.log(data)
      this.data = data.result
    }
  }
}
</script>

<style lang="scss">
  @import '../../assets/scss/app';
  .weather {
    position: absolute;
    top: 0;
    left: 0;
    z-index: 10;
    height: 144px;
    padding: 17px 20px;
    background-color: rgba(0, 0, 0, .3);
    color: #fff;
    .time {
      height: 32px;
      font-size: 12px;
    }
    .info {
      height: 53px;
      .temperature {
        float: left;
        font-size: 53px;
        font-weight: 700;
      }
      img {
        float: left;
        margin: 0 5px 0;
      }
      .cloud {
        float: left;
        padding-top: 32px;
        font-size: 13px;
      }
    }
    .level {
      height: 25px;
      line-height: 25px;
      font-size: 12px;
      &-span{
        float: left;
        &:nth-of-type(1) {
          padding: 0 7px;
        }
        &:nth-of-type(2) {
          padding-left: 7px
        }
      }
      .iconfont {
        float: left;
      }
      .icon-iconset0457 {
        font-size: 14px;
      }
      .icon-fengxiang {
        font-size: 18px;
        &-1 { @include c3(transform, rotate(0)) }
        &-2 { @include c3(transform, rotate(45deg)) }
        &-3 { @include c3(transform, rotate(90deg)) }
        &-4 { @include c3(transform, rotate(135deg)) }
        &-5 { @include c3(transform, rotate(180deg)) }
        &-6 { @include c3(transform, rotate(225deg)) }
        &-7 { @include c3(transform, rotate(270deg)) }
        &-8 { @include c3(transform, rotate(315deg)) }
      }
    }
  }
</style>
