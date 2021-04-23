const {
  ErrorModel,
  SuccessModel
} = require('../model/ResModel');
const {
  queryAllUser,
  queryAllPost,
} = require('../service/admin')


const {
  changePostStatus
} = require('../service/post');
const {
  getUserById
} = require('../service/users');


const getAllUser = async (params) => {
  const result = await queryAllUser(params);
  if (!result) return new ErrorModel({});
  return new SuccessModel(result);
}

const getAllPost = async (params) => {
  const result = await queryAllPost(params);
  const userPromiseList = [];
  result.forEach((item) => {
    userPromiseList.push(getUserById(item.creator_id));
  })
  const users = await Promise.all(userPromiseList);
  result.forEach((post) => {
    users.forEach((user) => {
      post.user = user.username
    })
  })
  if (!result) return {
    success: false,
  }
  return {
    success: true,
    data: result,
    total: result.length
  }
}

const auditPost = async ({
  postId,
  isApprove
}) => {
  const result = await changePostStatus({
    postId,
    newStatus: isApprove ? 1 : 99
  });
  if (result) return new SuccessModel(result);
  return new ErrorModel({})
}

module.exports = {
  getAllUser,
  getAllPost,
  auditPost
}