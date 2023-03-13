const crypto = require('crypto');
const fs = require('fs');

/**
 * 获得内容的hash值
 * 
 * @param {String} content 文件内容
 * @param {String} encoding 文件的编码，例如：'utf8' 等
 * @param {String} type hash算法，例如：'md5'、'sha1'、'sha256'、'sha512' 等
 * @returns {String}
 * @author helinjiang
 */
function getHash(content, encoding, type) {
  return crypto.createHash(type).update(content, encoding).digest('hex');
}

/**
 * 获得文件的hash值
 * 
 * @param {String} filePath 文件路径
 * @returns {String}
 * @author helinjiang
 */
function getHashOfFile(filePath, isContent) {

  return getHash(isContent ? filePath : fs.readFileSync(filePath, 'utf8'), 'utf8', 'sha1');
}

/**
 * 获取文件的hash值，异步
 * @param {*} filePath 
 * @param {*} isContent 
 */
function getHashOfFilePromise(filePath, isContent) {
  return new Promise((resolve, reject) => {
    try {
      if (isContent) {
        return resolve(getHash(filePath, 'utf8', 'sha1'));
      }

      fs.readFile(filePath, 'utf8', (err, data) => {
        if (err) return reject(err);
        resolve(getHash(data, 'utf8', 'sha1'));
      });
    } catch (err) {
      reject(err);
    }
  });
}
/**
 * 对外接口
 * @type {{getHash: getHash, getHashOfFile: getHashOfFile}}
 */
module.exports = {
  getHash,
  getHashOfFile,
  getHashOfFilePromise
};
