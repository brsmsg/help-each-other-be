const seq = require('../seq')
const {
  STRING,
  INTEGER,
  TEXT,
  FLOAT
} = require('../types');
const User = require('./User');

const Post = seq.define('post', {
  title: {
    type: STRING,
    comment: '标题'
  },
  content: {
    type: TEXT,
    comment: '内容'
  },
  images: {
    type: STRING,
    comment: '图片'
  },
  creator_id: {
    type: INTEGER,
    comment: '创建人id'
  },
  status: {
    type: INTEGER,
    comment: '帖子状态 0:待审核 1:审核通过 99:审核驳回'
  },
  reward: {
    type: FLOAT,
    comment: '报酬'
  },
  tag: {
    type: STRING,
    comment: '类型'
  },
  views: {
    type: INTEGER,
    comment: '浏览量'
  },
  maxMembers: {
    type: INTEGER,
    comment: '最大参与人数'
  }
})

Post.belongsTo(User, {
  foreignKey: 'creator_id'
})

module.exports = Post;