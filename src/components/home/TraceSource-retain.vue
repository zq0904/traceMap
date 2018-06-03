<template>
  <div class="traceSource_vessel" v-loading="loading">
    <div id="traceMap"></div>
  </div>
</template>
<script>
import $ from 'jquery'
import BMap from 'BMap'
import BMAP_ANCHOR_TOP_RIGHT from 'BMAP_ANCHOR_TOP_RIGHT'
import BMAP_NORMAL_MAP from 'BMAP_NORMAL_MAP'
import BMAP_SATELLITE_MAP from 'BMAP_SATELLITE_MAP'
import BMAP_HYBRID_MAP from 'BMAP_HYBRID_MAP'
import echarts from 'echarts'
import { debugMap, styleJson } from '../../lib/common'
import { drawPolygon } from '../../lib/config'
import Weather from '../common/Weather'

export default {
  components: {
    Weather
  },
  data() {
    return {
      loading: false
    }
  },
  created() {
    this.$nextTick(this.initMap)
  },
  methods: {
    initMap() {
      const option = {
        bmap: {
          center: [114.624619, 36.799901], // 地图中心
          zoom: 12, // 地图级别
          roam: true, // 是否开启 可拖拽 可缩放
          mapStyle: { // 自定义样式
            styleJson
          }
        },
        // title: {
        //   text: '全国主要城市空气质量 - 百度地图',
        //   subtext: '小标题', // 小标题
        //   sublink: 'http://www.baidu.com', // 小标题链接
        //   left: 'center' // 文本居中
        // },
        tooltip: { // 是否显示提示工具
          enterable: true, // 鼠标是否可进入提示框浮层中 如需详情内交互可设置
          formatter: p => { // 提示框浮层内容格式器
            console.log(p)
          }
        },
        series: [{
          name: '北京 Top10',
          type: 'lines',
          coordinateSystem: 'bmap',
          zlevel: 1,
          lineStyle: {
            normal: { color: '#a6c84c', width: 0, curveness: 0.2 }
          },
          effect: {
            color: '#fff',
            period: 6,
            show: true,
            symbolSize: 3,
            trailLength: 0.7
          },
          data: [{
            coords: [
              [114.509061, 36.814464],
              [114.694759, 36.783948]
            ],
            fromName: '北京',
            toName: '上海'
          }]
        }, {
          name: '北京 Top10',
          type: 'lines',
          coordinateSystem: 'bmap',
          symbolSize: 10,
          zlevel: 2,
          symbol: ['none', 'arrow'],
          lineStyle: {
            normal: {
              color: '#a6c84c',
              curveness: 0.2,
              opacity: 0.6,
              width: 1
            }
          },
          effect: {
            period: 6,
            show: true,
            symbol: 'path://M1705.06,1318.313v-89.254l-319.9-221.799l0.073-208.063c0.521-84.662-26.629-121.796-63.961-121.491c-37.332-0.305-64.482,36.829-63.961,121.491l0.073,208.063l-319.9,221.799v89.254l330.343-157.288l12.238,241.308l-134.449,92.931l0.531,42.034l175.125-42.917l175.125,42.917l0.531-42.034l-134.449-92.931l12.238-241.308L1705.06,1318.313z',
            symbolSize: 15,
            trailLength: 0
          },
          data: [{
            coords: [
              [114.509061, 36.814464],
              [114.694759, 36.783948]
            ],
            fromName: '北京',
            toName: '上海'
          }]
        }, {
          name: '北京 Top10',
          type: 'effectScatter',
          coordinateSystem: 'bmap',
          symbolSize: 10,
          zlevel: 2,
          itemStyle: {
            normal: {
              color: '#a6c84c'
            }
          },
          label: {
            normal: {
              formatter: '{b}',
              position: 'right',
              show: true
            }
          },
          rippleEffect: {
            brushType: 'stroke'
          },
          data: [{
            name: '上海',
            value: [114.694759, 36.783948, 95]
          }]
        }]
      }
      const myChart = echarts.init($('#traceMap')[0]) // 初始化实例 dom元素
      myChart.setOption(option) // 配置图表
      const map = myChart.getModel().getComponent('bmap').getBMap() // 在echarts与百度地图结合中 获取百度地图实例
      map.addControl(new BMap.MapTypeControl({ // 地图类型 控件
        anchor: BMAP_ANCHOR_TOP_RIGHT, // 配置位置
        mapTypes: [
          BMAP_NORMAL_MAP, // 正常
          BMAP_SATELLITE_MAP, // 卫星 （混合是子向）
          BMAP_HYBRID_MAP // 混合
        ]
      }))
      debugMap(map)
      drawPolygon(map)
    }
  }
}

</script>
<style lang="scss">
@import '../../assets/scss/app';
.traceSource_vessel {
  .btn-group {
    position: absolute;
    top: 7px;
    right: 100px;
    z-index: 10;
  }
  #traceMap {
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
  background-color: rgba(0, 0, 0, .7);
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
