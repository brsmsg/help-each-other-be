const seq = require('../seq');
const { STRING, DECIMAL } = require('../types')

const User = seq.define('user', {
  username: {
    type: STRING,
    allowNull: false,
    unique: true,
    comment: '用户名'
  },
  password: {
    type: STRING,
    asllowNull: false,
    commment: '密码'
  },
  gender: {
    type: DECIMAL,
    allowNull: false,
    comment: '性别 男0  女1'
  },
  phone: {
    type: STRING,
    unique: true,
    allowNull: false,
    comment: '手机号'
  },
  avatar: {
    type: STRING,
    comment: '头像， 图片url'
  },
  category: {
    type: DECIMAL,
    comment: '分区 社区0 学校1'
  },
  location: {
    type: STRING,
    comment: '位置'
  }
})

module.exports = User