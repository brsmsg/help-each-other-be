const {
  ErrorModel,
  SuccessModel
} = require("../model/ResModel");
const {
  getSinglePost
} = require("../service/post");
const {
  addRequest,
  getStatus,
  getRequestsNum,
  getAllRequest,
  changeStatus,
} = require('../service/request')

const applyRequest = async (postId, applyBody) => {
  const num = await getRequestsNum(postId);
  const {
    maxMembers
  } = await getSinglePost(postId);
  if (num === maxMembers) {
    return new ErrorModel("该项目已经申请满");
  }
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

const getApplyList = async (postId) => {
  const result = await getAllRequest(postId);
  if (result) {
    return new SuccessModel(result);
  }
  return new ErrorModel('获取列表错误')
}

const handleApply = async ({
  requestId,
  action
}) => {
  const result = await changeStatus({
    requestId,
    action
  })
  if (result) {
    return new SuccessModel(result);
  }
  return new ErrorModel('更改状态出错')
}

module.exports = {
  applyRequest,
  requestStatus,
  getAcceptNum,
  getApplyList,
  handleApply,
}