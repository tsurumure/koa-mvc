const decorator = require('./decorator')
const auth = require('./decorator/auth')

@decorator.Controller({ prefix: '/hello' })
class HelloController{
    @decorator.Request({ url: '/', method: decorator.RequestMethod.GET })
    async hello(ctx) {
        ctx.body = '<div>Hello World, <a href="/hello/detail">detail</a></div>'
    }

    @decorator.Request({ url: '/detail', method: decorator.RequestMethod.GET })
    async detail(ctx) {
        ctx.body = 'hello detail'
    }
}

module.exports = HelloController
// 返回 Router 对象

