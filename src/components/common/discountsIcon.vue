<template>
  <span :class="discountsClass"></span>
</template>
<script>
export default {
  props: {
    size: {
      type: Number,
      default: 24
    },
    type: {
      type: Number,
      required: true,
      validator: function (value) {
        return value >= 0
      }
    },
    // '' 背景白色 solid背景有颜色
    solid: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      supportsMap: ['decrease', 'discount', 'guarantee', 'invoice', 'special']
    }
  },
  computed: {
    discountsClass() {
      return this.supportsMap[this.type] + ' discounts' + this.size + this.solid
    }
  }
}

</script>
<style lang="scss">
@import '../../assets/scss/app';
$url: '../../assets/images/';
.discounts24 {
  @include _icon(24, 24, 0);
  vertical-align: top;
  &.decrease {
    @include background-image($url + 'decrease_1');
  }
  &.discount {
    @include background-image($url + 'discount_1');
  }
  &.guarantee {
    @include background-image($url + 'guarantee_1');
  }
  &.invoice {
    @include background-image($url + 'invoice_1');
  }
  &.special {
    @include background-image($url + 'special_1');
  }
}

.discounts32 {
  @include _icon(32, 32, 0);
  vertical-align: top;
  &.decrease {
    @include background-image($url + 'decrease_2');
  }
  &.discount {
    @include background-image($url + 'discount_2');
  }
  &.guarantee {
    @include background-image($url + 'guarantee_2');
  }
  &.invoice {
    @include background-image($url + 'invoice_2');
  }
  &.special {
    @include background-image($url + 'special_2');
  }
}

.discounts24solid {
  @include _icon(24, 24, 0);
  vertical-align: top;
  &.decrease {
    @include background-image($url + 'decrease_3');
  }
  &.discount {
    @include background-image($url + 'discount_3');
  }
  &.guarantee {
    @include background-image($url + 'guarantee_3');
  }
  &.invoice {
    @include background-image($url + 'invoice_3');
  }
  &.special {
    @include background-image($url + 'special_3');
  }
}
</style>
