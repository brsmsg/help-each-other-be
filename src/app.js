const Koa = require('koa')
const app = new Koa()
const views = require('koa-views')
const json = require('koa-json')
const onerror = require('koa-onerror')
const bodyparser = require('koa-bodyparser')
const logger = require('koa-logger')
const jwtKoa = require('koa-jwt')

const index = require('./routes/index')
const usersRouter = require('./routes/users')

const { JWT_SECRET_KEY } = require('./config/secretKeys')
const { catchJwtError } = require('./middlewares/jwtVerify')

// error handler
onerror(app)

// jwt 401 错误处理
app.use(catchJwtError)

app.use(jwtKoa({
  secret: JWT_SECRET_KEY
}).unless({
  // login/register 接口不需要认证
  path: [
    /^\/users\/login/,
    /^\/users\/register/
  ]
})
)


// middlewares
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
app.use(index.routes(), index.allowedMethods())
app.use(usersRouter.routes(), usersRouter.allowedMethods())

// error-handling
app.on('error', (err, ctx) => {
  console.error('server error', err, ctx)
});

module.exports = app
