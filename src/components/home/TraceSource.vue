<template>
  <div class="traceSource_vessel" v-loading="loading">
    <div class="weather_wrap">
      <Weather></Weather>
    </div>
    <div id="echartsMap"></div>
  </div>
</template>
<script>
import { mapGetters } from 'vuex'
import BMap from 'BMap'
import BMAP_ANCHOR_TOP_RIGHT from 'BMAP_ANCHOR_TOP_RIGHT'
import BMAP_NORMAL_MAP from 'BMAP_NORMAL_MAP'
import BMAP_SATELLITE_MAP from 'BMAP_SATELLITE_MAP'
import BMAP_HYBRID_MAP from 'BMAP_HYBRID_MAP'
import { debugMap, styleJson, ComplexCustomOverlay, airDetails, pollutionInfoWindow } from '../../lib/common'
import { drawPolygon } from '../../lib/config'
import Weather from '../common/Weather'

export default {
  components: {
    Weather
  },
  data() {
    return {
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
      // const {data} = await this.$http.get('/proxy/traceSource')
      const {data} = await this.$fetch({ url: this.api.traceMap })
      // console.log(data)
      this.loading = false
      this.traceSource = data.result
      this.$nextTick(this.initMap)
    },
    initMap() {
      const map = new BMap.Map('echartsMap', { enableMapClick: false }) // 创建地图实例 直接写ID 容器要给大小
      const query = this.$route.query // 判断 是否传递了 点位 没有取默认
      const point = query.lat ? new BMap.Point(query.lon, query.lat) : new BMap.Point(114.631231, 36.79759)
      map.centerAndZoom(point, 12) // 设置中心点坐标 地图级别 （也可以重新设置）
      map.enableScrollWheelZoom(true) // 开启鼠标滚轮缩放
      map.addControl(new BMap.MapTypeControl({ // 地图类型 控件
        anchor: BMAP_ANCHOR_TOP_RIGHT,
        mapTypes: [
          BMAP_NORMAL_MAP, // 正常
          BMAP_SATELLITE_MAP, // 卫星 （混合是子向）
          BMAP_HYBRID_MAP // 混合
        ]
      }))
      map.setMapStyle({styleJson})
      debugMap(map)
      drawPolygon(map)

      this.traceSource.forEach(item => {
        // 报警每一项
        const itemPoint = new BMap.Point(item.lon, item.lat)
        const myIcon = new BMap.Icon('http://imgs.focus.cn/upload/xianyang/39388/b_393873446.gif', new BMap.Size(50, 50), {
          imageSize: new BMap.Size(50, 50) // background-size
        })
        const marker = new BMap.Marker(itemPoint, {icon: myIcon})
        const infoWindow = new BMap.InfoWindow(airDetails(item), {
          // width: 420,
          title: '<h4 style="text-align: center; color: transparent;">标题</h4>' // 信息窗口标题
        })
        marker.addEventListener('click', () => map.openInfoWindow(infoWindow, itemPoint))
        map.addOverlay(marker)

        // 关联项渲染
        item.relevance.forEach(e => {
          const ePoint = new BMap.Point(e.baiduLongitude, e.baiduLatitude)
          // 添加封装好的 自定义覆盖物
          map.addOverlay(new ComplexCustomOverlay(
            ePoint, 'http://iconfont.alicdn.com/t/1520749823689.jpg@100h_100w.jpg', '距离: ' + (Number(e.distance) >= 1000 ? Number(e.distance / 1000).toFixed(1) + '公里' : e.distance + '米')
          ))
          // 添加 透明的marker点 以便 触发infoWindow
          const myIcon = new BMap.Icon('https://s1.ax1x.com/2018/05/23/CRjQ7n.png', new BMap.Size(30, 44), {
            imageSize: new BMap.Size(30, 44) // background-size
          })
          const marker = new BMap.Marker(ePoint, {icon: myIcon})
          const infoWindow = new BMap.InfoWindow(pollutionInfoWindow(e), {
            // width: 530,
            title: '<h4 style="text-align: center;font-size: 18px;padding-bottom: 5px;border-bottom: 1px solid #000;">' + e.polluteName + '</h4>' // 信息窗口标题
          })
          marker.addEventListener('click', () => map.openInfoWindow(infoWindow, ePoint))
          map.addOverlay(marker)
          // 添加线
          map.addOverlay(new BMap.Polyline(
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
@import '../../assets/scss/app';
.traceSource_vessel {
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
  #echartsMap {
    width: 100%;
    height: 100%;
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
