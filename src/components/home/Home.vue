<template>
  <div>
    <AppNav></AppNav>
    <div class="container-fluid">
      <div class="row">
        <SideBar></SideBar>
        <div class="main">
          <!-- 二级路由 -->
          <router-view></router-view>

        </div>
      </div>
    </div>
  </div>
</template>
<script>
import AppNav from '../common/AppNav'
import SideBar from '../common/SideBar'

export default {
  components: {
    AppNav,
    SideBar
  },
  data() {
    return {

    }
  }
}

</script>
<style lang="scss">
.main {
  position: fixed;
  top: 50px;
  bottom: 0;
  left: 170px;
  right: 0;
  padding: 0;
  overflow-y: auto;
  z-index: 2000;
  > * { // 撑开任何二级路由
    width: 100%;
    height: 100%;
  }
}

</style>
