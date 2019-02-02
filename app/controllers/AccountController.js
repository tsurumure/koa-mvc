const decorator = require('./decorator')
const auth = require('./decorator/auth')
const Models = require('../sequelize/models')

@decorator.Controller({ prefix: '/account' })
class AccountController {

    // [View] 登录
    @decorator.Request({ url: '/login', method: decorator.RequestMethod.GET })
    async login(ctx) {
        ctx.render('front/login')
    }

  // test
    @decorator.Request({ url: '/test', method: decorator.RequestMethod.GET })
    async test(ctx) {
        if (await auth(ctx)) {
            const users = await Models.Users.findByPk(1)
            ctx.body = 'hi, ' + users.username
        }
    }

    // [GET] 图形验证码
    @decorator.Request({ url: '/captcha', method: decorator.RequestMethod.GET })
    async captcha(ctx) {
        const path = require('path')
        const svgCaptcha = require('svg-captcha')
        svgCaptcha.loadFont(path.join(__dirname, '../../static/fonts/svg-captcha/OCR-b.ttf'))
        var captcha = svgCaptcha.create({
            size: 4, fontSize: 30, noise: 4, color: true, width: 90, height: 40
        })
        ctx.session.captcha_text = captcha.text
        ctx.type = 'svg'
        ctx.body = captcha.data
    }

}

module.exports = AccountController
