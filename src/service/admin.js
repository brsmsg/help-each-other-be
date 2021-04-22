const {
  User,
  Post
} = require('../db/model')

const queryAllUser = async () => {
  const result = await User.findAll({

  })
  if (result) return result.map(item => item.dataValues).filter(item => item.username != 'admin');
  return null;
}

const queryAllPost = async () => {
  const result = await Post.findAll({

  })
  if (result) return result.map(item => item.dataValues)
  return null
}

module.exports = {
  queryAllUser,
  queryAllPost
}