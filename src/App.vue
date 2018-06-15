<template>
  <!-- 一级路由 -->
  <router-view></router-view>
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
// 公共样式

// 去掉百度地图logo和版权
.anchorBL {
  display: none;
}
// 修改BMapLib提示框下三角位置
.BMapLib_trans {
  top: auto !important;
}
// 公共颜色
.rgb-204-204-204 {
  background-color: rgb(204, 204, 204) !important;
}
.rgb-0-228-0 {
  background-color: rgb(0, 228, 0) !important;
}
.rgb-255-255-0 {
  background-color: rgb(255, 255, 0) !important;
}
.rgb-255-126-0 {
  background-color: rgb(255, 126, 0) !important;
}
.rgb-255-0-0 {
  background-color: rgb(255, 0, 0) !important;
}
.rgb-153-0-76 {
  background-color: rgb(153, 0, 76) !important;
}
.rgb-126-0-35 {
  background-color: rgb(126, 0, 35) !important;
}
// 覆盖element-ui 面包屑
.custom-breadcrumb {
  height: 45px;
  line-height: 45px;
  padding-left: 20px;
  font-size: 15px;
}
// 解决element-ui与bootstrap样式冲突
.el-upload__input {
  display: none !important;
}
// 空气 弹框样式
.air-tooltip {
  position: relative;
  width: 505px;
  padding: 0 10px;
  color: #383838;
  border-top: 4px solid #0087FF;
  border-radius: 5px;
  background-color: #fff;
  // 三角
  // &::before {
  //   position: absolute;
  //   content: '';
  //   left: 50%;
  //   bottom: -16px;
  //   transform: translateX(-50%);
  //   border: 8px solid transparent;
  //   border-left: 9px solid transparent;
  //   border-right: 9px solid transparent;
  //   border-top-color: #fff;
  // }
  &-h4 {
    height: 36px;
    line-height: 36px;
    font-size: 16px;
  }
  &-time {
    padding-left: 10px;
    font-size: 12px;
    color: #7C7C7C;
  }
  &-em {
    float: right;
    &.icon-wenhao {
      margin-left: 15px;
      font-size: 19px;
    }
    &.icon-shoucangxing2 {
      font-size: 18px;
      color: #CCCCCC;
      &.on {
        color: #FF0000;
      }
    }
    &::before {
      cursor: pointer;
    }
  }
  &-table {
    width: 485px;
    text-align: center;
    border-collapse: collapse;
    border: 1px solid #E6E6E6;
    &-tr {
      height: 30px;
      line-height: 30px;
      border: 1px solid #E6E6E6;
    }
    td {
      position: relative;
      width: 16.6666666%;
      border: 1px solid #E6E6E6;
      font-size: 14px;
    }
    &-td50 {
      width: 50%;
    }
  }
  // 首要污染物
  .tooltip-most {
    &-pm25 {
      td:nth-of-type(1)::before { content: ''; width: 8px; height: 8px; border-radius: 50%; background-color: red; position: absolute; top: 50%; left: 17px; transform: translateY(-50%); }
    }
    &-pm10 {
      td:nth-of-type(2)::before { content: ''; width: 8px; height: 8px; border-radius: 50%; background-color: red; position: absolute; top: 50%; left: 17px; transform: translateY(-50%); }
    }
    &-so2 {
      td:nth-of-type(3)::before { content: ''; width: 8px; height: 8px; border-radius: 50%; background-color: red; position: absolute; top: 50%; left: 17px; transform: translateY(-50%); }
    }
    &-no2 {
      td:nth-of-type(4)::before { content: ''; width: 8px; height: 8px; border-radius: 50%; background-color: red; position: absolute; top: 50%; left: 17px; transform: translateY(-50%); }
    }
    &-co {
      td:nth-of-type(5)::before { content: ''; width: 8px; height: 8px; border-radius: 50%; background-color: red; position: absolute; top: 50%; left: 17px; transform: translateY(-50%); }
    }
    &-o3 {
      td:nth-of-type(6)::before { content: ''; width: 8px; height: 8px; border-radius: 50%; background-color: red; position: absolute; top: 50%; left: 17px; transform: translateY(-50%); }
    }
  }
  .tooltip-weather {
    display: flex;
    justify-content: space-between;
    height: 54px;
    padding: 10px 18px;
    font-size: 14px;
    color: #999999;
    &-item {
      &-p {
        height: 17px;
        line-height: 17px;
      }
    }
  }
}
</style>
