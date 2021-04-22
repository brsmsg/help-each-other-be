const Koa = require('koa')
const app = new Koa()
const views = require('koa-views')
const json = require('koa-json')
const onerror = require('koa-onerror')
const bodyparser = require('koa-bodyparser')
const koaBody = require('koa-body')
const logger = require('koa-logger')
const jwtKoa = require('koa-jwt')

// routers
const index = require('./routes/index')
const usersRouter = require('./routes/users')
const postRouter = require('./routes/posts');
const adminRouter = require('./routes/admin')

const {
  JWT_SECRET_KEY
} = require('./config/secretKeys')
const {
  catchJwtError
} = require('./middlewares/jwtVerify')

// error handler
onerror(app)

// koa跨域
app.use(async (ctx, next) => {
  ctx.set('Access-Control-Allow-Origin', '*');
  ctx.set('Access-Control-Allow-Headers', 'Content-Type, Content-Length, Authorization, Accept, X-Requested-With , yourHeaderFeild');
  ctx.set('Access-Control-Allow-Methods', 'PUT, POST, GET, DELETE, OPTIONS');
  if (ctx.method == 'OPTIONS') {
    ctx.body = 200;
  } else {
    await next();
  }
})

// jwt 401 错误处理
app.use(catchJwtError)

// app.use(jwtKoa({
//   secret: JWT_SECRET_KEY
// }).unless({
//   // login/register 接口不需要认证
//   path: [
//     /^\/users\/login/,
//     /^\/users\/register/
//   ]
// }))


// middlewares
// koa-body
app.use(koaBody({
  multipart: true
}))
app.use(bodyparser({
  enableTypes: ['json', 'form', 'text']
}))
app.use(json())
app.use(logger())


app.use(require('koa-static')(__dirname + '/public'))

app.use(views(__dirname + '/views', {
  extension: 'pug'
}))

// logger
app.use(async (ctx, next) => {
  const start = new Date()
  await next()
  const ms = new Date() - start
  console.log(`${ctx.method} ${ctx.url} - ${ms}ms`)
})

// routes
app.use(index.routes(), index.allowedMethods());
app.use(usersRouter.routes(), usersRouter.allowedMethods());
app.use(postRouter.routes(), postRouter.allowedMethods());
app.use(adminRouter.routes(), adminRouter.allowedMethods());

// error-handling
app.on('error', (err, ctx) => {
  console.error('server error', err, ctx)
});

module.exports = app