const {
  Op
} = require('sequelize')
const {
  Message,
  User
} = require("../db/model")

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
  if (tag === 'latest') {
    Object.assign(queryConfig, {
      limit: 1,
      include: [{
        model: User,
        attributes: ['id', 'username', 'location', 'avatar']
      }]
    })
  }
  const result = await Message.findAll(queryConfig);
  if (!result) {
    return null;
  }
  return result.map((item) => item.dataValues);
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

module.exports = {
  queryContacts,
  queryMessages,
  queryAdminMessages
}