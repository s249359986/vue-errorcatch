const webpack = require('webpack')
const webpackConfig = require('./webpack.config.js')
// const ora = require('ora')
const chalk = require('chalk')
const argv = require('yargs').argv
let options = {evn:argv['env']}
let compiler = null
compiler = webpack(webpackConfig)
console.log('argv',argv)
console.log('\nbuilding...')
compiler.run((err, stats) => {
  if (err) throw err

  process.stdout.write(stats.toString({
    colors: true,
    modules: false,
    children: false,
    chunks: false,
    chunkModules: false
  }) + '\n\n')

  if (stats.hasErrors()) {
    console.log(chalk.red('  Build failed with errors.\n'))
    process.exit(1)
  }

  console.log(chalk.green('  Build successfully.\n'))
})
