import Vue from 'vue'
import App from './App.vue'
//import VueError from '../lib/error.js'
import VueError from '../lib/errorcatch.js'
// var VueError = require('../lib/errorcatch.js');

//import VueError from '../lib/errorcatch.js'
console.log('vueerrorcatch',VueError)
Vue.config.productionTip = false
Vue.use(VueError)

let vue = new Vue({
  render: h => h(App),
}).$mount('#app')
vue.$throw('ss')