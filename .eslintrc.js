module.exports = {
  root: true,
  parserOptions: {
    parser: 'babel-eslint',
    sourceType: 'module'
  },
  env: {
    browser: true,
    node: true,
    es6: true,
  },
  extends: ['plugin:vue/recommended', 'eslint:recommended'],

  // add your custom rules here
  //it is base on https://github.com/vuejs/eslint-config-vue
  rules: {
    "no-debugger": 0,
    "indent": ['error', 4],//缩进风格
    "vue/html-indent": ['error', 4],
    'semi': [0],
    'semi-spacing': [0, {
      'before': false,
      'after': false
    }],
    "no-var": 0,//禁用var，用let和const代替
    "no-console":0,
    "no-unused-vars":1
  }
}

