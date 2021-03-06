'use strict'
const utils = require('./utils')
const glob = require('glob')
const webpack = require('webpack')
const config = require('../config')
const merge = require('webpack-merge')
const path = require('path')
const baseWebpackConfig = require('./webpack.base.conf')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const FriendlyErrorsPlugin = require('friendly-errors-webpack-plugin')
const portfinder = require('portfinder')

const HOST = process.env.HOST
const PORT = process.env.PORT && Number(process.env.PORT)

var dev_env;
if(process.env.npm_config_argv){
  var test_argv = JSON.parse(process.env.npm_config_argv).original[1];
  if(test_argv=='test'){
    dev_env = require('../config/test.env');
  }else{
    dev_env = require('../config/dev.env');
  }
}
console.log(dev_env);

//--------------------------------------------------------------------new start-----------------------------------------
const express = require('express')
const app = express()
var apiRoutes = express.Router()

var appData = require('../data/config')
// var appData = require('../data/index/goods')
var getapi= appData['get'];//所有的get请求
var postapi= appData['post'];//所有的post请求

// var seller = appData.seller
var goods = appData.goods

//查找所有的json文件
var entryJS = {};
entryJS = glob.sync('./data/**/*.json').reduce(function (prev, curr) {
  prev[curr.slice(7)] = '.'+curr;
  return prev;
}, {});
console.log(entryJS)
// //合并所有的json文件到一个json中
let jsondata={};
for (var i in entryJS){
  let data=require(entryJS[i]);
  console.log(i);
  jsondata=Object.assign(jsondata,data);
}
console.log(jsondata)
app.use('/', apiRoutes)
//--------------------------------------------------------------------new end-------------------------------------

const devWebpackConfig = merge(baseWebpackConfig, {
  module: {
    rules: utils.styleLoaders({ sourceMap: config.dev.cssSourceMap, usePostCSS: true })
  },
  // cheap-module-eval-source-map is faster for development
  devtool: config.dev.devtool,

  // these devServer options should be customized in /config/index.js
  devServer: {
    clientLogLevel: 'warning',
    historyApiFallback: {
      rewrites: [
        { from: /.*/, to: path.posix.join(config.dev.assetsPublicPath, 'index.html') },
      ],
    },
    hot: true,
    contentBase: false, // since we use CopyWebpackPlugin.
    compress: true,
    host: HOST || config.dev.host,
    port: PORT || config.dev.port,
    open: config.dev.autoOpenBrowser,
    overlay: config.dev.errorOverlay
      ? { warnings: false, errors: true }
      : false,
    publicPath: config.dev.assetsPublicPath,
    proxy: config.dev.proxyTable,
    quiet: true, // necessary for FriendlyErrorsPlugin
    watchOptions: {
      poll: config.dev.poll,
    },
     //--------------------------------------------------------------------new start----------------------------------
    before (app) {
      //处理get请求的
      for(var i=0;i<getapi.length;i++){
        let gdata=jsondata[getapi[i].value];
        app.get(getapi[i].key,function (req,res) {
          res.json(gdata);
        });
      }
      //处理post请求的
      for(var i=0;i<postapi.length;i++){
        let pdata=jsondata[postapi[i].value];
        app.post(postapi[i].key,function (req,res) {
          res.json(pdata);
        });
      }
    }
    //--------------------------------------------------------------------new end----------------------------------
 
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env': dev_env
    }),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NamedModulesPlugin(), // HMR shows correct file names in console on update.
    new webpack.NoEmitOnErrorsPlugin(),
    // https://github.com/ampedandwired/html-webpack-plugin
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: 'index.html',
      inject: true
    }),
    // copy custom static assets
    new CopyWebpackPlugin([
      {
        from: path.resolve(__dirname, '../static'),
        to: config.dev.assetsSubDirectory,
        ignore: ['.*']
      }
    ])
  ]
})

module.exports = new Promise((resolve, reject) => {
  portfinder.basePort = process.env.PORT || config.dev.port
  portfinder.getPort((err, port) => {
    if (err) {
      reject(err)
    } else {
      // publish the new Port, necessary for e2e tests
      process.env.PORT = port
      // add port to devServer config
      devWebpackConfig.devServer.port = port

      // Add FriendlyErrorsPlugin
      devWebpackConfig.plugins.push(new FriendlyErrorsPlugin({
        compilationSuccessInfo: {
          messages: [`Your application is running here: http://${devWebpackConfig.devServer.host}:${port}`],
        },
        onErrors: config.dev.notifyOnErrors
        ? utils.createNotifierCallback()
        : undefined
      }))

      resolve(devWebpackConfig)
    }
  })
})
