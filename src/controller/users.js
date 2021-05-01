const path = require('path');
const fs = require('fs');
const {
  SuccessModel,
  ErrorModel
} = require('../model/ResModel')
const {
  getUserInfo,
  createUser,
  updateUser,
  queryTopUsers,
  getUserById
} = require('../service/users')
const {
  registerUserNameExistInfo,
  registerFailInfo,
  loginFailInfo
} = require('../model/ErrorInfo')
const {
  doCrypto
} = require('../utils/crypt')
const {
  countPost
} = require('../service/post');
const {
  countHelp
} = require('../service/request')

/**
 * 用户名是否存在
 * @param {string} username 用户名
 */
const isExist = async (username) => {
  // 业务逻辑处理
  // 调用service
  const userInfo = await getUserInfo(username);
  if (!userInfo) {
    return new SuccessModel()
  } else {
    return new ErrorModel(registerUserNameExistInfo)
  }
}

/**
 * 注册
 * @param {object} userObj 用户信息对象 
 */
const register = async (userObj) => {
  const {
    username
  } = userObj
  const userInfo = await getUserInfo(username);
  if (userInfo) {
    // 用户名已经存在
    return new ErrorModel(registerUserNameExistInfo)
  }

  userObj.password = doCrypto(userObj.password)
  try {
    await createUser(userObj)
    return new SuccessModel();
  } catch (ex) {
    console.error(ex.message, ex.stack)
    return new ErrorModel(registerFailInfo);
  }
}

/**
 * 登录
 * @param {string} username 
 * @param {string} pwd 
 */
const login = async ({
  username,
  password
}) => {
  const cryptedPwd = doCrypto(password)
  const userInfo = await getUserInfo(username, cryptedPwd);
  if (!userInfo) {
    return new ErrorModel(loginFailInfo)
  }
  return new SuccessModel(userInfo);
}

const getUserStat = async (userId) => {

  const postNum = await countPost(userId);
  const helpNum = await countHelp(userId);
  if (postNum != undefined && helpNum != undefined) {
    return new SuccessModel({
      postNum,
      helpNum
    });
  }
  return new ErrorModel(123);
}

const saveImage = async (file) => {
  const dirname = path.resolve(__dirname, '../public/uploads/avatar');
  const reader = fs.createReadStream(file.path);
  const writer = fs.createWriteStream(path.join(dirname, file.name));
  // 管道
  reader.pipe(writer);

  return new SuccessModel(`/uploads/avatar/${file.name}`);
}

const updateProfile = async (data) => {
  const result = await updateUser(data);
  if (result[0] === 1) return new SuccessModel("success")
  else return new ErrorModel({
    message: "更新失败"
  })
}

const getTopUsers = async () => {
  const result = await queryTopUsers();
  if (result) return new SuccessModel(result);
  else return new ErrorModel({})
}

const userInfo = async (id) => {
  const result = await getUserById(id);
  if (!result) return null;
  return new SuccessModel(result)
}

module.exports = {
  isExist,
  register,
  login,
  getUserStat,
  saveImage,
  updateProfile,
  getTopUsers,
  userInfo
}