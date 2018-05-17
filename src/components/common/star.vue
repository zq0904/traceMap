<template>
  <div :class="starSizeClass" class="star">
    <span v-for="(item, index) in starTypeArr" :class="item" :key="index" class="item"></span>
  </div>
</template>
<script>
const starNumber = 5
const wholeStar = 'on'
const halfStar = 'half'
const noneStar = 'off'

export default {
  props: {
    size: {
      type: Number,
      default: 24
    },
    score: {
      type: Number,
      required: true,
      validator: function (value) {
        return value >= 0 && value <= 5
      }
    }
  },
  data() {
    return {}
  },
  computed: {
    starSizeClass() {
      return 'star-' + this.size
    },
    starTypeArr() {
      const result = []
      const score = Math.round(this.score * 2) / 2
      const fullNumber = Math.floor(score)
      const isFull = score % 1 === 0
      for (let i = 0; i < fullNumber; i++) {
        result.push(wholeStar)
      }
      if (!isFull) {
        result.push(halfStar)
      }
      while (result.length < starNumber) {
        result.push(noneStar)
      }
      return result
    }
  }
}

</script>
<style lang="scss">
@import '../../assets/scss/app';
$url: '../../assets/images/';
.star {
  @include c3(display, flex);
  @include c3(justify-content, space-between);
  margin: 0 auto;
}

.star-24 {
  @include wh(128, 24);
  .item {
    @include _icon(24, 24, 0);
  }
  .on {
    @include background-image($url + 'star24_on');
  }
  .half {
    @include background-image($url + 'star24_half');
  }
  .off {
    @include background-image($url + 'star24_off');
  }
}

.star-36 {
  @include wh(204, 36);
  .item {
    @include _icon(36, 36, 0);
  }
  .on {
    @include background-image($url + 'star36_on');
  }
  .half {
    @include background-image($url + 'star36_half');
  }
  .off {
    @include background-image($url + 'star36_off');
  }
}

.star-48 {
  @include wh(382, 48);
  .item {
    @include _icon(48, 48, 0);
  }
  .on {
    @include background-image($url + 'star48_on');
  }
  .half {
    @include background-image($url + 'star48_half');
  }
  .off {
    @include background-image($url + 'star48_off');
  }
}

</style>
