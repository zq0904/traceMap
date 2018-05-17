<template>
  <div class="col-sm-3 col-md-1 sidebar">
    <ul class="nav nav-sidebar">
      <router-link tag="li" to="/"><a>首页</a></router-link>
      <router-link tag="li" to="/air"><a>空气</a></router-link>
      <router-link tag="li" to="/pollutionSource"><a>污染源</a></router-link>
      <router-link tag="li" to="/traceSource"><a>溯源</a></router-link>
    </ul>
    <!-- <ul class="nav nav-sidebar">
      <li><a href="">Nav item</a></li>
      <li><a href="">Nav item again</a></li>
      <li><a href="">One more nav</a></li>
      <li><a href="">Another nav item</a></li>
      <li><a href="">More navigation</a></li>
    </ul> -->
  </div>
</template>
<script>
export default {
  data() {
    return {

    }
  }
}

</script>
<style lang="scss">
 .sidebar {
  width: 170px;
  text-align: center;
 }
</style>
