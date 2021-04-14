const seq = require('../seq')
const {
  STRING,
  INTEGER,
  TEXT,
  FLOAT,
  BOOLEAN
} = require('../types');
const User = require('./User');

const Message = seq.define('message', {
  sender_id: {
    type: INTEGER,
    comment: '发送人id'
  },
  receiver_id: {
    type: INTEGER,
    comment: '接受人id'
  },
  content: {
    type: STRING,
    comment: '消息内容'
  },
  is_check: {
    type: BOOLEAN,
    comment: '是否签收'
  }
})


Message.belongsTo(User, {
  foreignKey: 'sender_id'
})
Message.belongsTo(User, {
  foreignKey: 'receiver_id'
})

module.exports = Message;