const {
  ErrorModel,
  SuccessModel
} = require("../model/ResModel");
const {
  addRequest,
  getStatus,
  getRequestsNum
} = require('../service/request')

const applyRequest = async (postId, applyBody) => {
  const request = await addRequest({
    postId,
    ...applyBody
  });
  if (request) {
    return new SuccessModel(request);
  }
  return new ErrorModel("发起请求失败");

}

const requestStatus = async ({
  postId,
  applicantId
}) => {
  const status = await getStatus({
    postId,
    applicantId
  });
  if (status) {
    return new SuccessModel(status);
  }
  return new ErrorModel("查询错误");
}

const getAcceptNum = async (postId) => {
  const num = await getRequestsNum(postId);
  if (num) {
    return new SuccessModel(num);
  }
  return new ErrorModel('查询错误');
}

module.exports = {
  applyRequest,
  requestStatus,
  getAcceptNum
}