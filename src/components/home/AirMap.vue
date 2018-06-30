<template>
  <div class="air_vessel" v-loading="loading">
    <Weather></Weather>
    <Btns @select-point="selectPoint"></Btns>
    <MapTypeControl :map="map"></MapTypeControl>
    <div id="echartsMap"></div>
    <!-- 必须保证nowDataIndex有了默认值 再去渲染AirPlay 才能变更后的dataLength作为初始值 -->
    <AirPlay
      v-show="false"
      v-if="nowDataIndex !== false"
      :dataLength="data.length"
      :nowDateTime="nowDateTime"
      @nowSelectIndex="nowSelectIndex"></AirPlay>
  </div>
</template>
<script>
import { mapGetters } from 'vuex'
import $ from 'jquery'
import echarts from 'echarts'
import { debugMap, styleJson, AQIColor, airDetails } from '../../lib/common'
import { mapCZ, drawPolygon } from '../../lib/config'
import Weather from '../common/Weather'
import Btns from '../common/Bths'
import MapTypeControl from '../common/MapTypeControl'
import AirPlay from '../common/AirPlay'
import Highcharts from 'highcharts'
import moment from 'moment'

export default {
  components: {
    Weather,
    Btns,
    MapTypeControl,
    AirPlay
  },
  data() {
    $('body').on('click', '#AirTooltipCollect', function() {
      console.log('点击了收藏', this)
    }).on('click', '#AirTooltipQuestion', function() {
      console.log('点击了疑问号', this)
    })
    return {
      loading: false,
      map: {}, // 百度地图实例对象
      bmapCZ: [mapCZ[0], mapCZ[1], mapCZ[2]], // bmap 中心点 和 缩放级别 实现持久
      myChart: {}, // echarts实例对象
      data: [ // 最终的数据格式
        // {
        //   alarm: [],
        //   state: [],
        //   province: [], // 暂缺 预留
        //   gridding: []
        // }
      ],
      nowDataIndex: false, // 当前应取data索引值 初次值fasle 默认值取data.length - 1
      nowPoint: 'aqi', // 当前选中按钮值
      nowDateTime: '', // 设置当前日期时间
      xAxisCategories: [], // AQI24小时 动态X轴
      xAxisTickPositions: [], // 动态X轴 根据索引那些显示
      recent24AQI: [] // highcharts渲染 最近24AQI
    }
  },
  watch: {
    nowPoint() {
      this.afreshMap()
    }
  },
  computed: {
    ...mapGetters({
      api: 'getApi'
    })
  },
  created() {
    this.request()
  },
  methods: {
    // 子组件通知 修改当前 应选中data索引
    nowSelectIndex(val) {
      this.nowDataIndex = val - 1
      this.afreshMap()
    },
    // btns选择按钮 point值
    selectPoint(val) { this.nowPoint = val },
    // 根据当前 对应索引nowDataIndex 及 nowPoint 去重新计算颜色 重新配置echarts
    afreshMap() {
      // 只计算当前nowDataIndex对应data颜色!!! 计算所有data 也是性能消耗
      for (let key in this.data[this.nowDataIndex]) {
        if (key === 'alarm') continue // 警报不计算颜色 初始红色 已经正确
        this.data[this.nowDataIndex][key].map(e => {
          const nowPoint = this.nowPoint === 'synthesis' ? 'aqi' : this.nowPoint // 综合指数 使用 aqi规则计算
          e.itemStyle.color = AQIColor(nowPoint, e.rest[nowPoint])
          return e
        })
      }
      this.setOption()
    },
    // 第一次请求数据 数据项中的itemStyle 需要计算一次
    async request() {
      this.loading = true
      const {data} = await this.$fetch({ url: this.api.AirMap })
      // console.log(data)
      this.loading = false

      // mock
      const dataMock = []
      const trueData = JSON.parse(JSON.stringify(data.result))
      for (let i = 1; i <= 36; i++) {
        data.result.state[0].aqi = i * 10
        data.result.state[0].co = i * 4
        dataMock.push(i === 36 ? trueData : JSON.parse(JSON.stringify(data.result)))
      }

      // 对所有数据 数据组装
      const middleData = []
      for (let item of dataMock) {
        const middleO = {} // { alarm: [], state: [], province: [], gridding: [] }
        for (let key in item) {
          middleO[key] = item[key].map(e => {
            const extraNowPoint = this.nowPoint === 'synthesis' ? 'aqi' : this.nowPoint // 综合指数 使用 aqi规则计算
            return {
              name: key,
              value: [e.lon, e.lat],
              itemStyle: { // 报警 只显示红色 其余
                color: key === 'alarm' ? 'red' : AQIColor(extraNowPoint, e[extraNowPoint])
              },
              rest: e, // 自定义信息
              aqi24: [{ // mock
                val: Number((Math.random() * 100).toFixed(0)),
                time: '2018-01-01 16:00:00'
              }, {
                val: 20,
                time: '2018-01-01 17:00:00'
              }, {
                val: -1,
                time: '2018-01-01 18:00:00'
              }, {
                val: 60,
                time: '2018-01-01 19:00:00'
              }, {
                val: 70,
                time: '2018-01-01 20:00:00'
              }, {
                val: 400,
                time: '2018-01-01 21:00:00'
              }, {
                val: 400,
                time: '2018-01-01 22:00:00'
              }, {
                val: 400,
                time: '2018-01-01 23:00:00'
              }, {
                val: 400,
                time: '2018-01-02 00:00:00'
              }, {
                val: 400,
                time: '2018-01-02 01:00:00'
              }, {
                val: 400,
                time: '2018-01-02 02:00:00'
              }, {
                val: 400,
                time: '2018-01-02 03:00:00'
              }, {
                val: 400,
                time: '2018-01-02 04:00:00'
              }, {
                val: 400,
                time: '2018-01-02 05:00:00'
              }, {
                val: 400,
                time: '2018-01-02 06:00:00'
              }, {
                val: 400,
                time: '2018-01-02 07:00:00'
              }, {
                val: 400,
                time: '2018-01-02 08:00:00'
              }, {
                val: 400,
                time: '2018-01-02 09:00:00'
              }, {
                val: 400,
                time: '2018-01-02 10:00:00'
              }, {
                val: 400,
                time: '2018-01-02 11:00:00'
              }, {
                val: 400,
                time: '2018-01-02 12:00:00'
              }, {
                val: 400,
                time: '2018-01-02 13:00:00'
              }, {
                val: 400,
                time: '2018-01-02 14:00:00'
              }, {
                val: 400,
                time: '2018-01-02 15:00:00'
              }]
            }
          })
        }
        middleData.push(middleO)
      }
      this.data = middleData // 保证轮询时 完全替换
      this.nowDateTime = this.data[this.data.length - 1].state[0].rest.time // 设置当前日期时间
      this.nowDataIndex = this.data.length - 1 // 设置默认选择 为数组最后一个
      this.$nextTick(this.initMap) // 保证dom已经更新
    },
    // 返回配置option
    deployOption () {
      return {
        bmap: {
          center: [this.bmapCZ[0], this.bmapCZ[1]], // 地图中心
          zoom: this.bmapCZ[2], // 地图级别
          roam: true, // 是否开启 可拖拽 可缩放
          mapStyle: { // 自定义样式
            styleJson
          }
        },
        tooltip: { // 是否显示提示工具
          triggerOn: 'click', // 点击触发
          confine: true, // 是否将 tooltip 框限制在图表的区域内
          // enterable: true, // 鼠标是否可进入提示框浮层中 如需详情内交互可设置
          backgroundColor: 'rgba(0, 0, 0, 0)',
          padding: 0, // 默认5
          formatter: p => { // 提示框浮层内容格式器
            // console.log(p)
            const d = p.data.rest
            // 如果是报警类型单独展示一种弹窗
            return p.componentSubType === 'effectScatter' ? `
            <div class="trace">
              <p class="text">${d.text}</p>
              <a href="#/traceSource?lon=${p.data.value[0]}&lat=${p.data.value[1]}" class="btn btn-danger">去溯源</a>
            </div>
            ` : airDetails(d)
          },
          position: (point, params, dom, rect, size) => { // 触发提示框显示后 设置提示框浮层位置
            // 参数（[525, 249]鼠标位置距view左上角距离, 和formatter参数信息一样相同, tooltip Dom对象, {x, y, width, height} 图形left top 宽高, view宽高 tooltip宽高）
            // console.log(point, params, dom, rect, size)
            if (params.componentSubType !== 'effectScatter') { // 除报警外 提示框显示后 初始化highcharts
              // console.log(params.data.aqi24)
              const xAxisCategories = [] // AQI24小时 动态X轴全部数值
              const xAxisTickPositions = [] // 动态X轴 根据索引那些显示
              const recent24AQI = [] // recent24AQI
              params.data.aqi24.forEach((e, i) => {
                const Hm = moment(e.time).format('HH:mm')
                switch (Hm) {
                  case '00:00':
                    xAxisCategories.push(moment(e.time).format('MM-DD')) // '06-01'
                    xAxisTickPositions.push(i)
                    break
                  case '08:00': case '16:00':
                    xAxisCategories.push(Hm) // '16:00'
                    xAxisTickPositions.push(i)
                    break
                  default:
                    xAxisCategories.push(Hm) // '01:00'
                }
                recent24AQI.push({
                  y: e.val,
                  color: AQIColor('aqi', e.val),
                  time: moment(e.time).format('YYYY-MM-DD HH:mm')
                })
              })
              this.xAxisCategories = xAxisCategories
              this.xAxisTickPositions = xAxisTickPositions
              this.recent24AQI = recent24AQI
              this.recent24()
            }
            return 'top' // 返回 {left: 10, top: 30}绝对的像素值 'inside'内部中心
          }
        },
        series: [{
          name: '报警', // 排名靠前
          type: 'effectScatter', // 扩散式的
          coordinateSystem: 'bmap',
          data: this.data[this.nowDataIndex].alarm,
          symbolSize: 25,
          symbol: 'circle', // '针头水滴状' 'pin'  '正方形' 'rect' '钻石' 'diamond' '圆形' 'circle' '圆角矩形' 'roundRect' '正三角' 'triangle' '箭头' 'arrow'
          showEffectOn: 'render', // 配置何时显示特效 绘制完成后显示特效
          rippleEffect: {
            brushType: 'stroke' // 波纹的绘制方式 敲击式
          },
          hoverAnimation: false,
          // label: {
          //   normal: {
          //     show: true // 显示文本
          //     color: '#000',
          //   }
          // },
          zlevel: 1 // canvas的层级 覆盖在低层级的上面
        },
        {
          name: '国',
          type: 'scatter',
          coordinateSystem: 'bmap',
          data: this.data[this.nowDataIndex].state,
          symbolSize: (val, p) => { // 标记点的大小
            // console.log(p.data.rest[this.nowPoint])
            return p.data.rest[this.nowPoint] === '-' ? 40 : p.data.rest[this.nowPoint] / 20 + 45
          },
          symbol: 'pin',
          label: {
            normal: {
              show: true, // 显示文本
              color: '#000',
              formatter: p => {
                // console.log(p)
                return p.data.rest[this.nowPoint]
              }
            }
          }
        },
        // { // 暂缺 预留
        //   name: '省',
        //   type: 'scatter',
        //   coordinateSystem: 'bmap',
        //   data: this.data[this.nowDataIndex].province,
        //   symbolSize: 25,
        //   symbol: 'rect',
        //   label: {
        //     normal: {
        //       show: true, // 显示文本
        //       color: '#000',
        //       formatter: p => {
        //         // console.log(p)
        //         return p.data.rest[this.nowPoint]
        //       }
        //     }
        //   }
        // },
        {
          name: '网格',
          type: 'scatter',
          coordinateSystem: 'bmap',
          data: this.data[this.nowDataIndex].gridding,
          symbolSize: 35,
          symbol: 'diamond',
          label: {
            normal: {
              show: true, // 显示文本
              color: '#000',
              formatter: p => {
                // console.log(p)
                return p.data.rest[this.nowPoint]
              }
            }
          }
        }]
      }
    },
    // 初始化 echarts 与 百度地图
    initMap() {
      const myChart = this.myChart = echarts.init($('#echartsMap')[0]) // 初始化实例 dom元素
      myChart.setOption(this.deployOption()) // 配置图表
      // myChart.on('click', function (params) {
      //   console.log(params)
      // })
      const map = this.map = myChart.getModel().getComponent('bmap').getBMap() // 在echarts与百度地图结合中 获取百度地图实例
      // 实现保持
      map.addEventListener('dragend', e => {
        const center = map.getCenter()
        this.bmapCZ[0] = center.lng
        this.bmapCZ[1] = center.lat
      })
      map.addEventListener('zoomend', e => {
        this.bmapCZ[2] = map.getZoom()
      })
      debugMap(map)
      drawPolygon(map)
    },
    // 重新配置echarts
    setOption() {
      this.myChart.setOption(this.deployOption())
    },
    // Highcharts渲染 最近24小时AQI
    recent24() {
      Highcharts.chart('recent24', {
        chart: {
          type: 'column',
          spacingRight: 15, // 图表底部边缘与内容的距离 默认15
          spacingBottom: 10,
          spacingLeft: 0
        },
        title: {
          text: '最近24小时AQI历史数据',
          style: {
            color: '#363636',
            fontSize: '14px'
          },
          margin: 10
        },
        credits: {
          enabled: false // 禁用版权信息
        },
        legend: {
          enabled: false // 禁用图例
        },
        xAxis: {
          type: 'category', // linear数值 logarithmic对数 datetime时间日期 category种类
          categories: this.xAxisCategories, // 类别
          tickPositions: this.xAxisTickPositions, // 刻度数组 显示那些X刻度值
          tickmarkPlacement: 'on' // 刻度线位置在中间显示
        },
        yAxis: {
          min: 0,
          tickAmount: 2, // 刻度总数
          title: {
            text: null
          }
        },
        tooltip: {
          useHTML: true, // 开启HTML模式(svg渲染) formatter支持所有的html
          formatter: function () { // 格式化函数
            // console.log(this) // this.point.自定义属性
            return `
            <div style="font-size: 12px;text-align: center;">
              <p style="height: 20px;">${this.point.time}</p>
              <p style="position: relative;height: 12px;line-height: 12px;">
                <span style="position: absolute;top: 50%;left: 5px;width: 6px;height: 6px;border-radius: 50%;transform: translateY(-50%);background-color: ${this.color};"></span>
                AQI数值: ${this.y}
              </p>
            </div>`
          }
        },
        series: [{
          data: this.recent24AQI
        }]
      })
    }
  }
}

</script>
<style lang="scss">
@import '../../assets/scss/app';
.air_vessel {
  #echartsMap {
    width: 100%;
    height: 100%;
  }
}
// 报警提示框
.trace {
  width: 400px;
  padding: 10px;
  text-align: center;
  background-color: rgba(0, 0, 0, .3);
  border-radius: 4px;
  .text {
    margin-bottom: 20px;
    line-height: 16px;
    white-space: normal;
  }
}
</style>
