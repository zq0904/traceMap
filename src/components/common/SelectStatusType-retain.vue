<!-- 待抽取 -->
<template>
  <!-- 下拉框 状态 和 污染源类型 -->
  <div>
    <el-select v-model="nowStatus" filterable placeholder="请选择状态"
      :size="size">
      <el-option
        v-for="item in status"
        :key="item.code"
        :label="item.name"
        :value="item.code">
      </el-option>
    </el-select>
    <el-select v-model="nowType" filterable placeholder="请选择污染源类型"
      :size="size">
      <el-option
        v-for="item in type"
        :key="item.code"
        :label="item.name"
        :value="item.code">
      </el-option>
    </el-select>
  </div>
</template>
<script>
export default {
  props: {
    size: { // medium/small/mini
      type: String,
      default: 'mini'
    }
  },
  data() {
    return {
      size: ''
      status: [],
      type: [],
      nowStatus: '',
      nowType: ''
    }
  },
  created() {

  },
  methods: {

  }
}

</script>
<style lang="scss">

</style>
