const { isExist, register } = require('../controller/users')

const router = require('koa-router')()

router.prefix('/users')

router.get('/', function (ctx, next) {
  ctx.body = 'this is a users response!'
})

router.get('/bar', function (ctx, next) {
  ctx.body = 'this is a users/bar response'
})

// 注册路由
router.post('/register', async (ctx, next) => {
  const userObj = ctx.request.body;

  ctx.body = await register(userObj)
})

// 是否存在
router.post('/isExist', async (ctx, next) => {
  const { username } = ctx.request.body;

  ctx.body = await isExist(username);
})

module.exports = router
