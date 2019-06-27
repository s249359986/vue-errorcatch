var pkg = require('../package.json');
const path = require('path')
var webpack = require('webpack');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const argv = require('yargs').argv
const APP_NS = process.env.APP_NS
console.log('APP_NS',APP_NS)
let options = {evn:argv['env']}
  let mode = 'development'// options['evn'] ==! 'test' ? 'development' : 'production'
  let config =  {  
    mode: mode,
    devtool: 'source-map',
    entry: {
      errorcatch: path.resolve(__dirname, '../src/error.js')
    },    
    output: {
      path: path.resolve(__dirname, '../dist/vue-errorcatch'),
      filename: '[name].js',
      library: 'VueError',
      libraryTarget: 'umd',
      // libraryExport: 'default', 
      publicPath: '/'
      
    },
    module: {      
      rules:[
      //   {
      //     test: /\.json$/,
      //     exclude: /node_modules/,
      //     type: 'javascript/auto',  // 加上type
      //     loader: 'json-loader'        
      // },
      //   {
      //   test: /\.(html)$/,
      //   use: {
      //     loader: 'html-loader',
      //     options: {
      //       attrs: [':data-src']
      //     }
      //   }
      // },
      {
        test: /\.js$/,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: 'babel-loader'          
        }
      },
    //   {
    //     test: /\.less$/,
    //     use: [{
    //         loader: "style-loader" // creates style nodes from JS strings
    //     }, {
    //         loader: "css-loader" // translates CSS into CommonJS
    //     }, {
    //         loader: "less-loader" // compiles Less to CSS
    //     }]
    // },
  //   {
  //     test:/\.vue$/,
  //     loader:'vue-loader'
  // }
]      
    },
    plugins: [
      new webpack.DefinePlugin({
        'process.env.APP_NS': JSON.stringify(process.env.APP_NS)
      }),
      new CleanWebpackPlugin(),
      new webpack.BannerPlugin([
        'vue-errorcatch v' + pkg.version + ' (' + pkg.homepage + ')',
        '',
        '这是一个vue插件可以捕获全局异常包括同步异常和异步异常，同样可以捕获vuex异常',             
      ].join('\n'))     
      // ,new ExtractTextPlugin('[name].min.css') // 将css独立打包
    ]
  }
module.exports = config