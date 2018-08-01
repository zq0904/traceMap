<template>
  <div class="map-type-control">
    <span class="map-type-control-item pull-left"
      @click="toggle('NORMAL')"
      :class="{on: now === 'NORMAL'}">地图</span>
    <span class="map-type-control-item pull-right"
      @click="toggle('SATELLITE')"
      :class="{on: now === 'SATELLITE'}">卫星</span>
  </div>
</template>

<script>
import BMAP_NORMAL_MAP from 'BMAP_NORMAL_MAP' // 正常
import BMAP_SATELLITE_MAP from 'BMAP_SATELLITE_MAP' // 卫星 （混合是子向）
// import BMAP_HYBRID_MAP from 'BMAP_HYBRID_MAP' // 混合

export default {
  props: {
    map: {
      type: Object,
      required: true
    }
  },
  data () {
    return {
      now: 'NORMAL'
    }
  },
  methods: {
    toggle(type) {
      this.now = type
      switch (type) {
        case 'NORMAL':
          this.map.setMapType(BMAP_NORMAL_MAP)
          break
        case 'SATELLITE':
          this.map.setMapType(BMAP_SATELLITE_MAP)
          break
      }
    }
  }
}
</script>

<style lang="scss">
.map-type-control {
  position: absolute;
  z-index: 300;
  top: 20px;
  right: 20px;
  width: 104px;
  height: 30px;
  background-color: #fff;
  border-radius: 15px;
  &-item {
    width: 52px;
    height: 30px;
    line-height: 30px;
    font-size: 12px;
    text-align: center;
    border-radius: 15px;
    background-color: #fff;
    color: #000;
    cursor: pointer;
  }
  .on {
    background-color: #0087FF;
    color: #fff;
  }
}
</style>
