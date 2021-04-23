const {
  User,
  Post
} = require('../db/model')
const {
  Op
} = require('sequelize')

const queryAllUser = async (params) => {
  delete params.current;
  delete params.pageSize;
  for (item in params) {
    params[item] = {
      [Op.like]: '%' + params[item] + '%'
    }
  }
  console.log(params);
  const result = await User.findAll({
    where: params
  })
  if (result) return result.map(item => item.dataValues).filter(item => item.username != 'admin');
  return null;
}

const queryAllPost = async (params) => {
  delete params.current;
  delete params.pageSize;
  for (item in params) {
    params[item] = {
      [Op.like]: '%' + params[item] + '%'
    }
  }
  console.log(params)
  const result = await Post.findAll({
    where: params
  })
  if (result) return result.map(item => item.dataValues)
  return null
}

module.exports = {
  queryAllUser,
  queryAllPost
}