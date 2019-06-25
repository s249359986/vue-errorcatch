const path = require('path')
const express = require('express')
const bodyParser = require('body-parser')
//const devConfig = require('../project-config').dev
// devConfig.type = 'dev'

const webpack = require('webpack')

const webpackDevConfig = require('./webpack.config')

const webpackDevMiddleware = require('webpack-dev-middleware')
const webpackHotMiddleware = require('webpack-hot-middleware')
const argv = require('yargs').argv
let options = {evn:argv['env']}
let webpackConfig = webpackDevConfig(options)
const compiler = webpack(webpackConfig)

const devMiddleware = webpackDevMiddleware(compiler, {
    publicPath: webpackConfig.output.publicPath,
    quiet: true
//   stats: {
//     colors: true,
//     chunks: false
//   }
})
const hotMiddleware = webpackHotMiddleware(compiler)


const cp = require('child_process')


const app = express()



app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())


compiler.plugin('compilation', function (compilation) {
  compilation.plugin('html-webpack-plugin-after-emit', function (data, cb) {
    hotMiddleware.publish({ action: 'reload' })
    cb()
  })
})

app.use(devMiddleware)
app.use(hotMiddleware)
app.use('/', express.static(path.resolve(__dirname, '..')))


//app.use('/', express.static(path.resolve(__dirname, '..')))
//app.use('/dist', express.static(path.resolve(__dirname, '../dist')))

const port =  8081

module.exports = app.listen(port, function () {
  console.log('Server listening on http://localhost:' + port)
})
