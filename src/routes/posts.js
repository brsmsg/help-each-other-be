const router = require('koa-router')();
const {
  getAllPosts
} = require('../service/post');

router.prefix('/posts')

router.get('/', async (ctx, next) => {
  ctx.body = await getAllPosts();
})

module.exports = router;