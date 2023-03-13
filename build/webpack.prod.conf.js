const path = require('path');
const utils = require('./utils');
const webpack = require('webpack');
const config = require('./config');
const merge = require('webpack-merge');
const baseWebpackConfig = require('./webpack.base.conf');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const ScriptExtHtmlWebpackPlugin = require('script-ext-html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const StopEmitPlugin = require('./plugin/stopemit-webpack-plugin');
const ClearDirtPlugin = require('./plugin/cleardirt-webpack-plugin');
const TerserWebpackPlugin = require('terser-webpack-plugin');
const {
  getHtmlPlugins
} = require('./entryUtil');

const env = require('./config/prod.env');

// For NamedChunksPlugin
const seen = new Set();
const nameLength = 4;

const webpackConfig = merge(baseWebpackConfig, {
  mode: 'production',
  module: {
    rules: utils.styleLoaders({
      sourceMap: config.build.productionSourceMap,
      extract: true,
      usePostCSS: true
    })
  },
  devtool: config.build.productionSourceMap && !config.build.bundleAnalyzerReport ? config.build.devtool : false,
  output: {
    path: config.build.assetsRoot,
    filename: utils.assetsPath('js/[name].[chunkhash:8].js'),
    chunkFilename: utils.assetsPath('js/[name].[chunkhash:8].js')
  },
  plugins: [
    // http://vuejs.github.io/vue-loader/en/workflow/production.html
    // https://www.webpackjs.com/plugins/define-plugin/
    new webpack.DefinePlugin({
      'process.env': env,
      'isProd': JSON.stringify(true) // 可以控制是否打印日志
    }),
    // extract css into its own file
    new MiniCssExtractPlugin({
      filename: utils.assetsPath('css/[name].[contenthash:8].css'),
      chunkFilename: utils.assetsPath('css/[name].[contenthash:8].css')
    }),
    new webpack.IgnorePlugin({
      checkResource(resource, context) {
        if (/moment/.test(context) && /\.\/locale/.test(resource)) {
          return true;
        }
        if (/uiBaseDoc/.test(resource)) {
          return true;
        }
        return false;
      }
    }),
    ...getHtmlPlugins('production'),
    // generate dist index.html with correct asset hash for caching.
    // you can customize output by editing /index.html
    // see https://github.com/ampedandwired/html-webpack-plugin

    new ScriptExtHtmlWebpackPlugin({
      // 提取runtime代码到html
      // `runtime` must same as runtimeChunk name. default is `runtime`
      inline: /runtime\..*\.js$/
    }),
    // keep chunk.id stable when chunk has no name
    new webpack.NamedChunksPlugin(chunk => {
      if (chunk.name) {
        return chunk.name;
      }
      const modules = Array.from(chunk.modulesIterable);
      if (modules.length > 1) {
        const hash = require('hash-sum');
        const joinedHash = hash(modules.map(m => m.id).join('_'));
        let len = nameLength;
        while (seen.has(joinedHash.substr(0, len))) len++;
        seen.add(joinedHash.substr(0, len));
        return `chunk-${joinedHash.substr(0, len)}`;
      } else {
        return modules[0].id;
      }
    }),
    // keep module.id stable when vender modules does not change
    new webpack.HashedModuleIdsPlugin(),

    // copy custom static assets
    new CopyWebpackPlugin([{
      from: path.resolve(__dirname, '../static'),
      to: config.build.assetsSubDirectory,
      ignore: ['.*']
    }]),
    // copy page static assets
    new CopyWebpackPlugin([{
      from: path.resolve(__dirname, '../page'),
      to: config.build.otherPageDirectory
    }]),

  ],
  optimization: {
    splitChunks: {
      chunks: 'all',
      cacheGroups: {
        vendor_echarts: {
          test: /[\\/]node_modules[\\/]echarts[\\/]lib[\\/](?!chart)/,
          name: 'echarts',
          minChunks: 1,
          priority: 11,
          chunks: 'all'
        },
        vendor_other: {
          test: /^((?!echarts).)*([\\/]node_modules[\\/])(?!echarts)/,
          name: 'vendor',
          priority: 10,
          chunks: 'all'
        },
        // common: {
        //   name: 'common',
        //   test: /[\\/]client[\\/](base|plugin|store|common|jsxUtils)[\\/]/,
        //   minChunks: 2,
        //   priority: 5,
        //   reuseExistingChunk: true,
        //   chunks: 'all'
        // }
      }
    },
    runtimeChunk: 'single',
    minimizer: [
      // Compress extracted CSS. We are using this plugin so that possible
      // duplicated CSS from different components can be deduped.
      new OptimizeCSSAssetsPlugin(),
      new TerserWebpackPlugin({
        terserOptions: {
          compress: {
            warnings: true,
            drop_console: true,
            drop_debugger: true,
            pure_funcs: ['console.log', 'console.table'] // 删除console
          }
        }
      })
    ]
  }
});

/**
 * 非强力模式下，为增量缓存
 */
if (!~process.argv.indexOf('--force') && !config.build.bundleAnalyzerReport) {
  /**
   * 内容没有改变，已经打包的文件，不再打包
   */
  webpackConfig.plugins.push(new StopEmitPlugin({
    exclude: [path.join(config.build.assetsRoot, config.build.otherPageDirectory)]
  }));
  /**
   * release分支打包时，清理一下没有在map表中的文件
   */
  webpackConfig.plugins.push(new ClearDirtPlugin({
    branch: 'release',
    include: [path.join(config.build.assetsRoot, config.build.assetsSubDirectory, 'js'), path.join(config.build.assetsRoot, config.build.assetsSubDirectory, 'css'),],
    exclude: [path.join(config.build.assetsRoot, config.build.otherPageDirectory)]
  }));
}

/**
 * 是否压缩JS代码
 */
if (!~process.argv.indexOf('--disable-uglifyjs')) {
  webpackConfig.optimization.minimizer.unshift(new UglifyJsPlugin({
    uglifyOptions: {
      mangle: {
        safari10: true
      }
    },
    sourceMap: config.build.productionSourceMap,
    cache: true,
    parallel: true
  }));
}

/**
 * 是否进行生产环境Gizp压缩
 */
if (config.build.productionGzip) {
  const CompressionWebpackPlugin = require('compression-webpack-plugin');
  webpackConfig.plugins.push(
    new CompressionWebpackPlugin({
      algorithm: 'gzip',
      test: new RegExp(
        '\\.(' + config.build.productionGzipExtensions.join('|') + ')$'
      ),
      threshold: 10240,
      minRatio: 0.8
    })
  );
}

/**
 * 是否分析“性能报告”
 */
if (config.build.generateAnalyzerReport || config.build.bundleAnalyzerReport) {
  const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

  if (config.build.bundleAnalyzerReport) {
    webpackConfig.plugins.push(
      new BundleAnalyzerPlugin({
        analyzerPort: 8081,
        generateStatsFile: false
      })
    );
  }

  if (config.build.generateAnalyzerReport) {
    webpackConfig.plugins.push(
      new BundleAnalyzerPlugin({
        analyzerMode: 'static',
        reportFilename: 'bundle-report.html',
        openAnalyzer: false
      })
    );
  }
}

module.exports = webpackConfig;
