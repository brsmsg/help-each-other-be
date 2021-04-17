const {
  User
} = require('../db/model/index');

/**
 * 获取用户信息
 * @param {string} username 
 * @param {string} password 
 */
const getUserInfo = async (username, password) => {
  const whereOpt = {
    username
  }
  // if (phone) {
  //   Object.assign(whereOpt, { phone })
  // }
  if (password) {
    Object.assign(whereOpt, {
      password
    });
  }

  // query
  const result = await User.findOne({
    attributes: ['id', 'username', 'gender', 'avatar', 'category', 'location'],
    where: whereOpt
  })

  if (result == null) {
    // 未找到
    return result
  }

  return result.dataValues;
}

const getUserById = async (id) => {
  const result = await User.findOne({
    attributes: ['id', 'username', 'gender', 'avatar', 'category', 'location'],
    where: {
      id
    }
  })
  if (result == null) {
    // 未找到
    return result
  }

  return result.dataValues;
}

/**
 * 创建用户
 * @param {string} username 用户名
 * 。。。
 */
const createUser = async (userObj) => {
  const result = await User.create(userObj)
  return result.dataValues;
}

const updateUser = async (body) => {
  const {
    id,
    data
  } = body;
  console.log("data", data)
  console.log("id", id)
  const res = await User.update(data, {
    where: {
      id
    }
  })
  return res;
}

module.exports = {
  getUserInfo,
  createUser,
  updateUser,
  getUserById
}