<template>
  <div class="weather">
    <p>实时天气状况</p>
    <p>天气:晴</p>
    <p>风速:4级 (10km/h)</p>
    <p>风向:南风</p>
  </div>
</template>

<script>
export default {
  props: {

  },
  data () {
    return {

    }
  }
}
</script>

<style lang="scss">
  .weather {
    width: 170px;
    line-height: 17px;
    font-size: 14px;
  }
</style>
