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
// 覆盖element-ui table
.el-table {
  th {
    text-align: center;
    background-color: #ECF5FF;
    padding: 10px 0;
  }
  .has-gutter tr th {
    height: 35px;
    padding: 0;
    font-size: 14px;
    color: #333333;
    background-color: #ECF5FF;
    text-align: center;
    .cell {
      padding: 0;
    }
  }
  tbody td {
    text-align: center;
    padding: 12px 0;
  }
  .el-table__fixed-right-patch {
    background-color: #ECF5FF;
  }
  // 天坑的 高亮 样式！！！
  &.el-table--enable-row-hover .el-table__body tr:hover>td {
    background-color: #ECF5FF;
  }
  .cell {
    font-size: 12px;
    color: #666666;
    line-height: 1.1;
    padding: 0 10px;
  }
}
// 修补最小分页 样式 :small="true"
.pagination {
  display: inline-block;
  margin: 18px 0;
  border-radius: 4px;
  .el-input--mini input {
    margin-top: -2px;
  }
}
// 解决 上传图片 element-ui与bootstrap样式冲突
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
// 污染源地图 infoWindow 弹框样式
.sourceMap-infoWindow {
  position: relative;
  background-color: #fff;
  width: 506px;
  padding: 0 9px;
  border-top: 4px solid #0087FF;
  border-radius: 5px;
  &-title {
    position: relative;
    height: 36px;
    padding: 10px 0 10px 12px;
    font-size: 16px;
    color: #333333;
    &::before {
      position: absolute;
      top: 10px;
      left: 0;
      content: '';
      height: 16px;
      border-left: 2px solid #0087FF;
    }
  }
  .row {
    margin: 0;
    line-height: 24px;
    .col-sm-6, .col-sm-12 {
      padding: 0;
      padding-right: 9px;
      font-size: 14px;
      lable {
        float: left;
        padding-right: 5px;
        color: #A8A8A8;
      }
      span {
        display: block;
        overflow: hidden;
        color: #333333;
      }
      img {
        float: left;
        width: 112.5px;
        height: 110px;
        margin-top: 10px;
        &:first-of-type {
          margin-right: 9px;
        }
      }
      .mock-img {
        margin-top: 10px;
        position: relative;
        width: 112.5px;
        height: 110px;
        border: 1px solid #E6E6E6;
        background-color: #F3F9FF;
        &::before {
          content: '';
          width: 40px;
          height: 2px;
          background-color: #D6D8DA;
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate3d(-50%, -50%, 0);
        }
        &::after {
          content: '';
          height: 40px;
          width: 2px;
          background-color: #D6D8DA;
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate3d(-50%, -50%, 0);
        }
      }
    }
    .col-sm-12 span {
      overflow: inherit;
    }
  }
  .designate {
    position: relative;
    height: 77px;
    line-height: 77px;
    text-align: center;
    span {
      position: absolute;
      top: 50%;
      left: 50%;
      width: 100px;
      height: 36px;
      line-height: 36px;
      cursor: pointer;
      font-size: 18px;
      color: #007FF5;
      border: 1px solid #007FF5;
      background-color: #fff;
      transform: translate3d(-50%, -50%, 0);
      border-radius: 5px;
      &:active {
        background-color: #007FF5;
        color: #fff;
      }
    }
  }
  &::before {
    position: absolute;
    content: '';
    left: 50%;
    bottom: -16px;
    transform: translateX(-50%);
    border: 8px solid transparent;
    border-left: 9px solid transparent;
    border-right: 9px solid transparent;
    border-top-color: #fff;
  }
}
</style>
