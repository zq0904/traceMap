<template>
  <div>
    <!-- 一级路由 -->
    <router-view></router-view>
    <!-- 全局loading -->
    <div v-loading.fullscreen.lock="loading"></div>
  </div>
</template>
<script>
import { mapState } from 'vuex'

export default {
  data() {
    return {
    }
  },
  computed: {
    ...mapState([
      'loading'
    ])
  }
}
</script>
<style lang="scss">

</style>
