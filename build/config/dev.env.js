
const {
  entrys
} = require('../entryUtil');

module.exports = {
  NODE_ENV: '"development"',
  BASE_API: '"http://localhost:3000/"',
  // FILE_ROOT: '"http://files.test.com"',
  AXIOS_TIMEOUT: '600000',
  moudles: JSON.stringify(entrys)
};
