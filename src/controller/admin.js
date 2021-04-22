const {
  ErrorModel,
  SuccessModel
} = require('../model/ResModel');
const {
  queryAllUser,
  queryAllPost
} = require('../service/admin')

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

module.exports = {
  getAllUser,
  getAllPost
}