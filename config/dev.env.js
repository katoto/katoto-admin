'use strict'
const merge = require('webpack-merge')
const prodEnv = require('./prod.env')

module.exports = merge(prodEnv, {
  NODE_ENV: '"development"',
  BASE_API: '"http://192.168.30.13:8010"',
  // BASE_API: '"https://www.easy-mock.com/mock/5c88aeab4c25252b7c484902/katoto"',
})
