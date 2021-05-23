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
      tag,
      userId,
    } = filter;
    const whereOpt = {}
    if (tag) {
      Object.assign(whereOpt, {
        tag: tagEnum[tag],
      })
    }
    if (userId) {
      Object.assign(whereOpt, {
        creator_id: userId
      })
    }
    if (type === 'popular' || !type) {
      Object.assign(queryConfig, {
        order: [
          ['views', 'DESC']
        ]
      })
    } else if (type === 'newest') {
      Object.assign(queryConfig, {
        order: [
          ['createdAt', 'DESC']
        ]
      })
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
  // res.forEach((item) => {
  //   item.createdAt = item.createdAt.toLocaleTimeString()
  // })
  return res;
}

const getSinglePost = async (postId) => {
  const queryConfig = {
    include: [{
      model: User,
      attributes: ['id', 'username', 'location', 'avatar', 'phone']
    }],
    where: {
      id: postId
    }
  }
  const result = await Post.findOne(queryConfig);
  if (result === null) return result;
  // let res = result.dataValues;
  // res.createdAt = res.createdAt.toLocaleTimeString()
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

const addViews = async (postId) => {
  const res = await Post.increment({
    views: 1
  }, {
    where: {
      id: postId
    }
  })
}

const changePostStatus = async ({
  postId,
  newStatus
}) => {
  const result = await Post.update({
    status: newStatus
  }, {
    where: {
      id: postId
    }
  })
  if (!result) return null;
  return result;
}

module.exports = {
  getPosts,
  getSinglePost,
  createPost,
  countPost,
  addViews,
  changePostStatus
}