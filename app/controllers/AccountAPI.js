const decorator = require('./decorator')
const auth = require('./decorator/auth')
const Models = require('../sequelize/models')

const jwt = require('jsonwebtoken')

@decorator.Controller({ prefix: '/api/account' })
class AccountAPI {

    // [API][POST] 登录
    @decorator.Request({ url: '/login', method: decorator.RequestMethod.POST })
    async loginPost(ctx) {

        // koa-validate 表单验证
        // https://github.com/RocksonZeta/koa-validate
        // const user = ctx.checkBody('username').notEmpty().value // .toInt()
        // if (ctx.errors) {
        //     ctx.body = ctx.errors
        // } else {
        //     ctx.body = user
        // }
        // return false;




        const { username, password } = ctx.request.body
        const query = await Models.Users.findOne({
            where: { username, password }
        })

        if (query) { // [username, password] SQL Success.
            console.log(`${query.id}, ${query.username}`)
            const token = jwt.sign({ id: 1 }, 'secret',
            {
                // expiresIn: 3000 + 'ms'
                expiresIn: 1000 * 60 * 60 + 'ms'
            })
            ctx.session.token = token
            ctx.body = { status: 200, token }
        } else {
            ctx.body = { status: 10201, msg: '用户名或密码错误' }
        }



    }

    // [API][GET] 个人信息
    @decorator.Request({ url: '/info', method: decorator.RequestMethod.GET })
    async getUserInfo(ctx) {
        if (await auth(ctx)) {
            ctx.body = { status: 200, data: { name: 'mure', age: 30 } }
        }
    }

    // test
    @decorator.Request({ url: '/logout', method: decorator.RequestMethod.GET })
    async logout(ctx) {
        if (await auth(ctx)) {
            ctx.session.token = null
            ctx.body = { status: 200, msg: 'success' }
        }

    }

    // test
    @decorator.Request({ url: '/test', method: decorator.RequestMethod.GET })
    async test(ctx) {
        if (await auth(ctx)) {
            ctx.body = { msg: 'test' }
        }
    }

}
module.exports = AccountAPI
