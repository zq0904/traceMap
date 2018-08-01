<template>
  <div class="AlarmRuleConfig"  v-loading="loading">
    <ListLineTitle title="报警规则"></ListLineTitle>
    <div class="AlarmRuleConfig-wrapBtn">
      <SingleButton text="添加新规则" :fixedSize="true" @click="cList" :active="true"></SingleButton>
      <SingleButton text="删除" v-show="destroyIds.length" :fixedSize="true" @click="dList" :active="true"></SingleButton>
    </div>
    <div class="AlarmRuleConfig-ruleList">
      <el-table
        :data="tableData"
        border
        @selection-change="handleSelectionChange">
        <el-table-column
          type="selection"
          width="42">
        </el-table-column>
        <el-table-column
          prop="dwId"
          label="序号"
          min-width="60">
        </el-table-column>
        <el-table-column
          prop="dwName"
          label="别名"
          min-width="140">
        </el-table-column>
        <el-table-column
          prop="dwTypeStr"
          label="类型规则"
          min-width="60">
        </el-table-column>
        <el-table-column
          prop="dwParamStr"
          label="参数"
          min-width="60">
        </el-table-column>
        <el-table-column label="操作" min-width="130" fixed="right">
          <template slot-scope="scope">
            <el-button
            size="mini"
            icon="el-icon-search"
            @click.stop="rList(scope)"
            plain>详情</el-button>
            <el-button
            size="mini"
            icon="el-icon-edit"
            @click.stop="uList(scope)"
            plain>修改</el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination
        :small="true"
        class="pagination"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :total="total"
        :page-size="limit"
        :current-page="currentPage"
        :page-sizes="[10, 15, 20]"
        layout="total, sizes, prev, pager, next, jumper"
        :pager-count="5">
      </el-pagination>
    </div>
    <RowLine></RowLine>
    <ListLineTitle title="设置关联"></ListLineTitle>
    <div class="AlarmRuleConfig-relevance">
      <ul class="AlarmRuleConfig-relevance-ul">
        <li class="AlarmRuleConfig-relevance-ul-li" :class="relevance === '设备' ? 'on' : ''" @click.stop="toggleRelevance('设备')">设备关联规则</li>
        <li class="AlarmRuleConfig-relevance-ul-li" :class="relevance === '规则' ? 'on' : ''" @click.stop="toggleRelevance('规则')">规则关联设备</li>
      </ul>
      <span class="AlarmRuleConfig-relevance-selectText">选择{{relevance}} :</span>
      <el-select v-model="selectVal" placeholder="--请选择--">
        <el-option v-for="(item, index) in selectArr" :key="index"
          :label="item.label"
          :value="item.value">
        </el-option>
      </el-select>
      <SingleButton class="AlarmRuleConfig-relevance-save" text="保存" :fixedSize="true" @click="saveRelevance" :active="true"></SingleButton>
    </div>
    <!-- 穿梭框 -->
    <el-transfer
      class="AlarmRuleConfig-transfer"
      ref="transfer"
      filterable
      target-order="push"
      :titles="transferTitles"
      v-model="transferVal"
      :data="transferData"></el-transfer>
    <!-- 表单组件 -->
    <FormBox ref="FormBox"
      :type="type"
      :param="param"
      :device="device"
      :formType="formType"
      :row="row"
      @refresh="refresh"
      ></FormBox>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import ListLineTitle from '../common/ListLineTitle'
import RowLine from '../common/RowLine'
import SingleButton from '../common/SingleButton'
import FormBox from '../common/FormBox'

export default {
  components: {
    ListLineTitle,
    RowLine,
    SingleButton,
    FormBox
  },
  data () {
    return {
      loading: false,
      tableData: [{
        dwId: '',
        dwName: '',
        dwTypeStr: '',
        dwParamStr: ''
      }],
      destroyIds: [], // 删除每一项的id
      total: 0, // 总页数
      currentPage: 1, // 当前页码
      limit: 10, // 每页多少
      formBox: false, // 是否显示表单弹框
      formType: 1, // 打开表单弹框的类型 1添加 2详情 3修改
      row: {}, // 当前表格行信息
      type: {}, // 表单弹框 规则类型
      param: {}, // 表单弹框 参数
      device: [], // 设备select
      rule: [], // 规则select
      relevance: '设备', // 设置关联 文本
      selectArr: [], // 设置关联 select
      selectVal: '', // 设置关联 select值
      transferTitles: ['未关联规则', '已关联规则'], // 穿梭框title
      transferData: [], // 穿梭框数据
      transferVal: [] // 穿梭框的值 key所组成的数组
    }
  },
  watch: {
    // select change事件不会监听到''变化 所以直接监听该值
    async selectVal(val) {
      console.log('select', val)
      if (val === '') { // 清空穿梭框
        this.transferData = []
        this.transferVal = []
        return false
      }
      const isNumber = typeof val === 'number' // 设置关联 select 是否是 规则
      const {data} = await this.$fetch(isNumber ? {
        url: this.api.findDeviceByRule,
        data: {dwId: val}
      } : {
        url: this.api.findRuleByDevice,
        data: {deviceid: val}
      })
      if (data) {
        console.log(data)
        const unHas = data.result.unHas // 未关联
        const has = data.result.has // 已关联
        const transferData = []
        const transferVal = []
        for (let e of unHas) {
          transferData.push({
            label: isNumber ? e.dname : e.dwName,
            key: isNumber ? e.deviceid : e.dwId
          })
        }
        for (let e of has) {
          transferVal.push(isNumber ? e.deviceid : e.dwId)
          transferData.push({
            label: isNumber ? e.dname : e.dwName,
            key: isNumber ? e.deviceid : e.dwId
          })
        }
        this.transferData = transferData
        this.transferVal = transferVal
      }
    }
  },
  computed: {
    ...mapGetters({
      api: 'getApi'
    })
  },
  async created() {
    await this.refresh()
  },
  methods: {
    // 请求所有数据
    async refresh(val) {
      await this.requestDevice()
      await this.requestRule()
      this.toggleRelevance('设备')
      await this.requestList()
    },
    // 列表
    async requestList() {
      this.loading = true
      const {data} = await this.$fetch({
        url: this.api.alarmList,
        data: {
          offset: (this.currentPage - 1) * this.limit,
          limit: this.limit
        }
      })
      this.loading = false
      // console.log(data)
      if (data) {
        this.tableData = data.result.pageInfo.list // 列表数据
        this.total = data.result.pageInfo.total // 总页数
        this.type = data.result.Warns // 表单弹框 规则类型
        this.param = data.result.AirParam // 表单弹框 参数
      }
    },
    // 获取设备
    async requestDevice() {
      const {data} = await this.$fetch({
        url: this.api.device
      })
      if (data) {
        const device = []
        for (let e of data.result) {
          device.push({
            label: e.dname,
            value: e.deviceid
          })
        }
        this.device = device
      }
    },
    // 获取规则
    async requestRule() {
      const {data} = await this.$fetch({
        url: this.api.alarmList,
        data: {
          offset: 0,
          limit: 9999
        }
      })
      if (data) {
        const rule = []
        for (let e of data.result.pageInfo.list) {
          rule.push({
            label: e.dwName,
            value: Number(e.dwId)
          })
        }
        this.rule = rule
      }
    },
    // 添加
    cList(val) {
      console.log('添加', val)
      this.formType = 1
      this.row = {
        dwId: '', // 序号
        dwType: 1, // 相对 1  绝对 2  断线 3
        dwName: '', // 别名
        dwParam: '', // 参数
        dwDeviceid: '', // 比对设备id
        dwTime: '', // 对比粒度
        isDwCount: '', // 连续超标 断线时长
        absoluteLimit: '', // 警告门限
        lowerLimit: '', // 范围下限
        upperLimit: '' // 范围上限
      }
      this.$refs.FormBox.show = true
    },
    // 详情
    rList(val) {
      console.log('详情', val)
      this.formType = 2
      this.row = JSON.parse(JSON.stringify(val.row))
      this.$refs.FormBox.show = true
    },
    // 修改
    uList(val) {
      console.log('修改', val)
      this.formType = 3
      this.row = JSON.parse(JSON.stringify(val.row))
      this.$refs.FormBox.show = true
    },
    // 删除
    async dList(val) {
      console.log('删除', val)
      const {data} = await this.$fetch({
        url: this.api.alarmListDel,
        data: {
          ids: this.destroyIds.join(',')
        }
      })
      if (data) {
        this.$message({
          message: '删除成功',
          type: 'success'
        })
        await this.refresh()
      }
    },
    // 复选框
    handleSelectionChange(val) {
      this.destroyIds = val.map(e => e.dwId)
    },
    // 每页多少条变更
    handleSizeChange(val) {
      this.limit = val
      this.refresh()
    },
    // 当前页数变更
    handleCurrentChange(val) {
      this.currentPage = val
      this.refresh()
    },
    // 切换设置关联
    toggleRelevance(text) {
      this.relevance = text
      this.transferTitles = text === '设备' ? ['未关联规则', '已关联规则'] : ['未关联设备', '已关联设备']
      this.selectArr = text === '设备' ? this.device : this.rule
      this.selectVal = '' // 清空 默认不选中
    },
    // 关联保存
    async saveRelevance(val) {
      console.log('关联保存', val)
      const {data} = await this.$fetch({
        url: this.api.setLinkSave,
        data: {
          isLinkRule: !(typeof this.selectVal === 'number'),
          from: this.selectVal,
          to: this.transferVal.join(',')
        }
      })
      if (data) { // 请求成功
        this.$message({
          message: '关联成功',
          type: 'success'
        })
      }
      this.selectVal = '' // 重置
    }
  }
}
</script>

<style lang="scss">
.AlarmRuleConfig {
  &-wrapBtn {
    position: absolute;
    top: 14px;
    right: 20px;
    span {
      float: left;
    }
    span:last-of-type {
      margin-left: 10px;
    }
  }
  &-ruleList {
    padding: 0 20px;
  }
  .el-table tbody td {
    padding: 3px 0;
  }
  &-relevance {
    padding: 0 20px;
    height: 66px;
    &-ul {
      float: left;
      border: 1px solid #DDDEDF;
      border-radius: 5px;
      &-li {
        position: relative;
        float: left;
        height: 46px;
        line-height: 46px;
        padding: 0 20px;
        font-size: 14px;
        text-align: center;
        cursor: pointer;
        color: #333333;
        &.on {
          color: #0087FF;
        }
        &::before {
          content: '';
          position: absolute;
          top: 11px;
          right: 0;
          height: 24px;
          border-right: 1px solid #DDDEDF;
        }
        &:last-of-type::before {
          content: none;
        }
      }
    }
    &-selectText {
      float: left;
      margin: 0 10px 0 70px;
      height: 46px;
      line-height: 46px;
      font-size: 14px;
    }
    .el-select {
      input {
        width: 160px;
        height: 46px;
      }
    }
    &-save {
      float: right;
      margin-top: 5px;
    }
  }
  .el-transfer {
    padding: 0 20px;
  }
  &-transfer {
    @include c3(display, flex);
    .el-transfer-panel {
      @include c3(flex, 1);
    }
    .el-transfer__buttons {
      margin-top: 110.5px;
      height: 82px;
    }
  }
  .el-table__fixed-right .el-table__fixed-header-wrapper th:nth-last-child(1)::before {
    content: '';
    position: absolute;
    bottom: 2px;
    left: 0;
    width: 100%;
    border-top: 1px solid #ebeef5;
  }
}
</style>
