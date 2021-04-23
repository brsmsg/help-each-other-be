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
} = require('../service/post')


const getAllUser = async () => {
  const result = await queryAllUser();
  if (!result) return new ErrorModel({});
  return new SuccessModel(result);
}

const getAllPost = async () => {
  const result = await queryAllPost();
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