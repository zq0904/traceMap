<template>
  <div clsas="test" style="background-color: red;">
    <div style="margin-bottom:10px;">
    </div>
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
            v-if="val > AirPlayData.length"
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
          :max="AirPlayData.length"
          :style="`width: ${AirPlayWidth}`"
          @change="setIntervalStartVal = AirPlayValue"
          ></el-slider>
        <div class="AirPlay-date-time pull-left">2018-06-09(周6)</div>
        <div class="AirPlay-date-time pull-right">2018-06-10(周日)</div>
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
    <!-- <div class="air-tooltip">
      <h4 class="air-tooltip-h4">
        邯郸-啥黄金时代中学
        <span class="air-tooltip-time">2018-06-10 18:00:00</span>
        <em class="air-tooltip-em iconfont icon-wenhao"></em>
        <em class="air-tooltip-em iconfont icon-shoucangxing2 on"></em>
      </h4>
      <table class="air-tooltip-table">
        <tr class="air-tooltip-table-tr"><td class="air-tooltip-table-td50" colspan="3">AQI</td><td class="air-tooltip-table-td50" colspan="3">综合指数</td></tr>
        <tr class="air-tooltip-table-tr"><td class="air-tooltip-table-td50" colspan="3">50</td><td class="air-tooltip-table-td50" colspan="3">2.13</td></tr>
        <tr class="air-tooltip-table-tr"><td class="rgb-204-204-204">PM2.5</td><td>PM10</td><td>SO<sub>2</sub></td><td>NO<sub>2</sub></td><td>CO</td><td>O<sub>3</sub></td></tr>
        <tr class="air-tooltip-table-tr tooltip-most-o3"><td>10</td><td>10</td><td>10</td><td>10</td><td>3</td><td>173</td></tr>
      </table>
      <div class="tooltip-weather">
        <div class="tooltip-weather-item">
          <p class="tooltip-weather-item-p">温度: 24°</p>
          <p class="tooltip-weather-item-p">风向: 西北风</p>
        </div>
        <div class="tooltip-weather-item">
          <p class="tooltip-weather-item-p">湿度: 44%</p>
          <p class="tooltip-weather-item-p">风速: 13m/s</p>
        </div>
        <div class="tooltip-weather-item">
          <p class="tooltip-weather-item-p">天气: 多云</p>
          <p class="tooltip-weather-item-p">风级: 3级</p>
        </div>
      </div>
      <div id="recent24" style="height: 110px;"></div>
    </div> -->
    <!-- <input id="input" :pass="123" type="text" v-model="test.testInfo.a"> -->
    <!-- <ul>
      <li v-for="item in test.testArr" :key="item">{{ item }}</li>
    </ul>
    <button @click="splice">splice testArr</button> -->
    <!-- <form id="root" @submit.prevent="submit">
      <input type="text" reg="registerPwd" pass="pass"><br>
      <input type="text" reg="bankCard,identity"><br>
      <input type="text" reg="site"><br>
      <span reg="loginPwd">123456</span><br>
      <p class="pp" reg="loginPwd">12345</p>
      <button>提交表单vuex regex校验</button>
    </form> -->
    <!-- <img src="../assets/images/Aimer.jpg" height="50" width="50" alt="">
    <p>{{ message }}</p>
    <p>number:{{ number }}</p>
    <p>store: {{test}}</p>
    <p>getTestArrLength: {{getTestArrLength}}</p>
    <button @click="increment">action</button>
    <p>
      <span class="glyphicon glyphicon-user"></span>
      <span class="el-icon-success"></span>
    </p> -->
    <!-- 测试bootstrap -->
    <!-- <ul class="pagination">
      <li><a href="#">1</a></li>
      <li><a href="#">2</a></li>
      <li><a href="#">3</a></li>
      <li><a href="#">4</a></li>
      <li><a href="#">5</a></li>
    </ul> -->
    <!-- 测试element-ui -->
    <!-- <el-progress type="circle" :percentage="number" status="success"></el-progress> -->
    <!-- D3测试 -->
    <svg id="fillgauge" width="250" height="250"></svg>
    <!-- highcharts测试 -->
    <div id="container"></div>
    <div class="sourceMap-infoWindow">
      <h4 class="sourceMap-infoWindow-title">基本信息</h4>
      <div class="row">
        <div class="col-sm-12"><lable>名称 :</lable><span>河工034</span></div>
      </div>
      <div class="row">
        <div class="col-sm-6"><lable>位置 :</lable><span>刘刘刘刘刘刘刘刘刘刘刘刘</span></div>
        <div class="col-sm-6"><lable>污染源类型 :</lable><span>刘刘刘刘刘刘刘刘刘刘刘刘</span></div>
      </div>
      <div class="row">
        <div class="col-sm-6"><lable>经度 :</lable><span>36.6</span></div>
        <div class="col-sm-6"><lable>纬度 :</lable><span>136.555</span></div>
      </div>
      <div class="row">
        <div class="col-sm-6"><lable>开始时间 :</lable><span>2018-06-12</span></div>
        <div class="col-sm-6"><lable>结束时间 :</lable><span>- - - -</span></div>
      </div>
      <div class="row">
        <div class="col-sm-12"><lable>处理状态 :</lable><span>未处理/疑似污染源等信息</span></div>
      </div>
      <div class="row">
        <div class="col-sm-6"><lable>负责人 :</lable><span>张三</span></div>
        <div class="col-sm-6"><lable>负责主体 :</lable><span>区居委会</span></div>
      </div>
      <h4 class="sourceMap-infoWindow-title">其他信息</h4>
      <div class="row">
        <div class="col-sm-12"><lable>联系电话 :</lable><span>15000 0000 0000 / 10154654565</span></div>
      </div>
      <div class="row">
        <div class="col-sm-6"><lable>污染面积 :</lable><span>3000平方米</span></div>
        <div class="col-sm-6"><lable>位置信息补充 :</lable><span>集体的位置信息</span></div></div>
      <div class="row">
        <div class="col-sm-12"><lable>处理意见 :</lable><span>增加湿扫，一直燕莎，。。。</span></div>
      </div>
      <div class="row">
        <div class="col-sm-6"><lable>处理前照片 :</lable><span></span></div>
        <div class="col-sm-6"><lable>处理后照片 :</lable><span></span></div>
      </div>
      <div class="row">
        <div class="col-sm-6">
          <img src="https://s1.ax1x.com/2018/06/26/PCqUyt.png">
          <img src="http://p1.pstatp.com/large/435d000085555bd8de10">
        </div>
        <div class="col-sm-6">
          <div class="mock-img"></div>
        </div>
      </div>
      <div class="row designate">
        <span>指派</span>
      </div>
    </div>
    <div style="height:20px"></div>
  </div>
</template>
<script>
// import _ from 'lodash'
// import $ from 'jquery'
// import moment from 'moment'
// import zepto from 'zepto'
// import { mapState, mapGetters, mapActions } from 'vuex'
import { mapGetters, mapActions } from 'vuex'
// import { isMobile } from '../lib/until'
// import { Base64 } from 'js-base64'
import { liquidFillGaugeDefaultSettings, loadLiquidFillGauge } from '../lib/liquidFillGauge'
import Highcharts from 'highcharts'
// import { AQIlevel } from '../lib/common'

export default {
  data() {
    return {
      AirPlayMax: 48, // 最大值
      AirPlayValue: 24, // 当前值
      AirPlayData: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 1, 2, 3, 4, 5], // 29
      AirPlayId: false, // 定时器ID
      setIntervalStartVal: 1, // 开启定时器 起始值
      // message: '测试信息',
      // number: 0,
      config: {} // D3 配置项
    }
  },
  watch: {
    AirPlayValue(val) {
      if (val < 1) { // 保证0取不到
        this.AirPlayValue = 1
        return false
      }
      // 切换数据代码
      console.log('当前使用的数据: ' + this.AirPlayData[val - 1])
    }
  },
  computed: {
    // 动态计算宽度 限定范围
    AirPlayWidth() {
      for (let i = 1; i <= this.AirPlayMax; i++) {
        if (i > this.AirPlayData.length) {
          return (i - 1) * 100 / this.AirPlayMax + '%'
        }
      }
    },
    // 测试 state
    // ...mapState([
    //   'test'
    // ]),
    // ...mapGetters([
    //   'getTestArrLength'
    // ])
    ...mapGetters({
      test: 'getTest',
      regex: 'getRegex'
    })
  },
  async created() {
    // // 测试 promis
    // console.log(await this.p())
    // // 测试lodash
    // console.log(_.defaults({ 'a': 1 }, { 'a': 3, 'b': 2 }))
    // // 测试 $
    // console.log($('body'))
    // // 测试moment
    // console.log(moment().format('YYYY-MM-DD HH:mm:ss'))
    // // 测试zepto
    // console.log(zepto('body'))
    // // 测试element-ui
    // setInterval(this.add, 100)
    // // 测试代理 测试$http
    // const data = await this.$http.get('/proxy/topics')
    // console.log(data)
    // 测试自己封装的$fetch
    // const {data} = await this.$fetch({
    //   type: 'post',
    //   url: '/cc/data/airList',
    //   data: {
    //     a: 'asd',
    //     b: 'asdasd'
    //   }
    // })
    // console.log(data)
    // const {data: name} = await this.$http.get('/proxy/airMap')
    // console.log(name)
    // console.log(this.test)
    // setTimeout(() => this.mergeTest({
    //   testArr: [6, 6, 6, 8], // 数组 merge按照 索引
    //   testInfo: {
    //     a: 2,
    //     b: '测试1'
    //   },
    //   a: 1
    // }), 5000)
    // this.replaceTestArr({ a: 1 })
    // // 测试safari兼容无痕模式
    // this.sessionSetItem('bbb', 'qw1e32qw12e')
    // this.sessionSetItem('aaa', 'aaaaa')
    // // this.sessionRemoveItem('bbb')
    // this.sessionClear()
    // console.log(this.sessionGetItem('bbb'))
    // console.log(this.sessionGetItem('aaa'))
    // // 测试 Base64
    // console.log(Base64.encode('asdsa'))
    // console.log(Base64.decode('YXNkc2E='))
    // 测试是否是 手机
    // this.$nextTick(() => {
    //   window.alert(isMobile())
    // })
    this.$nextTick(() => {
      this.initD3()
      this.initHigcharts()
      // this.recent24()
    })
  },
  methods: {
    playStart() {
      if (this.AirPlayId) {
        clearInterval(this.AirPlayId)
        this.AirPlayId = false
        --this.setIntervalStartVal
      } else {
        const handlerSetInterval = () => {
          this.AirPlayValue = this.setIntervalStartVal
          if (++this.setIntervalStartVal > this.AirPlayData.length) {
            this.setIntervalStartVal = 1
          }
        }
        handlerSetInterval() // 初始执行一次
        this.AirPlayId = setInterval(handlerSetInterval, 1000)
      }
    },
    ...mapActions([
      'mergeTest',
      'replaceTestArr',
      'spliceTestArr'
    ]),
    initD3() {
      this.config = liquidFillGaugeDefaultSettings()
      this.config.minValue = 0 // 测量最小值
      this.config.maxValue = 200 // 测量最大值
      // this.config.circleThickness = 0.05 // 外圆的厚度是半径的百分数
      this.config.circleFillGap = 0.01 // 外圈和波圈之间的间隙大小是外圆半径的百分比
      // this.config.circleColor = '#178BCA' // 外圆的颜色
      // this.config.waveHeight = 0.05 // 波高是波圆半径的百分数
      // this.config.waveCount = 1 // 波圈每宽度的全波数
      // this.config.waveRiseTime = 1000 // 波从0上升到它的最终高度的毫秒数
      this.config.waveAnimateTime = 1000 // 整个波进入波圈的毫秒数
      // this.config.waveRise = true // 控制如果波从0上升到它的高度，或者从它的高度开始
      // this.config.waveHeightScaling = true
      // this.config.waveAnimate = true // 控制波浪滚动或静止
      // this.config.waveColor = '#178BCA' // 填充波的颜色
      // this.config.waveOffset = 0 // 初始偏移量。0 =没有抵消。1 =一个全波的偏移。
      this.config.textVertPosition = 0.5 // 文本距离底部百分比
      this.config.textSize = 1 // 在波圈中显示的文本的相对高度。1 = 50%
      // this.config.valueCountUp = true // 如果是true，则显示的值将从0计数到加载后的最终值。如果是false，则显示最终值。
      this.config.displayPercent = false // 如果是true，则在值之后显示%符号
      // this.config.textColor = '#045681' // 当波不重叠时，值文本的颜色
      // this.config.waveTextColor = '#A4DBf8' // 当波重叠时，数值文本的颜色
      // 自定义
      this.config.lineWidth = 3 // 线的宽度
      // this.config.lineInterval = 5 // 虚线间隔
      this.config.lineColor = '#ff4444' // 线颜色
      this.config.lineText = '警戒线文本1' // 警戒线文本
      this.config.lineTextSize = 16 // 警戒线文本大小
      this.config.lineTextColor = '#ff4444' // 警戒线文本颜色
      loadLiquidFillGauge('fillgauge', 100, 100, this.config) // svgID, 当前值, 考核值, 配置项
    },
    initHigcharts() {
      Highcharts.chart('container', {
        chart: {
          type: 'spline'
        },
        title: {
          text: '某地积雪厚度监测'
        },
        subtitle: {
          text: '非规律性时间内的变化'
        },
        xAxis: {
          type: 'datetime',
          title: {
            text: null
          }
        },
        yAxis: {
          title: {
            text: '积雪 厚度 (m)'
          },
          min: 0
        },
        tooltip: {
          headerFormat: '<b>{series.name}</b><br>',
          pointFormat: '{point.x:%e. %b}: {point.y:.2f} m'
        },
        plotOptions: {
          spline: {
            marker: {
              enabled: true
            }
          }
        },
        series: [{
          name: '2007-2008 冬',
          // Define the data points. All series have a dummy year
          // of 1970/71 in order to be compared on the same x axis. Note
          // that in JavaScript, months start at 0 for January, 1 for February etc.
          data: [
            [Date.UTC(1970, 9, 27), 0],
            [Date.UTC(1970, 10, 10), 0.6],
            [Date.UTC(1970, 10, 18), 0.7],
            [Date.UTC(1970, 11, 2), 0.8],
            [Date.UTC(1970, 11, 9), 0.6],
            [Date.UTC(1970, 11, 16), 0.6],
            [Date.UTC(1970, 11, 28), 0.67],
            [Date.UTC(1971, 0, 1), 0.81],
            [Date.UTC(1971, 0, 8), 0.78],
            [Date.UTC(1971, 0, 12), 0.98],
            [Date.UTC(1971, 0, 27), 1.84],
            [Date.UTC(1971, 1, 10), 1.80],
            [Date.UTC(1971, 1, 18), 1.80],
            [Date.UTC(1971, 1, 24), 1.92],
            [Date.UTC(1971, 2, 4), 2.49],
            [Date.UTC(1971, 2, 11), 2.79],
            [Date.UTC(1971, 2, 15), 2.73],
            [Date.UTC(1971, 2, 25), 2.61],
            [Date.UTC(1971, 3, 2), 2.76],
            [Date.UTC(1971, 3, 6), 2.82],
            [Date.UTC(1971, 3, 13), 2.8],
            [Date.UTC(1971, 4, 3), 2.1],
            [Date.UTC(1971, 4, 26), 1.1],
            [Date.UTC(1971, 5, 9), 0.25],
            [Date.UTC(1971, 5, 12), 0]
          ]
        }, {
          name: '2008-2009 冬',
          data: [
            [Date.UTC(1970, 9, 18), 0],
            [Date.UTC(1970, 9, 26), 0.2],
            [Date.UTC(1970, 11, 1), 0.47],
            [Date.UTC(1970, 11, 11), 0.55],
            [Date.UTC(1970, 11, 25), 1.38],
            [Date.UTC(1971, 0, 8), 1.38],
            [Date.UTC(1971, 0, 15), 1.38],
            [Date.UTC(1971, 1, 1), 1.38],
            [Date.UTC(1971, 1, 8), 1.48],
            [Date.UTC(1971, 1, 21), 1.5],
            [Date.UTC(1971, 2, 12), 1.89],
            [Date.UTC(1971, 2, 25), 2.0],
            [Date.UTC(1971, 3, 4), 1.94],
            [Date.UTC(1971, 3, 9), 1.91],
            [Date.UTC(1971, 3, 13), 1.75],
            [Date.UTC(1971, 3, 19), 1.6],
            [Date.UTC(1971, 4, 25), 0.6],
            [Date.UTC(1971, 4, 31), 0.35],
            [Date.UTC(1971, 5, 7), 0]
          ]
        }, {
          name: '2009-2010 冬',
          data: [
            [Date.UTC(1970, 9, 9), 0],
            [Date.UTC(1970, 9, 14), 0.15],
            [Date.UTC(1970, 10, 28), 0.35],
            [Date.UTC(1970, 11, 12), 0.46],
            [Date.UTC(1971, 0, 1), 0.59],
            [Date.UTC(1971, 0, 24), 0.58],
            [Date.UTC(1971, 1, 1), 0.62],
            [Date.UTC(1971, 1, 7), 0.65],
            [Date.UTC(1971, 1, 23), 0.77],
            [Date.UTC(1971, 2, 8), 0.77],
            [Date.UTC(1971, 2, 14), 0.79],
            [Date.UTC(1971, 2, 24), 0.86],
            [Date.UTC(1971, 3, 4), 0.8],
            [Date.UTC(1971, 3, 18), 0.94],
            [Date.UTC(1971, 3, 24), 0.9],
            [Date.UTC(1971, 4, 16), 0.39],
            [Date.UTC(1971, 4, 21), 0]
          ]
        }]
      })
    }
    // recent24() {
    //   Highcharts.chart($('#recent24')[0], {
    //     chart: {
    //       type: 'column',
    //       spacingRight: 15, // 图表底部边缘与内容的距离 默认15
    //       spacingBottom: 10,
    //       spacingLeft: 0
    //     },
    //     title: {
    //       text: '最近24小时AQI历史数据',
    //       style: {
    //         color: '#363636',
    //         fontSize: '14px'
    //       },
    //       margin: 10
    //     },
    //     credits: {
    //       enabled: false // 禁用版权信息
    //     },
    //     legend: {
    //       enabled: false // 禁用图例
    //     },
    //     xAxis: {
    //       type: 'category', // linear数值 logarithmic对数 datetime时间日期 category种类
    //       categories: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', '13', '14', '06-11', '16', '17', '18', '19', '8:00', '21', '22', '23', '16:00'], // 类别
    //       tickPositions: [14, 19, 23], // 刻度数组 显示那些X刻度值
    //       tickmarkPlacement: 'on' // 刻度线位置在中间显示
    //     },
    //     yAxis: {
    //       min: 0,
    //       tickAmount: 2, // 刻度总数
    //       title: {
    //         text: null
    //       }
    //     },
    //     tooltip: {
    //       useHTML: true, // 开启HTML模式(svg渲染) formatter支持所有的html
    //       formatter: function () { // 格式化函数
    //         console.log(this) // this.point.自定义属性
    //         // return this.x + '<br/>' + this.y
    //         return `
    //         <div style="font-size: 12px;text-align: center;">
    //           <p style="height: 20px;">2018-06-11 05:00</p>
    //           <p style="position: relative;height: 12px;line-height: 12px;">
    //             <span style="position: absolute;top: 50%;left: 5px;width: 6px;height: 6px;border-radius: 50%;transform: translateY(-50%);background-color: ${this.color};"></span>
    //             AQI数值: ${this.y}
    //           </p>
    //         </div>`
    //       }
    //     },
    //     series: [{
    //       data: [
    //         {
    //           y: 400,
    //           color: '#EBDD53'
    //         }, 200, 200, 200, 200, 200, 200, 200, 200, 200, 200, 200, 200, 200, 200, 200, 200, 200, 200, 200, 200, 200, 200, 200
    //       ]
    //     }]
    //   })
    // }
    // submit() {
    //   // 截取手机号
    //   // console.log('12345678901'.match(this.$store.state.regex.echoPhone))
    //   const checkInfo = this.check('#root', 'span, .pp')
    //   if (checkInfo) {
    //     this.$message(checkInfo)
    //     return
    //   }
    //   console.log('校验通过走请求')
    // }
    // splice() {
    //   this.replaceTestArr([5, 4, 3])
    // }
    // add() {
    //   if (++this.number === 101) {
    //     this.number = 0
    //   }
    // },
    // // 测试promis
    // async p() {
    //   return 1
    // }
    // increment() {
    //   this.$store.dispatch('INCREMENT')
    // }
    // // 测试 actions
    // ...mapActions([
    //   'increment'
    // ])
  }
}

</script>
<style lang='scss'>
/*测试scss*/
@import '../assets/scss/app';
  .sourceMap-infoWindow {
    position: relative;
    background-color: #fff;
    width: 506px;
    padding: 0 9px;
    border-top: 4px solid #0087FF;
    border-radius: 5px;
    &-title {
      position: relative;
      height: 36px;
      padding: 10px 0 10px 12px;
      font-size: 16px;
      color: #333333;
      &::before {
        position: absolute;
        top: 10px;
        left: 0;
        content: '';
        height: 16px;
        border-left: 2px solid #0087FF;
      }
    }
    .row {
      margin: 0;
      line-height: 24px;
      .col-sm-6, .col-sm-12 {
        padding: 0;
        padding-right: 9px;
        font-size: 14px;
        lable {
          float: left;
          padding-right: 5px;
          color: #A8A8A8;
        }
        span {
          display: block;
          overflow: hidden;
          color: #333333;
        }
        img {
          float: left;
          width: 112.5px;
          height: 110px;
          margin-top: 10px;
          &:first-of-type {
            margin-right: 9px;
          }
        }
        .mock-img {
          margin-top: 10px;
          position: relative;
          width: 112.5px;
          height: 110px;
          border: 1px solid #E6E6E6;
          background-color: #F3F9FF;
          &::before {
            content: '';
            width: 40px;
            height: 2px;
            background-color: #D6D8DA;
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate3d(-50%, -50%, 0);
          }
          &::after {
            content: '';
            height: 40px;
            width: 2px;
            background-color: #D6D8DA;
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate3d(-50%, -50%, 0);
          }
        }
      }
    }
    .designate {
      position: relative;
      height: 77px;
      line-height: 77px;
      text-align: center;
      span {
        position: absolute;
        top: 50%;
        left: 50%;
        width: 100px;
        height: 36px;
        line-height: 36px;
        cursor: pointer;
        font-size: 18px;
        color: #007FF5;
        border: 1px solid #007FF5;
        background-color: #fff;
        transform: translate3d(-50%, -50%, 0);
        border-radius: 5px;
        &:active {
          background-color: #007FF5;
          color: #fff;
        }
      }
    }
    &::before {
      position: absolute;
      content: '';
      left: 50%;
      bottom: -16px;
      transform: translateX(-50%);
      border: 8px solid transparent;
      border-left: 9px solid transparent;
      border-right: 9px solid transparent;
      border-top-color: #fff;
    }
  }
  // 注释 /**/ //
  // @import '../assets/css/test'; // 导入_.scss文件 不需写后缀 _test.scss中的变量及样式都会引入这里
  // 使用$声明变量 具有块级作用域(可以使用 $fz: 10px !global; 直接提升至全局)
  // 可以被覆盖 不可以跟数字 $1 注意赋值一定要使用 : 没有用 = 一说
  // 变量声明默认值 在后面加 !default 多个默认值 后面覆盖前面 一旦有值去对应的值
  // 多值变量 一维 空格   二维 , 或者 ()
  // list类型 $list: 1px 2px 3px; 单独使用$list 取第一个nth($list, 1)  求长度length($list) 融合join($list,[4px, 5px]) -> 1px 2px 3px 4px 5px
  // 追加append($list, [1px]) -> 1px 2px 3px [1px]
  // 二维list $list: 1px 2px, 3px;   nth($list, 1) -> 1px 2px
  // 二维list $list: (1px 2px) 3px;  nth($list, 2) -> 3px
  // map类型
  // $map: (h1: 3em, h2: 2em); 取值 map-get($map,h2) -> 2em
  // @at-root { .a{} } .a这个选择器直接跳到最外层
  // 变量的填充使用 #{$a}
  // scss具有计算功能 变量等都可以参与运算 100px+10 单位只写一个
  // $gray: #ccc !default;  color: lighten($gray, 10%); 在原来的颜色基础上减淡  darken($gray, 20%); 加深
  // 属性可以嵌套写法
  // 占位符选择器 %a{} 如果没有使用 @extend %a; 则浏览器不会渲染 使用了才会渲染
  // 继承 @extend .a; 继承.a的类样式
  // @xixin a($p:1px) {} 类似函数 写兼容等 参数必须 以$开始 可以设置默认值  使用 @include a(100px) 如果有单位必须传入
  // 条件语句 @if 1 != 0 { } @else if 1 != 3 { } @else { } 三元表达式 注意此if必须紧跟() line-height: if(false, 1, 2);
  // 遍历 @for $i from 1 through 10 {width: $i + 'px'}  @for $i from 1 to 10 { width: $i + 'px' }   through关键字包括结尾 to不包括
  // @while 直到不满足条件退出循环
  // $i: 1;
  // @while $i < 3 {
  //   .a-#{$i}{ width: $i + 'px'; }
  //   $i: $i + 1;
  // }
  // @each 循环 list类型 和 map类型
  // 循环一维list @each $i in 1, 2, 3 { }
  // 循环三维list @each $i, $ii, $iii in (1, 2, 3),(4, 5, 6) { }   $i取 1 4 $ii取 2 5 $iii取 3 6
  // 循环map      @each $key, $val in (h1: 2, h2: 4) { }
  // 函数
  // @function number($p) { @return $p + 1; }  使用 font-size: number(1) + 'px';

// .air-tooltip {
//   position: relative;
//   width: 505px;
//   padding: 0 10px;
//   border-top: 4px solid #0087FF;
//   border-radius: 5px;
//   background-color: #fff;
//   &::before {
//     position: absolute;
//     content: '';
//     left: 50%;
//     bottom: -16px;
//     transform: translateX(-50%);
//     border: 8px solid transparent;
//     border-left: 9px solid transparent;
//     border-right: 9px solid transparent;
//     border-top-color: #fff;
//   }
//   &-h4 {
//     height: 36px;
//     line-height: 36px;
//     font-size: 16px;
//   }
//   &-time {
//     padding-left: 10px;
//     font-size: 12px;
//     color: #7C7C7C;
//   }
//   &-em {
//     float: right;
//     &.icon-wenhao {
//       margin-left: 15px;
//       font-size: 19px;
//     }
//     &.icon-shoucangxing2 {
//       font-size: 18px;
//       color: #CCCCCC;
//       &.on {
//         color: #FF0000;
//       }
//     }
//   }
//   &-table {
//     width: 485px;
//     text-align: center;
//     border-collapse: collapse;
//     border: 1px solid #E6E6E6;
//     &-tr {
//       height: 30px;
//       line-height: 30px;
//       border: 1px solid #E6E6E6;
//     }
//     td {
//       position: relative;
//       width: 16.6666666%;
//       border: 1px solid #E6E6E6;
//       font-size: 14px;
//     }
//     &-td50 {
//       width: 50%;
//     }
//   }
//   // 首要污染物
//   .tooltip-most {
//     &-pm25 {
//       td:nth-of-type(1)::before { content: ''; width: 8px; height: 8px; border-radius: 50%; background-color: red; position: absolute; top: 50%; left: 17px; transform: translateY(-50%); }
//     }
//     &-pm10 {
//       td:nth-of-type(2)::before { content: ''; width: 8px; height: 8px; border-radius: 50%; background-color: red; position: absolute; top: 50%; left: 17px; transform: translateY(-50%); }
//     }
//     &-so2 {
//       td:nth-of-type(3)::before { content: ''; width: 8px; height: 8px; border-radius: 50%; background-color: red; position: absolute; top: 50%; left: 17px; transform: translateY(-50%); }
//     }
//     &-no2 {
//       td:nth-of-type(4)::before { content: ''; width: 8px; height: 8px; border-radius: 50%; background-color: red; position: absolute; top: 50%; left: 17px; transform: translateY(-50%); }
//     }
//     &-co {
//       td:nth-of-type(5)::before { content: ''; width: 8px; height: 8px; border-radius: 50%; background-color: red; position: absolute; top: 50%; left: 17px; transform: translateY(-50%); }
//     }
//     &-o3 {
//       td:nth-of-type(6)::before { content: ''; width: 8px; height: 8px; border-radius: 50%; background-color: red; position: absolute; top: 50%; left: 17px; transform: translateY(-50%); }
//     }
//   }
//   .tooltip-weather {
//     display: flex;
//     justify-content: space-between;
//     height: 54px;
//     padding: 10px 18px;
//     font-size: 14px;
//     color: #999999;
//     &-item {
//       &-p {
//         height: 17px;
//         line-height: 17px;
//       }
//     }
//   }
// }
.AirPlay {
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
