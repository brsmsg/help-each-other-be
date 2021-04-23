const router = require('koa-router')();

const {
  getAllUser,
  getAllPost,
  auditPost
} = require('../controller/admin')

router.prefix('/admin');

router.get('/allUser', async (ctx, next) => {
  const params = ctx.request.query
  ctx.body = await getAllUser(params);
})

router.get('/allPost', async (ctx, next) => {
  const params = ctx.request.query
  ctx.body = await getAllPost(params);
})

router.post('/audit', async (ctx, next) => {
  const {
    postId,
    isApprove
  } = ctx.request.body
  ctx.body = await auditPost({
    postId,
    isApprove
  })
})

module.exports = router;