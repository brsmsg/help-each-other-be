const seq = require('../seq');
const {
  STRING,
  INTEGER,
  TEXT,
  FLOAT,
  BOOLEAN
} = require('../types');
const User = require('./User');
const Post = require('./Post');

const Request = seq.define('request', {
  applicant_id: {
    type: INTEGER,
    comments: '申请人id'
  },
  post_id: {
    type: INTEGER,
    comments: '帖子id'
  },
  remark: {
    type: TEXT,
    comments: '备注'
  },
  is_accept: {
    type: BOOLEAN,
    comments: '申请是否通过'
  }
})

Request.belongsTo(User, {
  foreignKey: 'applicant_id'
});

Request.belongsTo(Post, {
  foreignKey: 'post_id'
})

module.exports = Request;