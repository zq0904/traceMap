<template>
  <div class="RankingBtn">
    <span class="RankingBtn-span"
      v-for="(item, index) in mapBtn" :key="index"
      :class="nowCity.text === item.text ? 'on' : ''"
      @click.stop="nowCity = item">{{ item.text }}</span>
  </div>
</template>

<script>
export default {
  data () {
    return {
      nowCity: { // 默认值
        text: '站点排名',
        val: 'site'
      },
      mapBtn: [
        {
          text: '站点排名',
          val: 'site'
        },
        {
          text: '市内排名',
          val: 'town'
        },
        {
          text: '74城市',
          val: '74town'
        },
        {
          text: '2+26城市排名',
          val: '28town'
        },
        {
          text: '338城市',
          val: '338town'
        }
      ]
    }
  },
  watch: {
    nowCity: {
      handler(val) {
        this.$emit('change-city', val)
      }
    }
  }
}
</script>

<style lang="scss">
@import '../../assets/scss/app';

  .RankingBtn {
    float: left;
    margin: 20px 0 20px 20px;
    height: 46px;
    line-height: 46px;
    text-align: center;
    border: 1px solid #E6E6E6;
    border-radius: 4px;
    &-span {
      float: left;
      position: relative;
      height: 46px;
      padding: 0 20px;
      font-size: 14px;
      color: #333333;
      cursor: pointer;
      &::before {
        position: absolute;
        content: '';
        top: 50%;
        right: 0;
        height: 24px;
        @include c3(transform, translate3d(0, -50%, 0));
        border-right: 1px solid #E6E6E6;
      }
      &:last-of-type::before {
        content: none;
      }
      &.on {
        color: #0087FF;
      }
    }
  }
</style>
