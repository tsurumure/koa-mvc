require("babel-register")

const Koa = require('koa')
const path = require('path')
const app = new Koa()

const middleware = require('./app/middleware')

require('koa-validate')(app)


// Logs
const { log, accessLogger } = require('./logs/config')
app.use(accessLogger())
app.use(async (ctx, next) => {
  const start = new Date()
  await next()
  const ms = new Date() - start
  // console.log(`${ctx.method} ${ctx.url} - ${ms}ms`)
  // log.info(`${ctx.method} ${ctx.url} - ${ms}ms`)
})



app.use(middleware.bodyParser())
app.use(middleware.serve( path.join(__dirname + '/static') ))
app.use(middleware.compress({ threshold: 0 }))
app.use(middleware.conditional())
app.use(middleware.etag())

app.use(middleware.handler)

app.keys = ['secret']
app.use(middleware.session({
  key: 'koa:sess', maxAge: 1000 * 60 * 60 // 1小时
  // maxAge: 3000
}, app))


// .unless 不需要授权登录（header: Authorization）
// 需要授权：['/api']，不需要授权：['/*', '/api/common', '/api/account/login']
const jwtKoa = require('koa-jwt')
app.use(jwtKoa({ secret: 'secret' }).unless({
    path: [/^\/((?!api).)*$|api\/account\/login|api\/common\//]
}))

// 遍历控制器 Controllers
const ctls = require('./app/controllers')
ctls.forEach(router => {
  app.use(router.routes())
})



// 创建用户
// const now = new Date()
// const models = require(__dirname + '/app/sequelize/models')
// models.Users.create({
//   username: 'bbb', password: '123456',
//   createdAt: now, updatedAt: now
// })




// art-Template
const render = require('koa-art-template')
render(app, {
  root: path.join(__dirname, '/app/views')
})



// var Boom = require('boom')
// const router = require('./app/router')
// app.use(router.routes())
// app.use(router.allowedMethods({
//   throw: true,
//   notImplemented: () => new Boom.notImplemented(),
//   methodNotAllowed: () => new Boom.methodNotAllowed()
// }))




app.listen(3000)
