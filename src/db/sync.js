/**
 * @description 同步数据库
 */

const seq = require('./seq');

// 引入，进行同步
require('./model/index');

seq.sync({ alter: true }).then(() => {
  console.log('sync success');
  process.next();
})