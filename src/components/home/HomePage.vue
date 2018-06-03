<template>
  <div v-loading="loading">
    <!-- <div class="trace">
      <p class="text">报警报警报警报警报警报警报警报警报警报警报警报警报警报警报警报警报警报警报警报警报警报警</p>
      <button onclick="function () {console.log(1)}" type="button" class="btn btn-danger">去溯源</button>
      <el-button type="primary" icon="el-icon-edit"></el-button>
    </div> -->
  </div>
</template>
<script>
export default {
  data() {
    return {
      loading: true
    }
  },
  created() {
    this.$message('开发中...')
  }
}

</script>
<style lang="scss">
  .trace {
    width: 400px;
    padding: 10px;
    text-align:center;
    .text {
      margin-bottom: 20px;
      line-height: 16px;
    }
  }
</style>
