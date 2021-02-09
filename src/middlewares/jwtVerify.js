/**
 * @description 验证jwt中间件
 */

const jwt = require('jsonwebtoken')
const util = require('util')
// 变成promise形式
const verify = util.promisify(jwt.verify)
const { JWT_SECRET_KEY } = require('../config/secretKeys')
const { authFailInfo } = require('../model/ErrorInfo')
const { ErrorModel } = require('../model/ResModel')

// 捕获jwt错误
const catchJwtError = async (ctx, next) => {
  return next().catch(err => {
    if (err.status === 401) {
      ctx.status = 401;
      ctx.body = new ErrorModel(authFailInfo)
    } else {
      throw err
    }
  })
}

const verifyToken = async (ctx, next) => {
  const token = ctx.header.authorization;
  try {
    const payload = await verify(token.split(' ')[1], JWT_SECRET_KEY);
    return payload;
  } catch (ex){
    // return 
  }
}


module.exports = {
  catchJwtError,
  verifyToken
}