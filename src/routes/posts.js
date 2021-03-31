const router = require('koa-router')();
const {
  fetchPosts,
  fetchSinglePost,
  saveImage,
  newPost
} = require('../controller/post');

const {
  applyRequest,
  requestStatus
} = require('../controller/request');

router.prefix('/post')

router.get('/', async (ctx, next) => {
  ctx.body = await fetchPosts();
})

router.get('/:id', async (ctx, next) => {
  const postId = ctx.params.id;
  ctx.body = await fetchSinglePost(postId)
})

router.post('/apply/:id', async (ctx, next) => {
  const postId = ctx.params.id;
  const applyBody = ctx.request.body;
  ctx.body = await applyRequest(postId, applyBody);
})

router.get('/apply/status', async (ctx, next) => {
  ctx.body = await requestStatus(ctx.query);
})


router.post('/uploadImg', async (ctx, next) => {
  const file = ctx.request.files.file;
  // console.log(ctx.request.files);
  // console.log("file", file);
  ctx.body = await saveImage(file);
})

router.post('/newPost', async (ctx, next) => {
  console.log(ctx.request.body);
  const res = ctx.request.body;
  ctx.body = await newPost(res);

})

module.exports = router;