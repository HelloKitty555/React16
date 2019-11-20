module.exports = {
  // 指定校验的ECMAScript的版本及特性
  "parserOptions": {
    "ecmaVersion": 7, // ECMAScript版本，7为ES7
    "sourceType": "module", //默认script，如果代码是ECMAScript模块，设置为module
    "ecmaFeatures": { // 使用额外的语言特性
        "jsx": true // 启用JSX
    }
  },
  "parser": "babel-eslint",
  // 当访问未定义的变量时，no-undef 规则将发出警告
  // 指定脚本的运行环境。每种环境都有一组特定的预定义全局变量
  "env": {
    "es6": true,
    "node": true,
    "browser": true,
  },
  // 当访问未定义的变量时，no-undef 规则将发出警告
  // 脚本在执行期间访问的额外的全局变量
  "globals": {
    "document": true,
    "navigator": true,
    "window":true,
    "node":true
  },
  // 使用airbnb的规范
  "extends": "airbnb",
  // eslint-config-airbnb包括了以下3个插件
  "plugins": [
    "react",
    "jsx-a11y",
    "import",
    "react-hooks"
  ],
  // 定义自己的规则
  "rules": {
    'generator-star-spacing': 0,
    'no-new': 0,
    'space-before-function-paren': 0,
    'comma-dangle': 0,
    'semi': [2, 'never'],
    'indent': ['error', 2, { 'SwitchCase': 1 }],
    "no-var": 2,
    'arrow-parens': 0,
    'generator-star-spacing': 0,
    "prefer-const": [2, {
      "destructuring": "any",
      "ignoreReadBeforeAssign": false
    }],
    "import/no-unresolved": [
      "error",
      {
        "ignore": ['components/', 'containers/', 'network/', 'utils/', '_redux/', 'assets/']
      }
    ],
    "react/destructuring-assignment": [2, "always", { "ignoreClassFields": true }],
    "eqeqeq": 0,
    'no-debugger': process.env.NODE_ENV === 'production' ? 2 : 0,
    'linebreak-style': ["off", "windows"],
    "react-hooks/rules-of-hooks": "error", // 检查 react Hook 的规则
    "react-hooks/exhaustive-deps": "warn" // 检查 react effect 的依赖
  }
};