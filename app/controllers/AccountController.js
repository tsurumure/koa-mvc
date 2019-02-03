const decorator = require('./decorator')
const auth = require('./decorator/auth')
const Models = require('../sequelize/models')

@decorator.Controller({ prefix: '/account' })
class AccountController {

    // [View] （需要登录访问）
    @decorator.Request({ url: '/', method: decorator.RequestMethod.GET })
    @auth()
    async auth(ctx) {
        ctx.render('front/auth', { ctx })
    }

    // [View] 登录
    @decorator.Request({ url: '/login', method: decorator.RequestMethod.GET })
    async login(ctx) {
        console.log(ctx.session.token)
        ctx.render('front/login', { ctx, title: 'Login' })
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
        ctx.session.captcha_text = captcha.text.toLowerCase()
        ctx.type = 'svg'
        ctx.body = captcha.data
    }

}

module.exports = AccountController
