'use strict'
const merge = require('webpack-merge')
const prodEnv = require('./prod.env')

module.exports = merge(prodEnv, {
  NODE_ENV: '"development"',
//   BASE_API: '"http://10.0.1.41:18010"', // 41 端口
  // BASE_API: '"http://192.168.30.13:8010"',
  BASE_API: '"http://149.129.138.180/admin/"',
  // BASE_API: '"https://www.easy-mock.com/mock/5c88aeab4c25252b7c484902/katoto"',
})
