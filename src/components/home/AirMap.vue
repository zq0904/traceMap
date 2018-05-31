<template>
  <div class="air_vessel" v-loading="loading">
    <div class="weather_wrap">
      <Weather></Weather>
    </div>
    <div class="btn-group">
      <router-link to="/air" class="btn btn-primary">地图</router-link>
      <router-link to="/air/list" class="btn btn-default">报表</router-link>
    </div>
    <div class="btn-group-vertical">
      <button type="button" class="btn"
      v-for="(item, index) in buttonMap"
      :key="index"
      @click="nowPoint = item.point"
      :class="nowPoint === item.point ? 'btn-primary' : 'btn-default'">{{item.text}}</button>
    </div>
    <div id="echartsMap"></div>
  </div>
</template>
<script>
import { mapGetters } from 'vuex'
import $ from 'jquery'
import BMap from 'BMap'
import BMAP_ANCHOR_TOP_RIGHT from 'BMAP_ANCHOR_TOP_RIGHT'
import BMAP_NORMAL_MAP from 'BMAP_NORMAL_MAP'
import BMAP_SATELLITE_MAP from 'BMAP_SATELLITE_MAP'
import BMAP_HYBRID_MAP from 'BMAP_HYBRID_MAP'
import echarts from 'echarts'
import { debugMap, styleJson, AQIColor, airDetails } from '../../lib/common'
import { drawPolygon } from '../../lib/config'
import Weather from '../common/Weather'
// 可以选中
// console.log($('body'))
// $('body').on('click', '.details', function() {
//   console.log(2)
// })

export default {
  components: {
    Weather
  },
  data() {
    return {
      loading: false,
      // 最终的数据格式
      data: {
        alarm: [],
        state: [],
        province: [],
        gridding: []
      },
      nowPoint: 'aqi',
      bmapCL: [114.624619, 36.799901, 12], // bmap中心点 和 缩放级别 实现持久
      buttonMap: [
        {text: 'AQI', point: 'aqi'},
        {text: 'PM2.5', point: 'pm25'},
        {text: 'PM10', point: 'pm10'},
        {text: 'SO2', point: 'so2'},
        {text: 'NO2', point: 'no2'},
        {text: 'CO', point: 'co'},
        {text: 'O3', point: 'o3'},
        {text: '综合指数', point: 'synthesis'}
      ]
    }
  },
  watch: {
    nowPoint() { // 监听当nowPoint 重新计算颜色 重新渲染
      for (let key in this.data) {
        if (key === 'alarm') continue // 警报不计算
        this.data[key].map(e => {
          e.itemStyle.color = AQIColor(this.nowPoint, e.rest[this.nowPoint])
          return e
        })
      }
      this.initMap()
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
    async request() { // 第一次请求数据 数据项中的itemStyle 需要计算一次
      this.loading = true
      const {data} = await this.$fetch({ url: this.api.AirMap })
      // console.log(data)
      this.loading = false
      // 数据组装
      for (let key in data.result) {
        this.data[key] = data.result[key].map(e => {
          return {
            name: key,
            value: [e.lon, e.lat],
            itemStyle: { // 报警 红色
              color: key === 'alarm' ? 'red' : AQIColor(this.nowPoint, e[this.nowPoint])
            },
            rest: e
          }
        })
      }
      this.$nextTick(this.initMap) // 保证dom已经更新
    },
    initMap() {
      const option = {
        bmap: {
          center: [this.bmapCL[0], this.bmapCL[1]], // 地图中心
          zoom: this.bmapCL[2], // 地图级别
          roam: true, // 是否开启 可拖拽 可缩放
          mapStyle: { // 自定义样式
            styleJson
          }
        },
        tooltip: { // 是否显示提示工具
          enterable: true, // 鼠标是否可进入提示框浮层中 如需详情内交互可设置
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
          }
        },
        series: [{
          name: '报警', // 排名靠前
          type: 'effectScatter', // 扩散式的
          coordinateSystem: 'bmap',
          data: this.data.alarm,
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
          data: this.data.state,
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
        {
          name: '省',
          type: 'scatter',
          coordinateSystem: 'bmap',
          data: this.data.province,
          symbolSize: 25,
          symbol: 'rect',
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
        {
          name: '网格',
          type: 'scatter',
          coordinateSystem: 'bmap',
          data: this.data.gridding,
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
      const myChart = echarts.init($('#echartsMap')[0]) // 初始化实例 dom元素
      myChart.setOption(option) // 配置图表
      // myChart.on('click', function (params) {
      //   console.log(params)
      // })
      const map = myChart.getModel().getComponent('bmap').getBMap() // 在echarts与百度地图结合中 获取百度地图实例
      map.addControl(new BMap.MapTypeControl({ // 地图类型 控件
        anchor: BMAP_ANCHOR_TOP_RIGHT,
        mapTypes: [
          BMAP_NORMAL_MAP, // 正常
          BMAP_SATELLITE_MAP, // 卫星 （混合是子向）
          BMAP_HYBRID_MAP // 混合
        ]
      }))
      // 实现保持
      map.addEventListener('dragend', e => {
        const center = map.getCenter()
        this.bmapCL[0] = center.lng
        this.bmapCL[1] = center.lat
      })
      map.addEventListener('zoomend', e => {
        this.bmapCL[2] = map.getZoom()
      })
      debugMap(map)
      drawPolygon(map)
    }
  }
}

</script>
<style lang="scss">
@import '../../assets/scss/app';
.air_vessel {
  position: relative;
  width: 100%;
  height: 100%;
  .weather_wrap {
    position: absolute;
    top: 10px;
    left: 10px;
    color: #fff;
    z-index: 10;
  }
  .btn-group {
    position: absolute;
    top: 7px;
    right: 100px;
    z-index: 10;
  }
  .btn-group-vertical {
    position: absolute;
    top: 45px;
    right: 7px;
    z-index: 10
  }
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
  .text {
    margin-bottom: 20px;
    line-height: 16px;
    white-space: normal;
  }
}
// 正常提示框
.details {
  @include c3(display, flex);
  @include c3(flex-wrap, wrap);
  @include c3(justify-content, space-between);
  @include c3(align-content, flex-start);
  width: 420px;
  padding: 20px;
  text-align: center;
  background-color: rgba(0,0,0,.7);
  color: #000;
  .i {
    height: 44px;
    margin-bottom: 8px;
    background-color: #EAEAEA;
  }
  .item1 {
    width: 188px;
    div {
      height: 27px;
      line-height: 27px;
      font-size: 21px;
    }
    p {
      height: 17px;
      line-height: 17px;
      font-size: 10px;
    }
  }
  .item2 {
    width: 92px;
    div {
      height: 20px;
      line-height: 20px;
      font-size: 10px;
    }
    p {
      height: 24px;
      line-height: 24px;
      font-size: 14px;
    }
  }
  .item6 {
    width: 60px;
    div {
      height: 20px;
      line-height: 20px;
      font-size: 10px;
    }
    p {
      height: 24px;
      line-height: 24px;
      font-size: 14px;
    }
  }
  .item3 {
    width: 124px;
    background-color: #F8F8F8;
    margin-bottom: 0px;
    p {
      height: 22px;
      line-height: 22px;
      font-size: 14px;
    }
  }
}
</style>
