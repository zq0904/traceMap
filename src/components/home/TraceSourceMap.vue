<template>
  <div class="traceSource_vessel" v-loading="loading">
    <Weather></Weather>
    <MapTypeControl :map="map"></MapTypeControl>
    <div id="traceSourceMap"></div>
  </div>
</template>
<script>
import { mapGetters } from 'vuex'
import BMap from 'BMap'
import { debugMap, styleJson, ComplexCustomOverlay, airDetails, pollutionInfoWindow } from '../../lib/common'
import { mapCZ, drawPolygon } from '../../lib/config'
import Weather from '../common/Weather'
import MapTypeControl from '../common/MapTypeControl'

export default {
  components: {
    Weather,
    MapTypeControl
  },
  data() {
    return {
      map: {},
      loading: false,
      traceSource: []
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
    async request() {
      this.loading = true
      const {data} = await this.$fetch({ url: this.api.traceMap })
      // console.log(data)
      this.loading = false
      this.traceSource = data.result
      this.$nextTick(this.initMap)
    },
    initMap() {
      const map = this.map = new BMap.Map('traceSourceMap', { enableMapClick: false }) // 创建地图实例 直接写ID 容器要给大小
      const query = this.$route.query // 判断 是否传递了 点位 没有取默认
      const point = query.lat ? new BMap.Point(query.lon, query.lat) : new BMap.Point(mapCZ[0], mapCZ[1])
      map.centerAndZoom(point, mapCZ[2]) // 设置中心点坐标 地图级别 （也可以重新设置）
      map.enableScrollWheelZoom(true) // 开启鼠标滚轮缩放
      map.setMapStyle({styleJson})
      debugMap(map)
      drawPolygon(map)
      this.drawPoint()
    },
    drawPoint() {
      this.traceSource.forEach(item => {
        // 报警每一项
        const itemPoint = new BMap.Point(item.lon, item.lat)
        const myIcon = new BMap.Icon('https://s1.ax1x.com/2018/06/26/PCqUyt.png', new BMap.Size(50, 50), {
          imageSize: new BMap.Size(50, 50) // background-size
        })
        const marker = new BMap.Marker(itemPoint, {icon: myIcon})
        const infoWindow = new BMap.InfoWindow(airDetails(item), {
          // width: 420
        })
        marker.addEventListener('click', () => this.map.openInfoWindow(infoWindow, itemPoint))
        this.map.addOverlay(marker)

        // 关联项渲染
        item.relevance.forEach(e => {
          const ePoint = new BMap.Point(e.baiduLongitude, e.baiduLatitude)
          // 添加封装好的 自定义覆盖物
          this.map.addOverlay(new ComplexCustomOverlay(
            ePoint, 'http://iconfont.alicdn.com/t/1520749823689.jpg@100h_100w.jpg', '距离: ' + (Number(e.distance) >= 1000 ? (e.distance / 1000).toFixed(1) + '公里' : (e.distance - 0).toFixed(0) + '米')
          ))
          // 添加 透明的marker点 以便 触发infoWindow
          const myIcon = new BMap.Icon('https://s1.ax1x.com/2018/05/23/CRjQ7n.png', new BMap.Size(30, 44), {
            imageSize: new BMap.Size(30, 44) // background-size
          })
          const marker = new BMap.Marker(ePoint, {icon: myIcon})
          const infoWindow = new BMap.InfoWindow(pollutionInfoWindow(e), {
            // width: 530
          })
          marker.addEventListener('click', () => this.map.openInfoWindow(infoWindow, ePoint))
          this.map.addOverlay(marker)
          // 添加线
          this.map.addOverlay(new BMap.Polyline(
            [ePoint, itemPoint], // 坐标
            {strokeColor: 'red', strokeWeight: 3, strokeOpacity: 0.5} // 样式
          ))
        })
      })
    }
  }
}

</script>
<style lang="scss">
.traceSource_vessel {
  #traceSourceMap {
    width: 100%;
    height: 100%;
  }
  // 覆盖infoWindow样式
  .BMap_pop {
    // 主体样式显示 偏移
    > div:nth-child(9) {
      margin: 47px -17px;
      overflow: visible;
    }
  }
  .air-tooltip {
    // 三角
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
}
</style>
