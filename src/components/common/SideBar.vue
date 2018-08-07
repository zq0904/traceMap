<template>
  <div class="sidebar">
    <el-menu
      ref="menu"
      class="el-menu-vertical"
      :default-active="$route.path"
      text-color="#333333"
      active-text-color="#0087ff"
      :unique-opened="true"
      :router="true"
      @open="handleOpen"
      @close="handleClose"
      @select="handleSelect">
      <el-menu-item index="/">
        <i class="SideBar SideBar-01"></i>
        <span slot="title">首页</span>
      </el-menu-item>
      <el-submenu index="2"> <!-- li -->
        <template slot="title">
          <i class="SideBar SideBar-02" data-flag="2"></i>
          <span alias="空气">溯源</span>
        </template>
        <el-menu-item index="/air">溯源地图</el-menu-item>
        <el-menu-item index="/air/list">数据排行</el-menu-item>
        <!-- <el-menu-item-group>
          <template slot="title">分组一</template>
          <el-menu-item index="1-1">选项1</el-menu-item>
          <el-menu-item index="1-2">选项2</el-menu-item>
        </el-menu-item-group> -->
      </el-submenu>
      <el-submenu index="3">
        <template slot="title">
          <i class="SideBar SideBar-03" data-flag="3"></i>
          <span slot="title" alias="溯源">溯点</span>
        </template>
        <el-menu-item index="/traceSource">溯点地图</el-menu-item>
        <el-menu-item index="/alarmRuleConfig">报警规则配置</el-menu-item>
      </el-submenu>
      <el-submenu index="4">
        <template slot="title">
          <i class="SideBar SideBar-04" data-flag="4"></i>
          <span slot="title" alias="污染源">溯责</span>
        </template>
        <el-menu-item index="/pollutionSource">溯责地图</el-menu-item>
        <el-menu-item index="/pollutionSource/list">溯责报表</el-menu-item>
      </el-submenu>
    </el-menu>
  </div>
</template>
<script>
import $ from 'jquery'

export default {
  data() {
    return {
      indexs: {
        '2': ['/air', '/air/list'],
        '3': ['/traceSource', '/alarmRuleConfig'],
        '4': ['/pollutionSource', '/pollutionSource/list']
      }
    }
  },
  mounted() {
    this.defaultUnfold()
    this.handleDom()
  },
  methods: {
    // 根据路由 设置默认展开
    defaultUnfold() {
      const path = this.$route.path
      if (path === '/') { // 首页关闭所有
        for (let key in this.indexs) {
          this.$refs.menu.close(key)
        }
        return false
      }
      for (let key in this.indexs) {
        for (let e of this.indexs[key]) {
          if (path === e) {
            this.$refs.menu.open(key)
          }
        }
      }
    },
    // 操作dom
    handleDom() {
      const menu = this.$refs.menu
      // 鼠标移入侧边栏头部 展开子项
      $('.sidebar .el-submenu__title').on('mouseenter', function() {
        menu.open($(this).children('.SideBar').data('flag'))
      })
      // 鼠标移出ul范围 设置默认展开
      $('.sidebar ul[role="menubar"]').on('mouseleave', this.defaultUnfold)
    },
    handleOpen(index, indexPath) {
      // console.log('handleOpen', index, indexPath)
    },
    handleClose(index, indexPath) {
      // 由于没有before钩子 事件解绑也不好使
      // 点击表头关闭 立即展开 默认选中第一个
      this.$refs.menu.open(index)
      this.$router.push(this.indexs[index][0])
      // console.log('handleClose', index, indexPath)
    },
    handleSelect(index, indexPath) {
      // console.log('handleSelect', index, indexPath)
    }
  }
}

</script>
<style lang="scss">
.sidebar {
  overflow: hidden;
  position: fixed;
  top: 50px;
  bottom: 0;
  left: 0;
  width: 160px;
  padding: 0;
  text-align: center;
  border: 0 none;
  background-color: #fff;
  border-right: 1px solid #E6E8EA;
}
// 侧栏样式
.el-menu-vertical {
  .el-menu-item {
    min-width: 160px;
    padding: 0 16px 0 52px !important;
    text-align: left;
    box-sizing: border-box;
    font-size: 14px;
    &.is-active {
      position: relative;
      background-color: #ecf5ff;
      &::before {
        content: '';
        position: absolute;
        top: 0;
        left: 0;
        height: 50px;
        width: 2px;
        border-left: 2px solid #0087ff;
      }
    }
  }
  &.el-menu {
    border: 0 none;
  }
  .el-submenu__title, > .el-menu-item {
    height: 50px;
    line-height: 50px;
    padding: 0 20px !important;
    text-align: left;
  }
  // SideBar icon
  .SideBar {
    display: inline-block;
    width: 20px;
    height: 20px;
    margin-right: 8px;
    &.SideBar-01 { background: url('../../assets/images/SideBar-01.png'); }
    &.SideBar-02 { background: url('../../assets/images/SideBar-02.png'); }
    &.SideBar-03 { background: url('../../assets/images/SideBar-03.png'); }
    &.SideBar-04 { background: url('../../assets/images/SideBar-04.png'); }
  }
}
</style>
