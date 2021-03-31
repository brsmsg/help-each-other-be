/**
 * @description 数据库模型入口文件
 */

const User = require('../model/User');
const Post = require('../model/Post');
const Request = require('../model/Request');

module.exports = {
  User,
  Post,
  Request
}