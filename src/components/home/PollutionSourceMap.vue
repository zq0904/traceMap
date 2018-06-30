<template>
  <div class="pollutionSource-vessel" v-loading="loading">
    <Weather></Weather>
    <MapTypeControl :map="map"></MapTypeControl>
    <div class="type-select">
      <el-select class="type-select-item" v-model="nowStatus" filterable placeholder="请选择状态"
        size="small"
        @change="drawPoint">
        <el-option
          v-for="item in status"
          :key="item.code"
          :label="item.name === '全部' ? '状态选择: 全部' : item.name"
          :value="item.code">
        </el-option>
      </el-select>
      <el-select class="type-select-item" v-model="nowType" filterable placeholder="请选择污染源类型"
        size="small"
        @change="drawPoint">
        <el-option
          v-for="item in type"
          :key="item.code"
          :label="item.name === '全部' ? '展示污染源类型: 全部' : item.name"
          :value="item.code">
        </el-option>
      </el-select>
    </div>
    <!-- <div class="color-info">
      <p v-if="item.value !== ''" v-for="(item, index) in status" :key="index">{{item.color}}: {{item.name}}</p>
    </div> -->
    <div class="pollutionSource-vessel-day">
      <span class="pollutionSource-vessel-day-button"
        :class="{'on': isTodayAdd}"
        @click.stop="isTodayAdd = !isTodayAdd">今日新增</span>
      <span class="pollutionSource-vessel-day-button"
        :class="{'on': isYesterdayDispose}"
        @click.stop="isYesterdayDispose = !isYesterdayDispose">昨日处理</span>
    </div>
    <div id="pollutionSourceMap"></div>
    <div class="pollutionSource-vessel-flag">
      <p class="pollutionSource-vessel-flag-p">已处理</p>
      <span class="pollutionSource-vessel-flag-span green"></span>
      <p class="pollutionSource-vessel-flag-p">处理中</p>
      <span class="pollutionSource-vessel-flag-span blue"></span>
      <p class="pollutionSource-vessel-flag-p">未处理</p>
      <span class="pollutionSource-vessel-flag-span red"></span>
    </div>
  </div>
</template>
<script>
import { mapGetters } from 'vuex'
import BMap from 'BMap'
import { debugMap, styleJson, pollutionInfoWindow } from '../../lib/common'
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
      data: [], // 源数据
      fData: [], // 过滤后的数据
      status: [], // 污染源状态
      type: [], // 污染源类型
      nowStatus: '', // 当前选code值
      nowType: '',
      isTodayAdd: false, // 是否选择了 今日新增
      isYesterdayDispose: false // 是否选择了 昨日处理
    }
  },
  watch: {
    isTodayAdd(val) {
      if (val) {
        this.isYesterdayDispose = false
      }
      this.drawPoint()
    },
    isYesterdayDispose(val) {
      if (val) {
        this.isTodayAdd = false
      }
      this.drawPoint()
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

      //  mock
      const mock = data.result.map((e, i) => {
        e.isTodayAdd = i % 2 === 0
        e.isYesterdayDispose = i < 59
        return e
      })

      this.data = mock
      this.$nextTick(this.initMap()) // 初始加载
    },
    // 初始化地图
    initMap() {
      const map = this.map = new BMap.Map('pollutionSourceMap', { enableMapClick: false })
      const query = this.$route.query // 判断 是否传递了 点位 没有 取默认
      const point = query.lat ? new BMap.Point(query.lon, query.lat) : new BMap.Point(mapCZ[0], mapCZ[1])
      map.centerAndZoom(point, mapCZ[2]) // 设置中心点坐标 地图级别 （也可以重新设置）
      map.enableScrollWheelZoom(true) // 开启鼠标滚轮缩放
      map.setMapStyle({styleJson})
      debugMap(map)
      this.drawPoint() // 初始绘制点位
    },
    // 绘制点位
    drawPoint() {
      this.map.clearOverlays() // 清空所有覆盖物
      this.filterDate() // 过滤
      drawPolygon(this.map) // 绘制行政区
      // 使用 过滤后的数据
      this.fData.forEach(item => {
        const itemPoint = new BMap.Point(item.baiduLongitude, item.baiduLatitude)
        const myIcon = new BMap.Icon('https://s1.ax1x.com/2018/06/26/PPkGtA.png', new BMap.Size(30, 41.25), {
          imageSize: new BMap.Size(30, 41.25) // background-size
        })
        const marker = new BMap.Marker(itemPoint, {icon: myIcon})
        const infoWindow = new BMap.InfoWindow(pollutionInfoWindow(item), {
          // width: 530
        })
        marker.addEventListener('click', () => this.map.openInfoWindow(infoWindow, itemPoint))
        this.map.addOverlay(marker)
      })
    },
    // 过滤 标准数据
    filterDate() {
      this.fData = this.data.filter(e => {
        const status = this.nowStatus === '' ? true : this.nowStatus === e.handlingStatus
        const type = this.nowType === '' ? true : this.nowType === e.polluteTypeId
        const isTodayAdd = this.isTodayAdd ? e.isTodayAdd : true
        const isYesterdayDispose = this.isYesterdayDispose ? e.isYesterdayDispose : true
        return status && type && isTodayAdd && isYesterdayDispose
      })
    }
  }
}

</script>
<style lang="scss">
@import '../../assets/scss/app';
.pollutionSource-vessel {
  .type-select {
    position: absolute;
    top: 20px;
    left: 50%;
    transform: translateX(-50%);
    z-index: 10;
    &-item {
      float: left;
      margin-right: 20px;
      &:last-of-type {
        margin-right: 0;
      }
    }
  }
  &-day {
    position: absolute;
    top: 70px;
    right: 34.5px;
    width: 75px;
    z-index: 100;
    &-button {
      display: block;
      width: 75px;
      height: 32px;
      line-height: 32px;
      margin-bottom: 10px;
      text-align: center;
      font-size: 14px;
      color: #333;
      cursor: pointer;
      border: 1px solid #fff;
      border-radius: 4px;
      background-color: #fff;
      &.on {
        color: #0087FF;
        border-color: #0087FF;
      }
      &:last-of-type {
        margin-bottom: 0;
      }
    }
  }
  .color-info {
    position: absolute;
    top: 200px;
    right: 10px;
    z-index: 10;
    font-size: 16px;
    line-height: 20px;
    color: #fff;
  }
  #pollutionSourceMap {
    width: 100%;
    height: 100%;
  }
  &-flag {
    position: absolute;
    left: 0;
    bottom: 0;
    width: 100%;
    height: 55px;
    line-height: 54px;
    color: #fff;
    background-color: rgba(0, 0, 0, .3);
    &-span {
      float: right;
      margin-top: 20px;
      width: 15px;
      height: 15px;
      &.red {
        background-color: #E73717;
      }
      &.blue {
        background-color: #4382D3;
      }
      &.green {
        background-color: #6AD343;
      }
    }
    &-p {
      float: right;
      height: 100%;
      padding: 0 18px 0 12px;
      font-size: 12px;
    }
  }
  // 覆盖infoWindow样式
  .BMap_pop {
    > div {
      display: none;
    }
    // 主体样式显示 偏移
    > div:nth-child(9) {
      display: block;
      margin: 35px -17px;
    }
    // 删除按钮
    > img:first-of-type {
      top: 63px !important;
      left: 475px !important;
      width: 20px !important;
      height: 20px !important;
      border: 1px solid #8E8F91 !important;
      border-radius: 50% !important;
      padding: 2px !important;
    }
  }
  // 去阴影
  .BMap_shadow {
    display: none;
  }
}

</style>
