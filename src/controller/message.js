const {
  queryContacts,
  queryMessages,
  queryAdminMessages,
  queryHistory
} = require('../service/message')
const {
  SuccessModel,
  ErrorModel
} = require('../model/ResModel');
const {
  getUserById
} = require('../service/users');

const getContacts = async (userId) => {
  const result = await queryContacts(userId);
  if (result) {
    const idSet = new Set();
    result.forEach(item => {
      if (item.sender_id == userId) {
        idSet.add(item.receiver_id);
      }
      if (item.receiver_id == userId) {
        idSet.add(item.sender_id)
      }
    });
    idSet.delete(999)
    const promiseList = [];
    idSet.forEach((item) => {
      promiseList.push(queryMessages(userId, item, "latest"))
    })

    const data = await Promise.all(promiseList);
    return new SuccessModel(data.map(item => item[0]));
  }
  return new ErrorModel('查询失败')
}

const getAdminMessages = async (userId) => {
  const result = await queryAdminMessages(userId)
  let data = null;
  if (result === null) {
    data = []
  } else {
    data = result;
  }
  return new SuccessModel(data);
}

const getMsgHistory = async (id1, id2) => {
  const result = await queryHistory(id1, id2);
  let data = null;
  if (result === null) {
    data = []
  } else {
    data = result;
    const userInfo1 = await getUserById(id1)
    const userInfo2 = await getUserById(id2)
    console.log(userInfo1)
    result.forEach((item) => {
      if (item.sender_id == id1) {
        item.user = userInfo1
      } else if (item.sender_id == id2) {
        item.user = userInfo2
      }
    })
  }
  return new SuccessModel(data);
}

module.exports = {
  getContacts,
  getAdminMessages,
  getMsgHistory
}