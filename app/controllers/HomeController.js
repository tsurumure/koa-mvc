const decorator = require('./decorator')
const auth = require('./decorator/auth')

@decorator.Controller({ prefix: '/' })
class HomeController {
  // [View] 首页
  @decorator.Request({ url: '/', method: decorator.RequestMethod.GET })
  async index(ctx) {
    ctx.render('front/index')
  }
  // [View] 关于我们
  @decorator.Request({ url: '/about', method: decorator.RequestMethod.GET })
  async about(ctx) {
    ctx.render('front/about')
  }

}
module.exports = HomeController