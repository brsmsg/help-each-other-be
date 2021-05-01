const {
  ErrorModel,
  SuccessModel
} = require("../model/ResModel");
const {
  createMsg
} = require("../service/message");
const {
  getSinglePost
} = require("../service/post");
const {
  addRequest,
  getStatus,
  getRequestsNum,
  getAllRequest,
  changeStatus,
} = require('../service/request');
const {
  getUserById,
  changeUserRecord
} = require("../service/users");

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
  console.log("applyBody", applyBody);
  console.log("applyBody", request);
  if (request) {
    // const result = await Message.create({
    //   sender_id: message.senderId,
    //   receiver_id: message.receiverId,
    //   content: message.content,
    //   createdAt: message.createdAt,
    //   is_check: false
    // });
    // 数据库写两条消息
    // createMsg({
    //   senderId,
    //   receiverId,
    //   content,
    //   createdAt: data.date
    // })
    await changeUserRecord(applyBody.applicantId, "help")
    const user = await getUserById(applyBody.applicantId);
    const post = await getSinglePost(postId);
    console.log(post.user.dataValues);
    const msg1 = {
      senderId: 999,
      receiverId: post.user.dataValues.id,
      content: `用户 ${user.username} 向您的帖子 ${post.title} 发了一条请求&postId=${post.id}`,

    }
    await createMsg(msg1)
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