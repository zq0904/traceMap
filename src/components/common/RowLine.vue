<template>
  <div class="rowLine" :style="'background-color:' + color"></div>
</template>

<script>
export default {
  props: {
    color: {
      type: String,
      default: '#F5F7FA'
    }
  },
  data () {
    return {

    }
  }
}
</script>

<style lang="scss">
.rowLine {
  width: 100%;
  height: 20px;
}
</style>
