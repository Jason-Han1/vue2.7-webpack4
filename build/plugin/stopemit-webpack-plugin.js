/**
 * stpo exit file emit
 */
const path = require('path');
const fs = require('fs');
const {getHashOfFilePromise} = require('../utils/getHash');

class StopEmitPlugin {
  constructor(option) {
    this.exclude = option.exclude || [];
  }
  apply(compiler) {
    compiler.hooks.emit.tapAsync('StopEmitPlugin', (compilation, callback) => {
      try {
        compilation.originAssets = [];
        const promiseAll = [];
        for (const key in compilation.assets) {
          compilation.assets[key].source.toString();
          const wholePath = path.join(compilation.compiler.outputPath, key);
          if (typeof wholePath === 'string') {
            compilation.originAssets.push(wholePath.trim());
          }

          if (!fs.existsSync(wholePath)) continue;

          // if (!!~wholePath.indexOf(this.exclude[0])) continue;

          if (/^\S{1,}\.\S{1,}\.\S{1,}$/.test(wholePath)) {
            delete compilation.assets[key];
          } else {
            const sourceHash = getHashOfFilePromise(compilation.assets[key].source().toString('utf8'), true);
            const outputHash = getHashOfFilePromise(path.join(compilation.compiler.outputPath, key));
            promiseAll.push(Promise.all([sourceHash, outputHash, Promise.resolve(key)]));
            // if (sourceHash === outputHash) delete compilation.assets[key];
          }
        }
        if (promiseAll.length <= 0) return callback();
        Promise.all(promiseAll).then(res => {
          if (res.length <= 0) callback();
          res.forEach(item => {
            const sourceHash = item[0];
            const outputHash = item[1];
            const key = item[2];
            if (sourceHash === outputHash) delete compilation.assets[key];
          });
          callback();
        }).catch(err => {
          callback(err);
        });
      } catch (err) {
        return callback(err);
      }

    });
  }
}
module.exports = StopEmitPlugin;
