/**
 * 清理上次打包的
 */
const path = require('path');
const fs = require('fs');

const pluginName = 'ClearDirtPlugin';
class ClearDirtPlugin {

  constructor(options) {
    this.branch = options.branch;
    this.exclude = options.exclude || [];
    this.include = options.include || [];
  }

  apply(compiler) {
    compiler.hooks.done.tap(pluginName, (stats) => {
      // Clean up dirty data on release branch of git.
      const gitHeadPath = path.resolve(__dirname, '../../.git/HEAD');
      const HeadText = fs.readFileSync(gitHeadPath).toString();
      if (!~HeadText.indexOf(`/${this.branch}`)) {
        return console.log('\\033[43;30m  Clean Dirt \\033[40;33m Don\'t clean dirty file on current branch of git.');
      }

      // start clean up
      const compilation = stats.compilation;
      clearDirt(compilation.outputOptions.path, compilation.originAssets, this.include);

      /**
       * Recursively cleans up dirty data that is not in the originAssets list
       * @param {*} filePath 
       * @param {*} originAssets 
       */
      function clearDirt(filePath, originAssets, include) {
        if (!fs.existsSync(filePath)) {
          return;
        }

        const state = fs.statSync(filePath);

        if (state.isDirectory()) {
          const fileList = fs.readdirSync(filePath);
          for (const file of fileList) {
            const whoPath = path.join(filePath, file);

            const isInclude = include.some((item) => {
              return item.includes(whoPath) || whoPath.includes(item);
            });

            if (!isInclude) continue;
            clearDirt(whoPath, originAssets, include);
          }
        } else if (state.isFile()) {
          const filePathFormat = filePath.trim();
          if (!~originAssets.indexOf(filePathFormat)) {
            fs.unlinkSync(filePath);
          }
        }
        return true;
      }

      console.log('\\033[42;30m Clean Dirt \\033[40;32m The dirty file has been cleaned on current branch of git.');
    });
  }
}
module.exports = ClearDirtPlugin;
