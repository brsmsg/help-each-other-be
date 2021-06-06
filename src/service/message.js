const {
  Op
} = require('sequelize')
const {
  Message,
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
      ['updatedAt', 'DESC']
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
  return result.map((item) => {
    const content = item.dataValues.content;
    const postId = content.split('&')[1].split('=')[1];
    item.dataValues.postId = postId;
    return item.dataValues
  });
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
      ['createdAt', 'ASC'],
    ],
  })
  if (!result) {
    return null
  }
  return result.map((item) => item.dataValues);
}

const createMsg = async (message) => {
  const result = await Message.create({
    sender_id: message.senderId,
    receiver_id: message.receiverId,
    content: message.content,
    createdAt: message.createdAt,
    is_check: false
  });
  return result
}

const getUncheckedMsg = async (senderId, receiverId) => {
  const result = await Message.findAll({
    where: {
      sender_id: senderId,
      receiver_id: receiverId,
      is_check: false
    }
  })
  if (result)
    return {
      id: senderId,
      length: result.length
    };
  return null;
}

const checkMsg = async (senderId, receiverId) => {
  const result = await Message.update({
    is_check: true
  }, {
    where: {
      sender_id: senderId,
      receiver_id: receiverId,
      is_check: false
    }
  })
  if (result) return result;
  return null;
}

module.exports = {
  queryContacts,
  queryMessages,
  queryAdminMessages,
  queryHistory,
  createMsg,
  getUncheckedMsg,
  checkMsg
}