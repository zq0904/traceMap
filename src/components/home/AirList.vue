<template>
  <div class="air_list" v-loading="loading">
    <div class="cityType-group">
      <button class="btn" :class="condition.city === '永年区' ? 'btn-primary' : 'btn-default'" @click="condition.city = '永年区'">永年区</button>
      <!-- <button class="btn" :class="condition.city === '2+26城市' ? 'btn-primary' : 'btn-default'" @click="condition.city = '2+26城市'">2+26城市</button>
      <button class="btn" :class="condition.city === '74城市' ? 'btn-primary' : 'btn-default'" @click="condition.city = '74城市'">74城市</button>
      <button class="btn" :class="condition.city === '338城市' ? 'btn-primary' : 'btn-default'" @click="condition.city = '338城市'">338城市</button> -->
    </div>
    <div class="date-group">
      <button class="btn" :class="condition.date === 'H' ? 'btn-primary' : 'btn-default'" @click="condition.date = 'H'">时</button>
      <button class="btn" :class="condition.date === 'D' ? 'btn-primary' : 'btn-default'" @click="condition.date = 'D'">日</button>
      <button class="btn" :class="condition.date === 'M' ? 'btn-primary' : 'btn-default'" @click="condition.date = 'M'">月</button>
      <button class="btn" :class="condition.date === 'Y' ? 'btn-primary' : 'btn-default'" @click="condition.date = 'Y'">年</button>
    </div>
    <div class="search-group">
      <button class="btn btn-success" @click="search">搜索</button>
    </div>
    <div class="table_wrap">
      <el-table
        :data="tableData"
        style="width: 100%"
        :cell-class-name="cellClassName"
        max-height="580"
        :default-sort = "{prop: 'aqi', order: 'descending'}"
        >
        <el-table-column
          label="序号"
          width="50"
          type="index"
          :index="order">
        </el-table-column>
        <el-table-column
          prop="station.dname"
          label="名称"
          width="180">
        </el-table-column>
        <el-table-column
          prop="AQIlevel"
          label="AQI污染等级"
          width="102">
        </el-table-column>
        <el-table-column
          prop="aqi"
          label="AQI"
          sortable
          width="70">
        </el-table-column>
        <el-table-column
          prop="pm25"
          label="PM2.5"
          sortable
          width="90">
        </el-table-column>
        <el-table-column
          prop="pm10"
          label="PM10"
          sortable
          width="90">
        </el-table-column>
        <el-table-column
          prop="so2"
          label="SO2"
          sortable
          width="75">
        </el-table-column>
        <el-table-column
          prop="no2"
          label="NO2"
          sortable
          width="90">
        </el-table-column>
        <el-table-column
          prop="co"
          label="CO"
          sortable
          width="70">
        </el-table-column>
        <el-table-column
          prop="o3"
          label="O3"
          sortable
          width="70">
        </el-table-column>
        <el-table-column
          prop="ci"
          label="综合指数"
          sortable
          width="100">
        </el-table-column>
        <el-table-column
          prop="mData.tOut"
          label="温度℃"
          width="70">
        </el-table-column>
        <el-table-column
          prop="mData.hOut"
          label="湿度%"
          width="70">
        </el-table-column>
        <el-table-column
          prop="mData.wdOut"
          label="风向"
          width="70">
        </el-table-column>
        <el-table-column
          prop="mData.pOut"
          label="气压Pa"
          width="80">
        </el-table-column>
        <el-table-column
          prop="mData.wp"
          label="风级"
          width="70">
        </el-table-column>
        <el-table-column
          prop="mData.wsOut"
          label="风速m/s"
          width="85">
        </el-table-column>
        <el-table-column
          prop="most"
          label="首要污染物"
          width="90">
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import { nameUpperCase, classColor, AQIlevel } from '../../lib/common'

export default {
  data () {
    return {
      loading: false,
      tableData: [],
      condition: {
        city: '永年区',
        date: 'H'
      }
    }
  },
  computed: {
    ...mapGetters({
      api: 'getApi'
    })
  },
  created() {
    this.search()
  },
  methods: {
    // 自定义序号
    order(index) {
      return index + 1
    },
    // 单元格颜色
    cellClassName({row, columnIndex}) {
      if (columnIndex === 2) {
        return classColor('aqi', row.aqi)
      }
    },
    // 搜索
    async search() {
      this.loading = true
      const {data} = await this.$fetch({
        url: this.api.AirList,
        data: this.condition
      })
      // console.log(data)
      this.loading = false
      this.tableData = data.result.map(e => {
        e.most = nameUpperCase(e.most) // 对首要污染物转换大写
        e.AQIlevel = AQIlevel('aqi', e.aqi) // 污染等级 按aqi排
        return e
      })
    }
  }
}
</script>

<style lang="scss">
.air_list {
  .cityType-group {
    position: absolute;
    top: 7px;
    left: 10px;
    z-index: 10;
  }
  .date-group {
    position: absolute;
    top: 7px;
    left: 345px;
    z-index: 10;
  }
  .search-group {
    position: absolute;
    top: 7px;
    left: 535px;
    z-index: 10;
  }
  .table_wrap {
    padding: 50px 10px 0;
  }
}
</style>
