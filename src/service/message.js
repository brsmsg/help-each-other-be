const {
  Op
} = require('sequelize')
const {
  Message,
  User
} = require("../db/model")
const {
  getUserById
} = require('./users')

const queryContacts = async (userId) => {
  const result = await Message.findAll({
    where: {
      [Op.or]: [{
        sender_id: userId
      }, {
        receiver_id: userId
      }]
    },
  })
  if (!result) {
    return null
  }
  return result.map((item) => item.dataValues);
}

const queryMessages = async (senderId, receiverId, tag) => {
  const queryConfig = {
    where: {
      [Op.or]: [{
        sender_id: senderId,
        receiver_id: receiverId
      }, {
        sender_id: receiverId,
        receiver_id: senderId
      }]
    },
    order: [
      ['createdAt', 'DESC']
    ]
  }
  let userInfo;
  if (tag === 'latest') {
    Object.assign(queryConfig, {
      limit: 1
    })
    userInfo = await getUserById(receiverId);
  }
  const result = await Message.findAll(queryConfig);
  if (!result) {
    return null;
  }
  return result.map((item) => {
    item.dataValues.user = userInfo;
    return item.dataValues;
  });
}

const queryAdminMessages = async (userId) => {
  const result = await Message.findAll({
    where: {
      sender_id: 999,
      receiver_id: userId
    }
  })
  if (!result) {
    return null;
  }
  console.log(result);
  return result.map((item) => item.dataValues);
}

const queryHistory = async (id1, id2) => {
  const result = await Message.findAll({
    where: {
      [Op.or]: [{
        sender_id: id1,
        receiver_id: id2
      }, {
        sender_id: id2,
        receiver_id: id1
      }]
    },
    order: [
      ['createdAt']
    ],
  })
  if (!result) {
    return null
  }
  return result.map((item) => item.dataValues);
}



module.exports = {
  queryContacts,
  queryMessages,
  queryAdminMessages,
  queryHistory
}