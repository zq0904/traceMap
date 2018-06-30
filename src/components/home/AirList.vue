<template>
  <div class="air-list">
    <RankingBtn @change-city="changeCity"></RankingBtn>
    <TimeComponent @change-time="changeTime"></TimeComponent>
    <ListLineTitle class="air-list-title" :title="title" :showLine="true"></ListLineTitle>
    <div class="air-list-warpTable" v-loading="loading">
      <!-- 收藏的站点 -->
      <el-table
        border
        ref="collectTable"
        :data="collectData"
        :cell-class-name="cellClassName"
        :max-height="collectTableMaxHeight"
        @sort-change="sortChange"
        :default-sort = "{prop: 'aqi', order: 'descending'}">
        <el-table-column
          label="序号"
          prop="index"
          min-width="48">
        </el-table-column>
        <el-table-column
          prop="station.dname"
          label="名称"
          min-width="100">
        </el-table-column>
        <el-table-column
          prop="AQIlevel"
          label="AQI污染等级"
          min-width="100">
        </el-table-column>
        <el-table-column
          prop="aqi"
          label="AQI"
          :sortable="true"
          :sort-orders="['descending', 'ascending']"
          min-width="57">
        </el-table-column>
        <el-table-column
          prop="pm25"
          label="PM2.5"
          :sortable="true"
          :sort-orders="['descending', 'ascending']"
          min-width="72">
        </el-table-column>
        <el-table-column
          prop="pm10"
          label="PM10"
          :sortable="true"
          :sort-orders="['descending', 'ascending']"
          min-width="70">
        </el-table-column>
        <el-table-column
          prop="so2"
          label="SO2"
          :sortable="true"
          :sort-orders="['descending', 'ascending']"
          min-width="55">
        </el-table-column>
        <el-table-column
          prop="no2"
          label="NO2"
          :sortable="true"
          :sort-orders="['descending', 'ascending']"
          min-width="60">
        </el-table-column>
        <el-table-column
          prop="co"
          label="CO"
          :sortable="true"
          :sort-orders="['descending', 'ascending']"
          min-width="50%">
        </el-table-column>
        <el-table-column
          prop="o3"
          label="O3"
          :sortable="true"
          :sort-orders="['descending', 'ascending']"
          min-width="48">
        </el-table-column>
        <el-table-column
          prop="ci"
          label="综合指数"
          min-width="90">
        </el-table-column>
        <el-table-column
          prop="mData.tOut"
          label="温度℃"
          min-width="62">
        </el-table-column>
        <el-table-column
          prop="mData.hOut"
          label="湿度%"
          min-width="62">
        </el-table-column>
        <el-table-column
          prop="mData.wdOut"
          label="风向"
          min-width="58">
        </el-table-column>
        <el-table-column
          prop="mData.pOut"
          label="气压Pa"
          min-width="64">
        </el-table-column>
        <el-table-column
          prop="mData.wp"
          label="风级"
          min-width="48">
        </el-table-column>
        <el-table-column
          prop="mData.wsOut"
          label="风速m/s"
          min-width="74">
        </el-table-column>
        <el-table-column
          prop="most"
          label="首要污染物"
          min-width="90">
        </el-table-column>
      </el-table>
      <RowLine></RowLine>
      <!-- 没有收藏的站点 -->
      <el-table
        ref="usualTable"
        border
        :data="usualData"
        :cell-class-name="cellClassName"
        :max-height="maxHeight">
        <el-table-column
          label="序号"
          prop="index"
          min-width="48">
        </el-table-column>
        <el-table-column
          prop="station.dname"
          label="名称"
          min-width="100">
        </el-table-column>
        <el-table-column
          prop="AQIlevel"
          label="AQI污染等级"
          min-width="100">
        </el-table-column>
        <el-table-column
          prop="aqi"
          label="AQI"
          min-width="57">
        </el-table-column>
        <el-table-column
          prop="pm25"
          label="PM2.5"
          min-width="72">
        </el-table-column>
        <el-table-column
          prop="pm10"
          label="PM10"
          min-width="70">
        </el-table-column>
        <el-table-column
          prop="so2"
          label="SO2"
          min-width="55">
        </el-table-column>
        <el-table-column
          prop="no2"
          label="NO2"
          min-width="60">
        </el-table-column>
        <el-table-column
          prop="co"
          label="CO"
          min-width="50%">
        </el-table-column>
        <el-table-column
          prop="o3"
          label="O3"
          min-width="48">
        </el-table-column>
        <el-table-column
          prop="ci"
          label="综合指数"
          min-width="90">
        </el-table-column>
        <el-table-column
          prop="mData.tOut"
          label="温度℃"
          min-width="62">
        </el-table-column>
        <el-table-column
          prop="mData.hOut"
          label="湿度%"
          min-width="62">
        </el-table-column>
        <el-table-column
          prop="mData.wdOut"
          label="风向"
          min-width="58">
        </el-table-column>
        <el-table-column
          prop="mData.pOut"
          label="气压Pa"
          min-width="64">
        </el-table-column>
        <el-table-column
          prop="mData.wp"
          label="风级"
          min-width="48">
        </el-table-column>
        <el-table-column
          prop="mData.wsOut"
          label="风速m/s"
          min-width="74">
        </el-table-column>
        <el-table-column
          prop="most"
          label="首要污染物"
          min-width="90">
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import _ from 'lodash'
import { nameUpperCase, classColor, AQIlevel } from '../../lib/common'
import RankingBtn from '../common/RankingBtn'
import ListLineTitle from '../common/ListLineTitle'
import TimeComponent from '../common/TimeComponent'
import RowLine from '../common/RowLine'

export default {
  components: {
    RankingBtn,
    ListLineTitle,
    TimeComponent,
    RowLine
  },
  data () {
    return {
      loading: false,
      tableData: [], // 原始数据
      sortData: [], // 按收藏 和 对应的排序规则 排序后的数据
      collectData: [], // 排序后 收藏站点数据
      usualData: [], // 排序后 没有收藏的站点
      nowProp: 'aqi', // 当前根据的排序值
      nowOrder: 'descending', // 当前的排序规则
      title: '站点排名', // 表格title文本
      collectTableMaxHeight: 745,
      maxHeight: 745, // 动态计算 表格 高度 这里新版element有bug 初始进入这个页面 取小的值后 不会实时更新 但设置大的值 会实时更新 所以暂时取 745
      condition: {
        city: 'site', // 与组件的默认值统一
        type: '',
        time: ''
      }
    }
  },
  watch: {
    // 原始数据改变 重新计算 排序数据
    tableData(val) { this.filterData() },
    nowProp() { this.filterData() },
    nowOrder() { this.filterData() },
    // 重新排序后 也重新 分发2组数据
    sortData(val) {
      const collectData = []
      const usualData = []
      val.forEach((e, i) => {
        if (e.isCollect === 1) {
          collectData.push(e)
        } else {
          usualData.push(e)
        }
      })
      this.collectData = collectData
      this.usualData = usualData
      // 动态计算 没有收藏表格 高度
      this.$nextTick(() => {
        // (惰性函数)
        // if (this.sluggishness) return
        // this.sluggishness = true
        // 计算 收藏表格高度
        const collectTable = this.$refs.collectTable.$el
        this.collectTableMaxHeight = (document.body.offsetHeight - collectTable.offsetTop - 50 - 20 - 20) / 2
        // 计算 没有收藏表格高度
        const usualTable = this.$refs.usualTable.$el
        const main = usualTable.parentElement.parentElement.parentElement
        this.maxHeight = main.offsetHeight - usualTable.offsetTop - 20
      })
    }
  },
  computed: {
    ...mapGetters({
      api: 'getApi'
    })
  },
  mounted() {
    this.index = 3 // mock
  },
  methods: {
    // 排序触发事件
    sortChange({ column, prop, order }) {
      // console.log(column, prop, order)
      this.nowProp = prop
      this.nowOrder = order
    },
    // 排序原始数据
    filterData() {
      let sortData
      // 添加序号
      sortData = _.sortBy(this.tableData, e => -e[this.nowProp]).map((e, i) => {
        e.index = i + 1
        return e
      })
      // 规则排序
      switch (this.nowOrder) {
        case 'descending': // 由大到小
          sortData = _.sortBy(sortData, [e => -e.isCollect, e => -e[this.nowProp]])
          break
        case 'ascending': // 由小到大
          sortData = _.sortBy(sortData, [e => -e.isCollect, e => e[this.nowProp]])
          break
      }
      this.sortData = sortData
    },
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

      console.log(++this.index) // mock

      this.tableData = data.result.map((e, i) => {
        e.most = nameUpperCase(e.most) // 对首要污染物转换大写
        e.AQIlevel = AQIlevel('aqi', e.aqi) // 污染等级 按aqi排
        e.isCollect = i < this.index ? 1 : 0 // mock
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
  }
}
</style>
