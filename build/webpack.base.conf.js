'use strict'
const path = require('path')
const utils = require('./utils')
const config = require('../config')
const vueLoaderConfig = require('./vue-loader.conf')

function resolve(dir) {
  return path.join(__dirname, '..', dir)
}

const createLintingRule = () => ({
  test: /\.(js|vue)$/,
  loader: 'eslint-loader',
  enforce: 'pre',
  include: [resolve('src'), resolve('test')],
  options: {
    formatter: require('eslint-friendly-formatter'),
    emitWarning: !config.dev.showEslintErrorsInOverlay
  }
})

module.exports = {
  context: path.resolve(__dirname, '../'),
  // npm install --save babel-polyfill 配置 E6 Api 转 E5
  entry: ["babel-polyfill", './src/main.js'], // 打包的入口文件路径
  output: {
    path: config.build.assetsRoot,
    filename: '[name].js',
    publicPath: process.env.NODE_ENV === 'production' ?
      config.build.assetsPublicPath :
      config.dev.assetsPublicPath
  },
  externals: { // 防止将import的包打入bundle中 而是在运行时直接用全局变量
    // a: 'zhaoqi' 当我们去import ZQ from 'a' 不去从node_modules里找依赖 而直接使用全局变量zhaoqi
    'BMap': 'BMap',
    'BMAP_ANCHOR_TOP_RIGHT': 'BMAP_ANCHOR_TOP_RIGHT',
    'BMAP_NORMAL_MAP': 'BMAP_NORMAL_MAP',
    'BMAP_SATELLITE_MAP': 'BMAP_SATELLITE_MAP',
    'BMAP_HYBRID_MAP': 'BMAP_HYBRID_MAP',
    'echarts': 'echarts',
    'd3': 'd3'
  },
  resolve: {
    extensions: ['.js', '.vue', '.json'],
    alias: {
      'vue$': 'vue/dist/vue.esm.js',
      '@': resolve('src'),
    }
  },
  module: {
    rules: [
      ...(config.dev.useEslint ? [createLintingRule()] : []),
      {
        test: /\.vue$/,
        loader: 'vue-loader',
        options: vueLoaderConfig
      },
      {
        test: /\.js$/,
        exclude: /(node_modules|bower_components)/, // 排除
        include: [resolve('src'), resolve('test'), resolve('node_modules/webpack-dev-server/client')],
        use: {
          loader: 'babel-loader',
          options: {
            cacheDirectory: true, // babel-loader 编译 将从缓存（node_modules .cache）中读取 提速
            presets: ['env'], // env 代表 babel-preset-env
            // npm install babel-plugin-transform-runtime --save-dev 及 npm install babel-runtime --save
            plugins: ['transform-runtime'] // 解决babel打包所带来的 插入辅助代码 导致代码体积过大的问题
          }
        }
      },
      {
        test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: utils.assetsPath('img/[name].[hash:7].[ext]')
        }
      },
      {
        test: /\.(mp4|webm|ogg|mp3|wav|flac|aac)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: utils.assetsPath('media/[name].[hash:7].[ext]')
        }
      },
      {
        test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: utils.assetsPath('fonts/[name].[hash:7].[ext]')
        }
      },
      { // npm i node-sass sass-loader -D 配置sass
        test: /\.scss$/,
        loaders: ["style", "css", "sass"]
      },
      { // npm install -D script-loader exports-loader 使用loader模块化加载 AMD 规范的模块Zeptos使其正常运行
        test: require.resolve('zepto'),
        loader: 'exports-loader?window.Zepto!script-loader'
      }
    ]
  },
  node: {
    // prevent webpack from injecting useless setImmediate polyfill because Vue
    // source contains it (although only uses it if it's native).
    setImmediate: false,
    // prevent webpack from injecting mocks to Node native modules
    // that does not make sense for the client
    dgram: 'empty',
    fs: 'empty',
    net: 'empty',
    tls: 'empty',
    child_process: 'empty'
  }
}
