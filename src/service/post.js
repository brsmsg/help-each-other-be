const {
  tagEnum
} = require('../config/constants');
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
  if (Object.keys(filter).length === 0) {
    result = await Post.findAll(queryConfig);
  } else {
    const {
      type,
      tag
    } = filter;
    const whereOpt = {
      tag: tagEnum[tag]
    }
    Object.assign(queryConfig, {
      where: whereOpt
    });
    try {
      result = await Post.findAll(queryConfig);
    } catch (e) {
      console.log(e)
    }
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
    creator,
    maxMembers
  } = post
  const result = await Post.create({
    title,
    tag,
    content,
    reward,
    images: images ? images.join('&') : null,
    creator_id: creator,
    views: 0,
    maxMembers
  })
  if (!result) return result;
  return result.dataValues;
}

const countPost = async (userId) => {
  const res = await Post.findAll({
    where: {
      creator_id: userId
    }
  })
  if (!res) return 0;
  return res.length;
}

module.exports = {
  getPosts,
  getSinglePost,
  createPost,
  countPost
}