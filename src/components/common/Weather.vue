<template>
  <div class="weather">
    <p>实时天气状况</p>
    <p>气温: {{ data.temperature }}℃</p>
    <p>湿度: {{ data.humidity }}%</p>
    <p>天气: {{ data.weatherText }}</p>
    <p>风级: {{ data.windRank }}</p>
    <p>风速: {{ data.windSpeed }}m/s</p>
    <p>风向: {{ data.windDirection }}</p>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
  props: {
  },
  data () {
    return {
      data: {}
    }
  },
  computed: {
    ...mapGetters({
      api: 'getApi'
    })
  },
  created() {
    this.request()
  },
  methods: {
    // 请求 实时天气信息
    async request() {
      const {data} = await this.$fetch({ url: this.api.weatherInfo })
      // console.log(data)
      this.data = data.result
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
