<template>
  <div style="width: 100%; height: 100%;">
    <div id="echartsMap"></div>
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
import { debugMap, drawPolygon, AQIColor, windLevel } from '../../assets/js/common'
import moment from 'moment'

// 溯源跳转 全局公共方法
window.traceSkip = function (e) {
  console.log(e)
}
export default {
  data() {
    return {
      // 最终的数据格式
      dataAlarm: [
        {
          name: '报警',
          value: [114.73414, 36.912634],
          itemStyle: {color: 'red'},
          rest: {text: '这个玩意有问题了........asdasd.a啊d.as.', name: '邯郸.矿山', time: 1526706372828, aqi: -1, synthesis: 5.86, pm25: 70, pm10: 125, so2: 29, no2: 37, co: 20, o3: 66, t: 21, humidity: 61, weatherText: '阴转阵雨', windDirection: '东风', windSpeed: 9, windRank: 1}
        }
      ],
      dataState: [
        {
          name: '国',
          value: [114.628646, 36.885853],
          itemStyle: {color: 'green'},
          rest: {name: '邯郸.矿山', time: 1526706372828, aqi: -1, synthesis: 5.86, pm25: 70, pm10: 125, so2: 29, no2: 37, co: 20, o3: 66, temperature: 21, humidity: 61, weatherText: '阴转阵雨', windDirection: '东风', windSpeed: 9, windRank: 13}
        }
        // ,
        // { name: '菏泽', value: [114.73673, 36.83642] },
        // { name: '合肥', value: [114.7718, 36.752263] },
        // { name: '武汉', value: [114.596451, 36.691631] },
        // { name: '大庆', value: [114.429726, 36.795277] }
      ],
      // dataProvince: [
      //   {
      //     name: '省',
      //     value: [114.628646, 36.885853],
      //     itemStyle: {color: 'green'},
      //     rest: {name: '邯郸.矿山', time: 1526706372828, aqi: -1, synthesis: 5.86, pm25: 70, pm10: 125, so2: 29, no2: 37, co: 20, o3: 66, t: 21, humidity: 61, weatherText: '阴转阵雨', windDirection: '东风', windSpeed: 9, windRank: 1}
      //   }
      // ],
      // dataGridding: [
      //   {
      //     name: '网格',
      //     value: [114.628646, 36.885853],
      //     itemStyle: {color: 'green'},
      //     rest: {name: '邯郸.矿山', time: 1526706372828, aqi: -1, synthesis: 5.86, pm25: 70, pm10: 125, so2: 29, no2: 37, co: 20, o3: 66, t: 21, humidity: 61, weatherText: '阴转阵雨', windDirection: '东风', windSpeed: 9, windRank: 1}
      //   }
      // ]
      nowPoint: 'aqi'
    }
  },
  created() {
    this.$nextTick(this.initMap) // 保证dom已经更新
  },
  methods: {
    initMap() {
      const option = {
        bmap: {
          center: [114.624619, 36.799901], // 地图中心
          zoom: 12, // 地图级别
          roam: true, // 是否开启 可拖拽 可缩放
          mapStyle: { // 自定义样式
            styleJson: [{
              'featureType': 'all',
              'elementType': 'all',
              'stylers': {
                'color': '#313745',
                'hue': '#313745'
              }
            },
            {
              'featureType': 'building',
              'elementType': 'geometry',
              'stylers': {
                'color': '#2b2b2b',
                'visibility': 'off'
              }
            },
            {
              'featureType': 'highway',
              'elementType': 'all',
              'stylers': {
                'lightness': -42,
                'saturation': -91,
                'visibility': 'off'
              }
            },
            {
              'featureType': 'water',
              'elementType': 'all',
              'stylers': {
                'color': '#222931',
                'weight': '0.6',
                'lightness': 8,
                'saturation': 20
              }
            },
            {
              'featureType': 'green',
              'elementType': 'geometry',
              'stylers': {
                'color': '#1b1b1b',
                'visibility': 'off'
              }
            },
            {
              'featureType': 'water',
              'elementType': 'geometry',
              'stylers': {
                'color': '#181818'
              }
            },
            {
              'featureType': 'subway',
              'elementType': 'geometry.stroke',
              'stylers': {
                'color': '#181818'
              }
            },
            {
              'featureType': 'railway',
              'elementType': 'geometry',
              'stylers': {
                'lightness': -52
              }
            },
            {
              'featureType': 'all',
              'elementType': 'labels.text.stroke',
              'stylers': {
                'color': '#313131'
              }
            },
            {
              'featureType': 'all',
              'elementType': 'labels.text.fill',
              'stylers': {
                'color': '#ffffff'
              }
            },
            {
              'featureType': 'manmade',
              'elementType': 'geometry',
              'stylers': {
                'color': '#1b1b1b'
              }
            },
            {
              'featureType': 'local',
              'elementType': 'geometry',
              'stylers': {
                'lightness': -75,
                'saturation': -91
              }
            },
            {
              'featureType': 'subway',
              'elementType': 'geometry',
              'stylers': {
                'lightness': -65
              }
            },
            {
              'featureType': 'railway',
              'elementType': 'all',
              'stylers': {}
            },
            {
              'featureType': 'boundary',
              'elementType': 'geometry',
              'stylers': {
                'color': '#8b8787',
                'weight': '0.6',
                'lightness': -29
              }
            }
            ]}
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
            const d = p.data.rest
            // return '<button onclick="traceSkip(this)" data-aaa="' + 123 + '">事件触发？</button>'
            // 如果是报警类型单独展示一种弹窗
            return p.componentSubType === 'effectScatter' ? `
            报警的
            ` : `
            <div class="details">
              <div class="item1 i">
                <div class="name">${d.name}</div>
                <p class="time">${moment(d.time).format('YYYY-MM-DD HH:mm:ss')}</p>
              </div>
              <div class="item2 i">
                <div style="background-color: ${AQIColor('aqi', d.aqi)};">AQI</div>
                <p>${d.aqi}</p>
              </div>
              <div class="item2 i">
                <div style="background-color: ${AQIColor('aqi', d.synthesis)};">综合指数</div>
                <p>${d.synthesis}</p>
              </div>

              <div class="item6 i">
                <div style="background-color: ${AQIColor('pm25', d.pm25)};">PM2.5</div>
                <p>${d.pm25}</p>
              </div>
              <div class="item6 i">
                <div style="background-color: ${AQIColor('pm10', d.pm10)};">PM10</div>
                <p>${d.pm10}</p>
              </div>
              <div class="item6 i">
                <div style="background-color: ${AQIColor('so2', d.so2)};">SO2</div>
                <p>${d.so2}</p>
              </div>
              <div class="item6 i">
                <div style="background-color: ${AQIColor('no2', d.no2)};">NO2</div>
                <p>${d.no2}</p>
              </div>
              <div class="item6 i">
                <div style="background-color: ${AQIColor('co', d.co)};">CO</div>
                <p>${d.co}</p>
              </div>
              <div class="item6 i">
                <div style="background-color: ${AQIColor('o3', d.o3)};">O3</div>
                <p>${d.o3}</p>
              </div>

              <div class="item3 i">
                <p>温度: ${d.temperature}℃</p>
                <p>风向: ${d.windDirection}</p>
              </div>
              <div class="item3 i">
                <p>湿度: ${d.humidity}%</p>
                <p>风速: ${d.windSpeed}km/h</p>
              </div>
              <div class="item3 i">
                <p>天气: ${d.weatherText}</p>
                <p>风级: ${windLevel(d.windRank)}</p>
              </div>
            </div>
            `
          }
        },
        series: [{
          name: '报警', // 排名靠前
          type: 'effectScatter', // 扩散式的
          coordinateSystem: 'bmap',
          data: this.dataAlarm,
          symbolSize: 30,
          symbol: 'circle', // '针头水滴状' 'pin'  '正方形' 'rect' '钻石' 'diamond' '圆形' 'circle' '圆角矩形' 'roundRect' '正三角' 'triangle' '箭头' 'arrow'
          showEffectOn: 'render', // 配置何时显示特效 绘制完成后显示特效
          rippleEffect: {
            brushType: 'stroke' // 波纹的绘制方式 敲击式
          },
          hoverAnimation: true,
          // label: {
          //   normal: {
          //     color: '#000',
          //     show: true // 显示文本
          //   }
          // },
          zlevel: 1 // canvas的层级 覆盖在低层级的上面
        },
        {
          name: '国',
          type: 'scatter',
          coordinateSystem: 'bmap',
          data: this.dataState,
          symbolSize: (val, p) => { // 标记点的大小
            // console.log(p.data.rest[this.nowPoint])
            return p.data.rest[this.nowPoint] / 12 + 30
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
            // emphasis: {
            //   show: true // 提示文本是否显示
            // }
          }
        }]
      }
      const myChart = echarts.init($('#echartsMap')[0]) // 初始化实例 dom元素
      myChart.setOption(option) // 配置图表
      myChart.on('click', function (params) {
        console.log(params)
      })
      const map = myChart.getModel().getComponent('bmap').getBMap() // 在echarts与百度地图结合中 获取百度地图实例
      map.addControl(new BMap.MapTypeControl({ // 地图类型 控件
        mapTypes: [
          BMAP_NORMAL_MAP, // 正常
          BMAP_SATELLITE_MAP, // 卫星 （混合是子向）
          BMAP_HYBRID_MAP // 混合
        ],
        anchor: BMAP_ANCHOR_TOP_RIGHT
      }))
      // map.addEventListener('click', '.tt', e => { // 拖拽完成时触发 获取地图中心点
      //   console.log(1)
      // })
      debugMap(map)
      drawPolygon(map)
    }
  }
}

</script>
<style lang="scss">
@import '../../assets/scss/app';
#echartsMap {
  width: 100%;
  height: 100%;
}
// 弹框样式
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
