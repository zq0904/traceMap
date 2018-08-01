<template>
  <div class="TimeComponent">
    <el-date-picker
      v-show="nowIndex !== 0"
      class="TimeComponent-date"
      v-model="timeVal"
      @change="change"
      :value-format="'yyyy-MM-dd HH:mm:ss'"
      :type="mapBtn[nowIndex].type"
      :clearable="false"
      prefix-icon="''"
      size='medium'
      placeholder="选择日期时间">
    </el-date-picker>
    <span class="TimeComponent-span"
      v-for="(item, index) in mapBtn" :key="index"
      :class="nowIndex === index ? 'on' : ''"
      @click.stop="nowIndex = index">{{ item.text }}</span>
  </div>
</template>

<script>
import moment from 'moment'

export default {
  data () {
    return {
      mapBtn: [
        {
          text: '当日累积',
          val: 'now', // 报表类型
          rule: 'YYYY-MM-DD 00:00:00', // moment 默认选择时间 规则
          type: 'datetime' // 对应控件类型
        },
        {
          text: '时报',
          val: 'H',
          rule: 'YYYY-MM-DD HH:mm:00',
          type: 'datetime'
        },
        {
          text: '日报',
          val: 'D',
          rule: 'YYYY-MM-DD 00:00:00',
          type: 'date'
        },
        {
          text: '月报',
          val: 'M',
          rule: 'YYYY-MM-01 00:00:00',
          type: 'month'
        },
        {
          text: '年报',
          val: 'Y',
          rule: 'YYYY-01-01 00:00:00',
          type: 'year'
        }
      ],
      nowIndex: 0, // 默认选中第一个 当日累积
      timeVal: ''
    }
  },
  watch: {
    nowIndex: {
      handler(val) {
        this.timeVal = moment(Date.now()).format(this.mapBtn[val].rule) // 只要报表类型发生变化 设置默认值
        this.$emit('change-time', this.timeVal, this.nowType)
      },
      immediate: true // 初始执行一次
    }
  },
  computed: {
    nowType() { // 报表类型
      return this.mapBtn[this.nowIndex].val
    }
  },
  methods: {
    change(val) {
      this.$emit('change-time', val, this.nowType)
    }
  }
}
</script>

<style lang="scss">
.TimeComponent {
  position: absolute;
  top: 25px;
  right: 20px;
  z-index: 100;
  &-span {
    float: left;
    height: 36px;
    line-height: 36px;
    padding: 0 10px;
    margin-left: 10px;
    text-align: center;
    font-size: 14px;
    color: #333333;
    border: 1px solid #E6E6E6;
    border-radius: 4px;
    cursor: pointer;
    &:first-of-type {
      margin: 0;
    }
    &.on {
      border-color: #0087FF;
      color: #0087FF;
    }
  }
  &-date {
    float: left;
    width: 140px !important;
    margin-right: 10px;
    .el-input__inner {
      font-size: 14px;
      text-align: center;
      padding: 0 10px;
    }
  }
}
</style>
