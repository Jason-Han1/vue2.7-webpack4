
const path = require('path');
const utils = require('./utils');
const config = require('./config');
const VueLoaderPlugin = require('vue-loader/lib/plugin');
const {
  getContext,
  getEntrys
} = require('./entryUtil');

function resolve(dir) {
  return path.join(__dirname, '..', dir);
}

module.exports = {
  context: getContext(),
  entry: getEntrys(),
  externals: {
    // 'vue': 'Vue',
    // 'element-ui': 'ELEMENT'
  },
  output: {
    path: config.build.assetsRoot,
    filename: '[name].js',
    publicPath: process.env.NODE_ENV === 'production' ?
      config.build.assetsPublicPath : config.dev.assetsPublicPath
  },
  resolve: {
    extensions: ['.js', '.vue', '.json'],
    alias: {
      '@': resolve('client'),
      '_@': resolve('static'),
      '@static': resolve('static'),
      // '@common': resolve('client/components'),
      '@views': resolve('client/views'),
      '@mixins': resolve('client/mixins'),
    }
  },
  module: {
    rules: [{
        test: /\.vue$/,
        use: ['vue-loader']
      },
      {
        test: /\.m?jsx?$/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env',
          ],
            // 开启缓存
            cacheDirectory:true
          },
        },
      },
      {
        test: /\.js$/,
        include: [
          resolve('client'),
          // 如需兼容IE请取消下面注释代码
          // resolve('node_modules/webpack-dev-server/client'),
          // resolve('node_modules/is-ip'),
          // resolve('node_modules/is-cidr'),
          // resolve('node_modules/ip-regex'),
          // resolve('node_modules/cidr-regex'),
          // resolve('node_modules/js-base64'),
          // resolve('node_modules/crypt'),
          // resolve('node_modules/crypto-js'),
          // resolve('utils')
        ],
        // use:['babel-loader?cacheDirectory']
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env',
            // {
            //     //  按需加载
            //     useBuiltIns: 'usage',
            //     //  指定core-js版本
            //     corejs: {
            //         version: 3
            //     },
            //     //  指定兼容性到浏览器的哪个版本
            //     targets: {
            //         chrome: '60',
            //         firefox: '60',
            //         ie: '10',
            //         safari: '50',
            //         edge: '17'
            //     }
            // }
          ],
            // 开启缓存
            cacheDirectory:true
          },
        },
      },
      {
        test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          // limit: 10,
          name: utils.assetsPath('img/[name].[hash:7].[ext]')
        }
      },
      {
        test: /\.(mp4|webm|ogg|mp3|wav|flac|aac)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: utils.assetsPath('media/[name].[hash:7].[ext]')
        }
      },
      {
        test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: 10000,
          name: utils.assetsPath('fonts/[name].[hash:7].[ext]')
        }
      },
    ]
  },
  plugins: [
    new VueLoaderPlugin()
  ],
  node: {
    // prevent webpack from injecting useless setImmediate polyfill because Vue
    // source contains it (although only uses it if it's native).
    setImmediate: false,
    // prevent webpack from injecting mocks to Node native modules
    // that does not make sense for the client
    dgram: 'empty',
    fs: 'empty',
    net: 'empty',
    tls: 'empty',
    child_process: 'empty'
  }
};
