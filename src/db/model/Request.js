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
    comment: '申请人id'
  },
  post_id: {
    type: INTEGER,
    comment: '帖子id'
  },
  remark: {
    type: TEXT,
    comment: '备注'
  },
  is_accept: {
    type: INTEGER,
    comment: '申请是否通过 0申请中 1通过 2拒绝 3已完成'
  }
})

Request.belongsTo(User, {
  foreignKey: 'applicant_id'
});

Request.belongsTo(Post, {
  foreignKey: 'post_id'
})

module.exports = Request;