const router = require('koa-router')();

const {
  getAllUser,
  getAllPost
} = require('../controller/admin')

router.prefix('/admin');

router.get('/allUser', async (ctx, next) => {
  ctx.body = await getAllUser();
})

router.get('/allPost', async (ctx, next) => {
  ctx.body = await getAllPost();
})

module.exports = router;