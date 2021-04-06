const {
  isExist,
  register,
  login,
  getUserStat
} = require('../controller/users')
const {
  JWT_SECRET_KEY
} = require('../config/secretKeys')
const jwt = require('jsonwebtoken')

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
  const {
    username
  } = ctx.request.body;
  ctx.body = await isExist(username);
})

// 登录路由
router.post('/login', async (ctx, next) => {

  const {
    username,
    password
  } = ctx.request.body;
  const res = await login({
    username,
    password
  });
  if (res.errno === 0) {
    // 设置响应头
    ctx.set('Access-Token', jwt.sign({
        data: res.data
      },
      JWT_SECRET_KEY, {
        expiresIn: 60 * 60
      }))
  }
  ctx.body = res;
});

router.get('/userStat/:id', async (ctx, next) => {
  const userId = ctx.params.id;

  ctx.body = await getUserStat(userId);
})


module.exports = router;