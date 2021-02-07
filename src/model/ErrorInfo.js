/**
 * @description 失败信息集合 errno + message
 */

module.exports = {
  registerUserNameExistInfo: {
    errno: 10001,
    message: '用户名或手机号已存在'
  },
  registerFailInfo: {
    errno: 10002,
    message: '注册失败'
  }
}