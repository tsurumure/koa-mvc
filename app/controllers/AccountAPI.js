const decorator = require('./decorator')
const auth = require('./decorator/auth')
const Models = require('../sequelize/models')

const jwt = require('jsonwebtoken')

@decorator.Controller({ prefix: '/api/account' })
class AccountAPI {

    // [API][POST] Login 登录
    @decorator.Request({ url: '/login', method: decorator.RequestMethod.POST })
    async loginPost(ctx) {

        // koa-validate 表单验证
        // https://github.com/RocksonZeta/koa-validate
        const username = ctx.checkBody('username').notEmpty().value // .toInt()
        const password = ctx.checkBody('password').notEmpty().value
        const captcha = ctx.checkBody('captcha').notEmpty().value

        // [Validate] Form
        if (!ctx.errors) {
            // [Validate] Captcha
            if (ctx.session.captcha_text == captcha.toLowerCase()) {
                const query = await Models.Users.findOne({
                    where: { username, password }
                })
                // [Validate] username, password
                if (query) {
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
            } else {
                ctx.body = { status: 10202, msg: '验证码错误' }
            }
        } else {
            ctx.body = { status: 10203, data: ctx.errors }
        }

    }

    // [API][GET] 个人信息
    @decorator.Request({ url: '/info', method: decorator.RequestMethod.GET })
    async getUserInfo(ctx) {
        ctx.body = { status: 200, data: { name: 'mure', age: 30 } }
    }

    // [GET] Logout 注销
    @decorator.Request({ url: '/logout', method: decorator.RequestMethod.GET })
    async logout(ctx) {
        ctx.session.token = null
        ctx.body = { status: 200, msg: 'success' }
    }

    // test
    @decorator.Request({ url: '/test', method: decorator.RequestMethod.GET })
    async test(ctx) {
        ctx.body = { msg: 'test' }
    }

}
module.exports = AccountAPI
