const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const config = require('./config');

function resolve(dir) {
  return path.join(__dirname, '..', dir);
}

const entrys = {
  app: {
    name: 'app',
    entry: ['babel-polyfill', './client/main.js'],
    urlRegex: /./,
    root: '',
    level: 'default', // default为默认模块
    htmlTemplate: 'index.html',
    htmlTemplateDev: 'index.html',
    htmlFileName: 'index.html',
    metaTitle: '自定义脚手架',
    faviconName: 'favicon.ico'
  }
};

/**
 * 获取html的路径
 * @param {*} path
 */
const getHtmlPath = (urlPath) => {
  let htmlName = entrys['app'].htmlFileName;
  for (const key in entrys) {
    if (key === 'app') continue;
    const regex = entrys[key].urlRegex;
    if (regex.test(urlPath)) {
      htmlName = entrys[key].htmlFileName;
      break;
    }
  }
  return path.join(config.build.assetsRoot, htmlName);
};

/**
 * 获取Entrys列表
 */
const getEntrys = () => {
  const entryContainer = Object.create(null);
  for (const item of Object.values(entrys)) {
    entryContainer[item.name] = item.entry;
  }
  return entryContainer;
};

/**
 * 获取上下文
 */
const getContext = () => {
  return path.resolve(__dirname, '../');
};

/**
 * 获取devServer  historyApiFallback的 rewrites配置
 */
const getDevRewrites = () => {
  const defaultRerite = {
    from: /./,
    to: '/index.html'
  };
  const rewrites = [];
  for (const item of Object.values(entrys)) {
    if (item.level === 'default') {
      defaultRerite.to = `/${item.htmlFileName}`;
    }
    if (item.level === 'moudle') {
      rewrites.push({
        from: item.urlRegex,
        to: `/${item.htmlFileName}`
      });
    }
  }
  rewrites.push(defaultRerite);
  return rewrites;
};


/**
 * 生成htmlplugin
 * @param {*} NODE_ENV
 */
const getHtmlPlugins = (NODE_ENV) => {
  const plugins = [];
  if (NODE_ENV === 'development') {
    for (const item of Object.values(entrys)) {
      plugins.push(new HtmlWebpackPlugin({
        filename: item.htmlFileName,
        template: item.htmlTemplateDev,
        inject: true,
        favicon: resolve(item.faviconName),
        title: item.metaTitle,
        chunks: [item.name]
      }));
    }
  }

  if (NODE_ENV == 'production') {
    for (const item of Object.values(entrys)) {
      plugins.push(new HtmlWebpackPlugin({
        filename: item.htmlFileName,
        template: item.htmlTemplate,
        inject: true,
        favicon: resolve(item.faviconName),
        title: item.metaTitle,
        templateParameters: {
          BASE_URL: config.build.assetsPublicPath + config.build.assetsSubDirectory
        },
        chunks: [item.name, 'vender', 'manifest'],
        minify: {
          removeComments: true,
          collapseWhitespace: true,
          removeAttributeQuotes: false
        }
      }));
    }
  }

  return plugins;
};

module.exports = {
  getEntrys,
  getContext,
  entrys,
  getDevRewrites,
  getHtmlPlugins,
  getHtmlPath
};
