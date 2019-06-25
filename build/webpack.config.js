var pkg = require('../package.json');
const path = require('path')
var webpack = require('webpack');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
let HtmlWebpackPlugin = require('html-webpack-plugin')
const CleanWebpackPlugin = require('clean-webpack-plugin');
const argv = require('yargs').argv
let options = {evn:argv['env']}
  let mode = options['evn'] === 'test' ? 'development' : 'production'
  let config =  {    
    mode: mode,
    devtool: 'source-map',
    entry: {
      qdebug: path.resolve(__dirname, '../src/vconsole.js')  //'../src/vconsole.js'
    },    
    output: {
      path: path.resolve(__dirname, '../dist/qdebug'),  //'../dist/qdebug',
      filename: '[name].min.js',
      library: 'QDebug',
      libraryTarget: 'umd',
      libraryExport: 'default',
      publicPath: '/'
      
    },
    module: {      
      rules:[
        {
          test: /\.json$/,
          exclude: /node_modules/,
          type: 'javascript/auto',  // 加上type
          loader: 'json-loader'        
      },
        {
        test: /\.(html)$/,
        use: {
          loader: 'html-loader',
          options: {
            attrs: [':data-src']
          }
        }
      },{
        test: /\.js$/,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: 'babel-loader'          
        }
      },{
        test: /\.less$/,
        use: [{
            loader: "style-loader" // creates style nodes from JS strings
        }, {
            loader: "css-loader" // translates CSS into CommonJS
        }, {
            loader: "less-loader" // compiles Less to CSS
        }]
    }
]      
    },
    plugins: [
      new CleanWebpackPlugin('dist',{root:path.resolve(__dirname, '..')})
      // new webpack.BannerPlugin([
      //   'vConsole v' + pkg.version + ' (' + pkg.homepage + ')',
      //   '',
      //   'Tencent is pleased to support the open source community by making vConsole available.',
      //   'Copyright (C) 2017 THL A29 Limited, a Tencent company. All rights reserved.',
      //   'Licensed under the MIT License (the "License"); you may not use this file except in compliance with the License. You may obtain a copy of the License at',
      //   'http://opensource.org/licenses/MIT',
      //   'Unless required by applicable law or agreed to in writing, software distributed under the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. See the License for the specific language governing permissions and limitations under the License.'
      // ].join('\n')),
      // new webpack.optimize.UglifyJsPlugin({
      //   compress: {
      //     warnings: false
      //   }
      // })
      // ,new ExtractTextPlugin('[name].min.css') // 将css独立打包
    ]
  }
module.exports = config