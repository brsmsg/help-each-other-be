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
  const result = await User.create({
    ...userObj,
    avatar: '/uploads/avatar/default.png'
  })
  return result.dataValues;
}

const updateUser = async (body) => {
  const {
    id,
    data
  } = body;
  const res = await User.update(data, {
    where: {
      id
    }
  })
  return res;
}

const changeUserRecord = async (userId, type) => {
  if (type === "post") {
    const res = await User.increment({
      postCount: 1
    }, {
      where: {
        id: userId
      }
    })
  } else {
    const res = await User.increment({
      helpCount: 1
    }, {
      where: {
        id: userId
      }
    })
  }
}

const queryTopUsers = async () => {
  const result = await User.findAll({
    limit: 5,
    order: [
      ["postCount", "DESC"]
    ]
  })
  console.log(result.map((item) => item.dataValues));
  if (!result) return null;
  return result.map((item) => item.dataValues).filter(item => item.id !== 999);
}

module.exports = {
  getUserInfo,
  createUser,
  updateUser,
  getUserById,
  queryTopUsers,
  changeUserRecord
}