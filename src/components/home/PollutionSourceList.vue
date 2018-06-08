<template>
  <div class="pollution_list" v-loading="loading">
    <!-- 有数据在加载 -->
    <div class="type_select" v-if="areaDict[0]">
      <el-select v-model="nowCounty" filterable placeholder="请选择区县"
        size="mini"
        @change="changeCounty">
        <el-option
          v-for="(e, i) in areaDict"
          :key="i"
          :label="e.text"
          :value="e.code">
        </el-option>
      </el-select>
      <el-select v-model="nowVillage" filterable placeholder="请选择乡镇"
        size="mini"
        @change="changeVillage">
        <el-option
          v-for="(e, i) in areaDict[dictIndex[0]].children"
          :key="i"
          :label="e.text"
          :value="e.code">
        </el-option>
      </el-select>
      <el-select v-model="nowHamlet" filterable placeholder="请选择村"
        size="mini">
        <el-option
          v-for="(e, i) in areaDict[dictIndex[0]].children[dictIndex[1]].children"
          :key="i"
          :label="e.text"
          :value="e.code">
        </el-option>
      </el-select>
      <el-select v-model="nowStatus" filterable placeholder="请选择状态"
        size="mini">
        <el-option
          v-for="item in status"
          :key="item.code"
          :label="item.name"
          :value="item.code">
        </el-option>
      </el-select>
      <el-select v-model="nowType" filterable placeholder="请选择污染源类型"
        size="mini">
        <el-option
          v-for="item in type"
          :key="item.code"
          :label="item.name"
          :value="item.code">
        </el-option>
      </el-select>
    </div>
    <!-- 删除 搜索 -->
    <div class="search">
      <el-button
        size="small"
        type="danger"
        v-show="destroyIds.length"
        @click="destroy">删除</el-button>
      <el-button type="primary" size="small"
      @click="$router.push(`/pollutionSource/crud?operation=C`)">添加</el-button>
      <el-button type="primary" size="small" style="height: 32px;" icon="el-icon-search"
      @click="request">搜索</el-button>
      <el-button type="primary" size="small" style="height: 32px;">导入<i class="el-icon-upload el-icon--right"></i></el-button>
    </div>
    <div class="btn-group">
      <router-link to="/pollutionSource" class="btn btn-default">地图</router-link>
      <router-link to="/pollutionSource/list" class="btn btn-primary">报表</router-link>
    </div>
    <div class="table_wrap">
      <el-table
        :data="tableData"
        style="width: 100%"
        max-height="580"
        @selection-change="handleSelectionChange">
        <el-table-column
          type="selection"
          width="42">
        </el-table-column>
        <el-table-column
          prop="areacode.county"
          label="区县"
          width="130">
        </el-table-column>
        <el-table-column
          prop="areacode.town"
          label="乡镇"
          width="130">
        </el-table-column>
        <el-table-column
          prop="areacode.village"
          label="村"
          width="130">
        </el-table-column>
        <el-table-column
          prop="baiduLongitude"
          label="经度"
          width="100">
        </el-table-column>
        <el-table-column
          prop="baiduLatitude"
          label="纬度"
          width="100">
        </el-table-column>
        <el-table-column
          prop="liablePerson"
          label="责任人"
          width="110">
        </el-table-column>
        <el-table-column
          prop="liableSubject"
          label="责任主体"
          width="130">
        </el-table-column>
        <el-table-column
          prop="liablePhoneNumber"
          label="联系电话"
          width="120">
        </el-table-column>
        <el-table-column
          prop="startTime"
          label="开始时间"
          width="100">
        </el-table-column>
        <el-table-column
          prop="endTime"
          label="结束时间"
          width="100">
        </el-table-column>
        <el-table-column
          prop="handlingStatus"
          label="处理状态"
          width="90">
        </el-table-column>
        <el-table-column
          prop="advise"
          label="处理意见"
          width="180">
        </el-table-column>
        <el-table-column
          prop="msg"
          label="备注信息"
          width="180">
        </el-table-column>
        <el-table-column label="操作" width="300" fixed="right">
          <template slot-scope="scope">
            <el-button
            size="mini"
            type="primary"
            @click="$router.push(`/pollutionSource/crud?operation=R&id=${scope.row.polluteId}`)"
            plain>详情</el-button>
            <el-button
            size="mini"
            type="primary"
            @click="$router.push(`/pollutionSource?lon=${scope.row.baiduLongitude}&lat=${scope.row.baiduLatitude}`)"
            plain>定位</el-button>
            <el-button
            size="mini"
            type="primary"
            @click="$router.push(`/pollutionSource/crud?operation=U&id=${scope.row.polluteId}`)"
            plain>修改</el-button>
            <el-button
            size="mini"
            type="danger"
            @click="designate(scope.row)"
            plain>指派</el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination
        class="pagination"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="currentPage"
        :page-sizes="[10, 15, 20]"
        :page-size="limit"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total">
      </el-pagination>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import moment from 'moment'

export default {
  data () {
    return {
      loading: false,
      tableData: [],
      status: [], // 污染源状态
      type: [], // 污染源类型
      areaDict: [], // 三级联动字典
      dictIndex: [0, 0], // 三级联动字典关联index
      total: 0, // 总页数
      currentPage: 1, // 当前页码
      limit: 10, // 每页多少
      destroyIds: [], // 删除每一项的id
      nowCounty: '', // 区县级code
      nowVillage: '', // 乡镇级code
      nowHamlet: '', // 村级code
      nowStatus: '',
      nowType: ''
    }
  },
  computed: {
    ...mapGetters({
      api: 'getApi'
    })
  },
  async created() {
    await this.linkage3()
    await this.statusList()
    await this.typeList()
    await this.request()
  },
  methods: {
    // 三级联动字典
    async linkage3() {
      const {data} = await this.$fetch({ url: this.api.pollutionThreeLinkage, data: {type: 1} })
      // console.log(data)
      this.areaDict = data.result.areaDict
    },
    // 区县级 change 下一级默认选中全部 变更索引
    changeCounty(val) {
      this.nowVillage = ''
      this.areaDict.forEach((e, i) => {
        if (e.code === val) this.dictIndex[0] = i
      })
    },
    // 乡镇级 change
    changeVillage(val) {
      this.nowHamlet = ''
      this.areaDict.forEach((e, i) => {
        e.children.forEach((item, i) => {
          if (item.code === val) this.dictIndex[1] = i
        })
      })
    },
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
    // 请求 污染源分页列表
    async request() {
      this.loading = true
      const {data} = await this.$fetch({
        url: this.api.pollutionList,
        data: {
          offset: (this.currentPage - 1) * this.limit, // 起始行数
          limit: this.limit, // 每页多少
          areaCode: this.nowHamlet ? this.nowHamlet : (this.nowVillage ? this.nowVillage : this.nowCounty),
          handlingStatus: this.nowStatus,
          polluteTypeId: this.nowType
        }
      })
      // console.log(data)
      this.loading = false
      this.tableData = data.result.pageInfo.list // 列表数据
      this.total = data.result.pageInfo.total // 总页数
    },
    // 时间格式化
    dateFormatter(row, column, cellValue) {
      return cellValue === '-' ? '-' : moment(Number(cellValue)).format('YYYY-MM-DD')
    },
    // 详情
    particulars(row) {
      console.log(row)
    },
    // 更新
    update(row) {
      console.log(row)
    },
    // 删除
    async destroy() {
      const {data} = await this.$fetch({
        url: this.api.pollutionListDel,
        data: {
          ids: this.destroyIds.join(',')
        }
      })
      this.$message({
        message: data.msg,
        type: 'success'
      })
      this.request()
    },
    // 复选框
    handleSelectionChange(val) {
      this.destroyIds = val.map(e => e.polluteId)
    },
    // 指派
    designate(row) {
      console.log(row)
    },
    // 每页多少条变更
    handleSizeChange(val) {
      this.limit = val
      this.request()
    },
    // 当前页数变更
    handleCurrentChange(val) {
      this.currentPage = val
      this.request()
    }
  }
}
</script>

<style lang="scss">
.pollution_list {
  .type_select {
    position: absolute;
    top: 10px;
    left: 20px;
    z-index: 10;
    .el-select {
      width: 120px;
    }
  }
  .search {
    position: absolute;
    top: 8px;
    right: 222px;
    z-index: 10;
  }
  .btn-group {
    position: absolute;
    top: 7px;
    right: 100px;
    z-index: 10;
  }
  .table_wrap {
    padding: 50px 10px 0;
  }
}
</style>
