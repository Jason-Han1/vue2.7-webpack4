/**
 * prettier格式化规则配置
 * https://prettier.io/docs/en/options.html
 */
// module.exports = {
//   trailingComma: "es6",
//   tabWidth: 2,
//   // semi: false,
//   // singleQuote: true
// };
module.exports = {
  printWidth: 100, //一行的字符数，如果超过会进行换行，默认为80
  tabWidth: 2, //一个tab代表几个空格数，默认为2
  useTabs: false, //是否使用tab进行缩进，默认为false，表示用空格进行缩减
  //代码的解析引擎，默认为babylon，与babel相同。
  overrides: [
    {
      files: '*.js',
      options: {
        parser: 'babel',
        singleQuote: true, //字符串是否使用单引号，默认为false，使用双引号
        semicolons: true, // 在语句的末尾打印分号。
        semi: true, //行尾是否使用分号，默认为true
        bracketSpacing: false, //对象大括号之间是否有空格，默认为true，效果：{foo: bar}
        arrowFunctionParentheses: 'avoid', // 箭头函数"avoid" 尽可能省略括号  "always"
        trailingComma: 'none', //是否使用尾逗号，有三个可选值"<none|es5|all>"
        quoteprops: 'preserve' // 引用对象中的属性时更改 as-needed consistent  preserve
      }
    },
    {
      files: '*.vue',
      options: {
        parser: 'vue',
        singleQuote: true, //字符串是否使用单引号，默认为false，使用双引号
        semicolons: true, // 在语句的末尾打印分号。
        bracketSpacing: false, //对象大括号之间是否有空格，默认为true，效果：{foo: bar}
        htmlWhitespaceSensitivity: 'strict', // "css" "strict" "ignore"
        arrowFunctionParentheses: 'avoid', // 箭头函数"avoid" 尽可能省略括号  "always"
        semi: true, //行尾是否使用分号，默认为true
        vueIndentScriptAndStyle: false // false不要在 Vue 文件中缩进脚本和样式标记
      }
    },
    {
      files: '*.{scss, css}',
      options: {
        parser: 'scss'
      }
    }
  ]
};

// {
//   "semi": false,
//   "overrides": [
//     {
//       "files": "*.test.js",
//       "options": {
//         "semi": true
//       }
//     },
//     {
//       "files": ["*.html", "legacy/**/*.js"],
//       "options": {
//         "tabWidth": 4
//       }
//     }
//   ]
// }
