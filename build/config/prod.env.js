
const {
  entrys
} = require('../entryUtil');

module.exports = {
  NODE_ENV: '"production"',
  BASE_API: '"/"',
  // FILE_ROOT: '"http://f1.test.com"',
  AXIOS_TIMEOUT: '600000',
  moudles: JSON.stringify(entrys)
};
