const {
  Post
} = require('../db/model');

const getAllPosts = async () => {
  const result = await Post.findAll();
  if (result == null) return result;
  const res = result.map((item) => {
    return item.dataValues
  })
  return res;
}

module.exports = {
  getAllPosts
}