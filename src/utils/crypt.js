/**
 * @description 加密方法
 */

const crypto = require('crypto');
const { PWD_SECRET_KEY } = require('../config/secretKeys')

/**
 * 
 * @param {string} content 明文 
 */
const _md5 = (content) => {
  const md5 = crypto.createHash('md5');
  return md5.update(content).digest('hex');
}

/**
 * 加密方法
 * @param {string} contnet 明文
 */
const doCrypto = (contnet) => {
  const str = `password=${contnet}&key=${PWD_SECRET_KEY}`;
  return _md5(str)
}

module.exports = {
  doCrypto
}