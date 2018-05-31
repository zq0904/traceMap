<template>
  <div class="pollutionSource_vessel" v-loading="loading">
    <div class="weather_wrap">
      <Weather></Weather>
    </div>
    <!-- 这里使用本地过滤 只使用文本 -->
    <div class="type_select">
      <el-select v-model="nowStatus" filterable placeholder="请选择状态"
      size="small"
      @change="filterDate">
        <el-option
          v-for="item in status"
          :key="item.code"
          :label="item.name"
          :value="item.name">
        </el-option>
      </el-select>
      <el-select v-model="nowType" filterable placeholder="请选择污染源类型"
      size="small"
      @change="filterDate">
        <el-option
          v-for="item in type"
          :key="item.code"
          :label="item.name"
          :value="item.name">
        </el-option>
      </el-select>
    </div>
    <div class="btn-group">
      <router-link to="/pollutionSource" class="btn btn-primary">地图</router-link>
      <router-link to="/pollutionSource/list" class="btn btn-default">报表</router-link>
    </div>
    <div class="info">
      <p v-if="item.value !== ''" v-for="(item, index) in status" :key="index">{{item.color}}: {{item.name}}</p>
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
import { debugMap, styleJson, pollutionInfoWindow } from '../../lib/common'
import { drawPolygon } from '../../lib/config'
import Weather from '../common/Weather'

export default {
  components: {
    Weather
  },
  data() {
    return {
      loading: false,
      bmapCL: [114.631231, 36.79759, 12], // 中心点 和 缩放级别 实现持久
      data: [], // 源数据
      fData: [], // 过滤后的数据
      status: [], // 状态list
      type: [],
      nowStatus: '全部', // 当前选中值 这里使用本地过滤 只使用文本
      nowType: '全部'
    }
  },
  computed: {
    ...mapGetters({
      api: 'getApi'
    })
  },
  async created() {
    await this.statusList()
    await this.typeList()
    await this.request()
  },
  methods: {
    // 污染源状态列表
    async statusList() {
      const {data} = await this.$fetch({ url: this.api.pollutionState })
      // console.log(data)
      this.status = data.result.dict
    },
    // 污染源类型列表
    async typeList() {
      const {data} = await this.$fetch({ url: this.api.pollutionType })
      // console.log(data)
      this.type = data.result.list
    },
    async request() {
      this.loading = true
      const {data} = await this.$fetch({ url: this.api.pollutionMap })
      // console.log(data)
      this.loading = false
      this.data = data.result
      this.filterDate() // 初始过滤
      this.$nextTick(this.initMap()) // 初始加载
    },
    // 过滤 标准数据
    filterDate() {
      this.fData = this.data.filter(e => (this.nowStatus === '全部' ? true : (e.handlingStatus === this.nowStatus)) && (this.nowType === '全部' ? true : (e.polluteTypeName === this.nowType))
      )
      this.initMap()
    },
    initMap() {
      const map = new BMap.Map('echartsMap', { enableMapClick: false })
      const query = this.$route.query // 判断 是否传递了 点位 没有取默认
      const point = query.lat ? new BMap.Point(query.lon, query.lat) : new BMap.Point(this.bmapCL[0], this.bmapCL[1])
      map.centerAndZoom(point, this.bmapCL[2]) // 设置中心点坐标 地图级别 （也可以重新设置）
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
      // 只适用 过滤后的数据
      this.fData.forEach(item => {
        const itemPoint = new BMap.Point(item.baiduLongitude, item.baiduLatitude)
        const myIcon = new BMap.Icon('http://demo.coilabs.com:2000/file//BJFTAir/pType/微信图片_20180403134911_20180403134948037303.png', new BMap.Size(30, 44), {
          imageSize: new BMap.Size(30, 44) // background-size
        })
        const marker = new BMap.Marker(itemPoint, {icon: myIcon})
        const infoWindow = new BMap.InfoWindow(pollutionInfoWindow(item), {
          // width: 530,
          title: '<h4 style="text-align: center;font-size: 18px;padding-bottom: 5px;border-bottom: 1px solid #000;">' + item.polluteName + '</h4>' // 信息窗口标题
        })
        marker.addEventListener('click', () => map.openInfoWindow(infoWindow, itemPoint))
        map.addOverlay(marker)
      })
    }
  }
}

</script>
<style lang="scss">
@import '../../assets/scss/app';
.pollutionSource_vessel {
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
  .type_select {
    position: absolute;
    top: 10px;
    left: 200px;
    z-index: 10;
  }
  .btn-group {
    position: absolute;
    top: 7px;
    right: 100px;
    z-index: 10;
  }
  .info {
    position: absolute;
    top: 200px;
    right: 10px;
    z-index: 10;
    font-size: 16px;
    line-height: 20px;
    color: #fff;
  }
  #echartsMap {
    width: 100%;
    height: 100%;
  }
}

</style>
