const seq = require('../seq')
const {
  STRING,
  INTEGER,
  TEXT,
  FLOAT
} = require('../types')

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
    comment: '帖子状态'
  },
  reward: {
    type: FLOAT,
    comment: '报酬'
  }
})

module.exports = Post;