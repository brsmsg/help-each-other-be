const { SuccessModel, ErrorModel } = require('../model/ResModel')
const { getUserInfo, createUser } = require('../service/users')
const { registerUserNameExistInfo, registerFailInfo, loginFailInfo } = require('../model/ErrorInfo')
const { doCrypto } = require('../utils/crypt')

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
  const { username } = userObj
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
const login = async ({ username, password }) => {
  const cryptedPwd = doCrypto(password)
  const userInfo = await getUserInfo(username, cryptedPwd);
  if (!userInfo) {
    return new ErrorModel(loginFailInfo)
  }
  return new SuccessModel(userInfo);
}


module.exports = {
  isExist,
  register,
  login
}