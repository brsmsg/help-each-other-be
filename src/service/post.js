const {
  Post,
  User
} = require('../db/model');

/**
 * 
 * @param {objec} filter 过滤器
 * @returns res
 */
const getPosts = async (filter) => {
  let result;
  let queryConfig = {
    include: [{
      model: User,
      attributes: ['id', 'username']
    }]
  }
  if (!filter) {
    result = await Post.findAll(queryConfig);
  }
  if (result == null) return result;
  const res = result.map((item) => {
    return item.dataValues
  });
  res.forEach((item) => {
    item.createdAt = item.createdAt.toLocaleTimeString()
  })
  return res;
}

const getSinglePost = async (postId) => {
  const queryConfig = {
    include: [{
      model: User,
      attributes: ['id', 'username']
    }],
    where: {
      id: postId
    }
  }
  const result = await Post.findOne(queryConfig);
  if (result === null) return result;
  let res = result.dataValues;
  res.createdAt = res.createdAt.toLocaleTimeString()
  return result.dataValues;
}

const createPost = async (post) => {
  const {
    title,
    tag,
    content,
    reward,
    images,
    creator
  } = post
  console.log("post", post);
  const result = await Post.create({
    title,
    tag,
    content,
    reward,
    images: images ? images.join('&') : null,
    creator_id: creator
  })
  if (!result) return result;
  console.log(result.dataValues);
  return result.dataValues;
}

module.exports = {
  getPosts,
  getSinglePost,
  createPost
}