<template>
  <div class="home" v-loading="loading">
    <section class="home-title">
      <h4 class="home-title-h4">Hi, 张三</h4>
      <p class="home-title-p">上次登录时间: 12小时24分钟前</p>
    </section>
    <section class="home-wrap">
      <section class="home-amount">
        <div class="home-amount-left">
          <div class="home-amount-left-item" v-for="(item, index) in latelyInfo" :key="index">
            <div class="home-amount-left-item-p">
              <h6 class="home-amount-left-item-p-h6">{{item.text}}</h6>
              <span class="home-amount-left-item-p-span">{{item.value}}<em class="home-amount-left-item-p-span-em">{{ index > 2 ? '个' : '次' }}</em></span>
            </div>
          </div>
        </div>
        <div class="home-amount-right" id="home-carousel">
          <div class="swiper-wrapper">
            <div class="swiper-slide" v-for="(e, i) in fillgaugeCount" :key="i">
              <svg :id="'fillgauge' + i " width="146" height="146"></svg>
              <h6 class="swiper-slide-h6">{{ '剩余排放吨数' + i}}</h6>
              <div class="swiper-slide-div">
                <p class="swiper-slide-div-p1">{{ i }}<em class="swiper-slide-div-p1-em">吨</em></p>
                <p class="swiper-slide-div-p2">{{ '预计剩余' + i }}</p>
                <p class="swiper-slide-div-p2">{{ '1小时59分' + i + '秒' }}</p>
              </div>
            </div>
          </div>
          <!-- Add Pagination -->
          <div class="swiper-pagination"></div>
        </div>
      </section>
      <section class="home-linepic">
        <ListLineTitle :title="'考核站国控站点曲线图'"></ListLineTitle>
        <div class="home-linepic-chart">
          <Btns class="home-linepic-chart-sixMap" :btnMap="sixMap" :point.sync="sixPoint"></Btns>
          <Btns class="home-linepic-chart-timeMap" :btnMap="timeMap" :point.sync="timePoint"></Btns>
          <el-date-picker
            class="home-linepic-chart-picker"
            v-model="dateTime"
            @change="changeTime"
            type="daterange"
            format="yyyy-MM-dd"
            value-format="timestamp"
            size="large"
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期">
          </el-date-picker>
          <Btns class="home-linepic-chart-dayMap" :btnMap="dayMap" :point.sync="dayPoint"></Btns>
          <div id="container"></div>
        </div>
      </section>
    </section>
  </div>
</template>
<script>
import { mapGetters } from 'vuex'
import { liquidFillGaugeDefaultSettings, loadLiquidFillGauge } from '../../lib/liquidFillGauge'
import Highcharts from 'highcharts'
import Swiper from 'swiper'
import Btns from '../common/Bths'
import ListLineTitle from '../common/ListLineTitle'
import { getTimeByDay, nameUpperCase, nameUnit } from '../../lib/common'
import moment from 'moment'

export default {
  components: {
    ListLineTitle,
    Btns
  },
  data() {
    return {
      loading: false,
      config: {}, // D3 配置项
      latelyInfo: [
        {
          text: '昨日报警数',
          value: 7
        },
        {
          text: '近7日报警数',
          value: 7
        },
        {
          text: '本月报警数',
          value: 7
        },
        {
          text: '今日代办数',
          value: 2
        },
        {
          text: '昨日新增污染源',
          value: 7
        },
        {
          text: '近7日新增污染源',
          value: 7
        },
        {
          text: '本月新增污染源',
          value: 7
        },
        {
          text: '已处理污染源',
          value: 2
        }
      ], // 8项个数
      fillgaugeCount: [1, 2, 3], // mock
      // btn按钮映射
      sixMap: [
        {text: 'AQI', point: 'aqi'},
        {text: 'PM2.5', point: 'pm25'},
        {text: 'PM10', point: 'pm10'},
        {text: 'SO<sub>2</sub>', point: 'so2'},
        {text: 'NO<sub>2</sub>', point: 'no2'},
        {text: 'CO', point: 'co'},
        {text: 'O<sub>3</sub>', point: 'o3'}
      ],
      timeMap: [
        {text: '时', point: '0'},
        {text: '日', point: '1'}
      ],
      dayMap: [
        {text: '最近一天', point: '0'},
        {text: '最近一周', point: '1'},
        {text: '最近一月', point: '2'},
        {text: '最近一年', point: '3'}
      ],
      sixPoint: 'aqi', // 6选项
      timePoint: '0', // 时日选项
      dayPoint: '0', // 天周月年选项
      dateTime: getTimeByDay(1), // 时间日期选项
      Highcharts: {}, // 实例对象
      higchartsData: [] // 组装后的数据
    }
  },
  watch: {
    sixPoint(val) {
      for (let e of this.higchartsData) {
        for (let item of e.data) {
          item.y = item.e[this.sixPoint]
        }
      }
      this.upDateConfig()
    },
    timePoint(val) {
      if (this.dayPoint === '3' && val === '0') return this.dayPoint = '0' // 最近一年 切换 时 到 最近一天
      if (this.dayPoint === '0' && val === '1') return this.dayPoint = '1' // 最近一天 切换 日 到 最近一周
      this.request()
    },
    dayPoint(val) {
      if (this.timePoint !== '0' && val === '0') return this.timePoint = '0' // 最近一天 只能是 时
      if (this.timePoint !== '1' && val === '3') return this.timePoint = '1' // 最近一年 只能是 日
      this.request()
    }
  },
  computed: {
    ...mapGetters({
      api: 'getApi'
    })
  },
  async created() {
    await this.request()
    this.$nextTick(() => {
      this.initD3()
      this.initSwiper()
      this.initHigcharts()
    })
  },
  methods: {
    changeTime(val) {
      if (this.dayPoint !== '') return this.dayPoint = ''
      this.request()
    },
    // 请求接口
    async request() {
      const {data} = await this.$fetch({
        url: this.api.weatherInfo,
        data: {
          timeType: this.timePoint,
          showType: this.dayPoint,
          dateTime: ['0', '1', '2', '3'].indexOf(this.dayPoint) === -1 ? this.dateTime.join(',') : ''
        }
      })
      console.log(data)
      // mock后台返回的查询时间
      const st = 1530547200000
      const et = 1531152000000
      this.dateTime = [st, et]
      // mock原始数据
      const originData = {
        '市环保局': [
          {
            aqi: 50,
            co: 1.5,
            most: '无',
            no2: 19,
            o3: 73,
            pm10: -1,
            pm25: 35,
            so2: 8,
            time: 1531098000000
          },
          {
            aqi: 50,
            co: 1.5,
            most: '无',
            no2: 19,
            o3: 73,
            pm10: -1,
            pm25: 35,
            so2: 8,
            time: 1531101600000
          }
        ],
        '达活泉': [
          {
            aqi: 35,
            co: 24,
            most: '无',
            no2: 14,
            o3: 15,
            pm10: 17,
            pm25: 27,
            so2: 47,
            time: 1531098000000
          },
          {
            aqi: 13,
            co: 14,
            most: '无',
            no2: 25,
            o3: 14,
            pm10: -1,
            pm25: 51,
            so2: 8,
            time: 1531101600000
          }
        ]
      }
      // 数据组装
      const series = []
      for (let key in originData) {
        const data = []
        for (let e of originData[key]) {
          data.push({ x: e.time, y: e[this.sixPoint], e })
        }
        series.push({
          name: key,
          data
        })
      }
      this.higchartsData = series
    },
    initD3() {
      this.config = liquidFillGaugeDefaultSettings() // 获取基础配置
      this.config.minValue = 0 // 测量最小值
      this.config.maxValue = 200 // 测量最大值
      this.config.circleThickness = 0.02 // 外圆的厚度是半径的百分数
      this.config.circleFillGap = 0 // 外圈和波圈之间的间隙大小是外圆半径的百分比
      this.config.circleColor = '#19D3FF' // 外圆的颜色
      // this.config.waveHeight = 0.05 // 波高是波圆半径的百分数
      // this.config.waveCount = 1 // 波圈每宽度的全波数
      // this.config.waveRiseTime = 1000 // 波从0上升到它的最终高度的毫秒数
      this.config.waveAnimateTime = 2000 // 整个波进入波圈的毫秒数
      // this.config.waveRise = true // 控制如果波从0上升到它的高度，或者从它的高度开始
      // this.config.waveHeightScaling = true
      // this.config.waveAnimate = true // 控制波浪滚动或静止
      this.config.waveColor = 'rgba(52, 125, 266, .7)' // 填充波的颜色
      // this.config.waveOffset = 0 // 初始偏移量。0 =没有抵消。1 =一个全波的偏移。
      this.config.textVertPosition = 0.5 // 文本距离底部百分比
      this.config.textSize = 1 // 在波圈中显示的文本的相对高度。1 = 50%
      // this.config.valueCountUp = true // 如果是true，则显示的值将从0计数到加载后的最终值。如果是false，则显示最终值。
      this.config.displayPercent = false // 如果是true，则在值之后显示%符号
      this.config.textColor = 'rgba(0, 0, 0, 0)' // 当波不重叠时，值文本的颜色
      this.config.waveTextColor = 'rgba(0, 0, 0, 0)' // 当波重叠时，数值文本的颜色
      // 自定义
      this.config.isShowLine = false // 不显示警戒线
      // this.config.lineValue = 100, // 警戒线考核值
      this.fillgaugeCount.forEach((e, i) => {
        loadLiquidFillGauge('fillgauge' + i, 100, this.config) // svgID, 当前值, 配置项
      })
    },
    initSwiper() {
      this.swiper = new Swiper('#home-carousel', {
        // loop: true, // 由于 D3 渲染只能使用id 顾循环不能开启
        grabCursor: true, // 抓手
        pagination: {
          el: '.swiper-pagination',
          dynamicBullets: true, // 动态页码
          clickable: true // 可点击
        }
      })
    },
    initHigcharts() {
      this.Highcharts = Highcharts.chart('container', {
        chart: {
          type: 'spline'
          // zoomType: 'x' // 缩放维度
        },
        title: {
          text: `${nameUpperCase(this.sixPoint)} 比较`
        },
        credits: {
          enabled: false // 禁用版权信息
        },
        tooltip: {
          useHTML: true, // 开启HTML模式(svg渲染) formatter支持所有的html
          formatter: function() {
            // console.log(this)
            return `
            <div style="text-align: center;">
              <p>${moment(this.x).format('dddd MM月DD日 HH:mm')}</p>
              <p>${this.series.name + ': ' + this.y}</p>
            </div>
            `
          }
        },
        yAxis: {
          title: {
            text: nameUpperCase(this.sixPoint) + ' ' + nameUnit(this.sixPoint)
          },
          min: 0
        },
        xAxis: {
          type: 'datetime',
          title: {
            text: null
          },
          dateTimeLabelFormats: { // 根据当前间隔的最小值来取对应的配置
            millisecond: '%H:%M:%S.%L',
            second: '%H:%M:%S', // 秒
            minute: '%H:%M', // 分
            hour: '%H:%M', // 时
            day: '%m-%d', // 天
            week: '%m-%d', // 周
            month: '%Y-%m', // 月
            year: '%Y' // 年
          }
        },
        series: this.higchartsData
      })
    },
    // 更新配置
    upDateConfig() {
      this.Highcharts.update({
        title: {
          text: `${nameUpperCase(this.sixPoint)} 比较`
        },
        yAxis: {
          title: {
            text: nameUpperCase(this.sixPoint) + ' ' + nameUnit(this.sixPoint)
          },
          min: 0
        },
        series: this.higchartsData
      })
    }
  }
}

</script>
<style lang="scss">
.home {
  background-color: #fff;
  &-title {
    padding-left: 20px;
    height: 97px;
    &-h4 {
      height: 54px;
      line-height: 54px;
      font-size: 24px;
      font-weight: 600;
      color: #333333;
    }
    &-p {
      padding-top: 10px;
      height: 42px;
      font-size: 14px;
      color: #999999;
    }
  }
  &-wrap {
    position: absolute;
    top: 97px;
    left: 0;
    right: 0;
    bottom: 0;
    padding: 20px 20px 0;
    background-color: #F5F7FA;
  }
  &-amount {
    @include c3(display, flex);
    &-left {
      @include c3(flex, 1);
      @include c3(display, flex);
      @include c3(flex-wrap, wrap);
      &-item {
        @include c3(flex, 1 0 23.6%);
        width: 25%;
        padding-right: 20px;
        margin-bottom: 20px;
        border-radius: 4px 0 0 4px;
        overflow: hidden;
        &-p {
          padding-left: 20px;
          height: 100px;
          background-color: #fff;
          border-radius: 0 4px 4px 0;
          &-h6 {
            height: 50px;
            line-height: 50px;
            font-size: 14px;
            color: #333;
          }
          &-span {
            font-size: 30px;
            color: #0087FF;
            &-em {
              font-size: 14px;
              color: #333;
            }
          }
        }
      }
    }
    &-right {
      position: relative;
      overflow: hidden;
      width: 220px;
      height: 220px;
      border-radius: 4px;
      background-image: linear-gradient(to top, #534ADF, #1D9EEB);
      .swiper-slide {
        position: relative;
        padding: 37px;
        &-h6 {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 37px;
          line-height: 37px;
          font-size: 14px;
          color: #fff;
          text-align: center;
        }
        &-div {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          padding: 37px;
          text-align: center;
          &-p1 {
            padding: 32px 0 0;
            height: 78px;
            font-size: 36px;
            color: #fff;
            &-em {
              font-size: 14px;
            }
          }
          &-p2 {
            height: 22px;
            line-height: 22px;
            font-size: 12px;
            color: #fff;
          }
        }
      }
    }
  }
  &-linepic {
    height: 200px;
    border-radius: 4px;
    background-color: #fff;
    &-chart {
      padding-top: 40px;
      position: relative;
      &-sixMap.btns {
        top: 0;
        left: 10px;
        transform: translateX(0);
      }
      &-timeMap.btns {
        top: 0;
        left: 462px;
        transform: translateX(0);
      }
      &-picker {
        position: absolute !important;
        top: -52px;
        right: 56px;
        &.el-range-editor .el-range-input {
          width: 100px;
        }
        &.el-range-editor.el-input__inner {
          width: 270px;
        }
        .el-range-separator {
          width: 20px !important;
          padding: 0 !important;
        }
      }
      @media only screen and (min-width: 1424px) {
        &-picker {
          top: 1px;
          right: 382px;
          z-index: 2;
        }
      }
      &-dayMap.btns {
        top: 0;
        left: auto;
        right: 10px;
        transform: translateX(0);
      }
    }
  }
}
</style>
