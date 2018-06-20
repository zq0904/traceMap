<template>
  <div class="air-list">
    <RankingBtn @change-city="changeCity"></RankingBtn>
    <TimeComponent @change-time="changeTime"></TimeComponent>
    <ListLineTitle class="air-list-title" :title="title"></ListLineTitle>
    <div class="air-list-warpTable">
      <el-table
        v-loading="loading"
        ref="table"
        border
        :data="tableData"
        :cell-class-name="cellClassName"
        style="max-width: 1225px;"
        :max-height="maxHeight"
        :default-sort = "{prop: 'aqi', order: 'descending'}"
        >
        <el-table-column
          label="序号"
          width="48"
          type="index"
          :index="order">
        </el-table-column>
        <el-table-column
          prop="station.dname"
          label="名称"
          width="100">
        </el-table-column>
        <el-table-column
          prop="AQIlevel"
          label="AQI污染等级"
          width="100">
        </el-table-column>
        <el-table-column
          prop="aqi"
          label="AQI"
          sortable
          width="57">
        </el-table-column>
        <el-table-column
          prop="pm25"
          label="PM2.5"
          sortable
          width="72">
        </el-table-column>
        <el-table-column
          prop="pm10"
          label="PM10"
          sortable
          width="70">
        </el-table-column>
        <el-table-column
          prop="so2"
          label="SO2"
          sortable
          width="55">
        </el-table-column>
        <el-table-column
          prop="no2"
          label="NO2"
          sortable
          width="60">
        </el-table-column>
        <el-table-column
          prop="co"
          label="CO"
          sortable
          width="50">
        </el-table-column>
        <el-table-column
          prop="o3"
          label="O3"
          sortable
          width="48">
        </el-table-column>
        <el-table-column
          prop="ci"
          label="综合指数"
          sortable
          width="90">
        </el-table-column>
        <el-table-column
          prop="mData.tOut"
          label="温度℃"
          width="62">
        </el-table-column>
        <el-table-column
          prop="mData.hOut"
          label="湿度%"
          width="62">
        </el-table-column>
        <el-table-column
          prop="mData.wdOut"
          label="风向"
          width="58">
        </el-table-column>
        <el-table-column
          prop="mData.pOut"
          label="气压Pa"
          width="64">
        </el-table-column>
        <el-table-column
          prop="mData.wp"
          label="风级"
          width="48">
        </el-table-column>
        <el-table-column
          prop="mData.wsOut"
          label="风速m/s"
          width="74">
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
import RankingBtn from '../common/RankingBtn'
import ListLineTitle from '../common/ListLineTitle'
import TimeComponent from '../common/TimeComponent'

export default {
  components: {
    RankingBtn,
    ListLineTitle,
    TimeComponent
  },
  data () {
    return {
      loading: false,
      tableData: [],
      title: '站点排名', // 表格title文本
      maxHeight: 0, // 动态计算 表格 高度
      condition: {
        city: 'site', // 与组件的默认值统一
        type: '',
        time: ''
      }
    }
  },
  computed: {
    ...mapGetters({
      api: 'getApi'
    })
  },
  created() {
    // 动态计算 表格 高度
    this.$nextTick(() => {
      const table = this.$refs.table.$el
      const main = table.offsetParent
      this.maxHeight = main.offsetHeight - table.offsetTop - 20
    })
  },
  methods: {
    // 城市 变更
    changeCity(val) {
      this.condition.city = val.val
      this.title = val.text
      this.request()
    },
    // 时间及类型 变更
    changeTime(time, type) { // 选择的时间 对应的类型
      // 初始化的时候 这个 watch immediate 默认执行一次
      this.condition.time = time
      this.condition.type = type
      this.request()
    },
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
    async request() {
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
.air-list {
  &-title {
    float: left;
    width: 100%;
  }
  &-warpTable {
    margin: 0 20px;
    .has-gutter tr th {
      height: 35px;
      padding: 0;
      font-size: 14px;
      color: #333333;
      background-color: #F3F9FF;
      text-align: center;
      .cell {
        padding: 0;
      }
    }
    tbody td {
      text-align: center;
      padding: 12px 0;
    }
    .el-table .cell {
      font-size: 12px;
      color: #666666;
      line-height: 1.1;
    }
  }
}
</style>
