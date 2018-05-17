<template>
  <div>
    <AppNav></AppNav>
    <div class="container-fluid">
      <div class="row">
        <SideBar></SideBar>
        <div class="col-sm-9 col-sm-offset-3 col-md-12 col-md-offset-0 main">
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
  left: 170px;
  bottom: 0;
  padding: 0;
  overflow-y: auto;
}

</style>
