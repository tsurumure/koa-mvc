const decorator = require('./decorator')

@decorator.Controller({ prefix: '/foo' })
class HelloController{
    @decorator.Request({url: '/', method: decorator.RequestMethod.GET })
    async hello(ctx) {
        ctx.body = '<div>hi foo, <a href="/foo/detail">detail</a></div>'
    }

    @decorator.Request({ url: '/detail', method: decorator.RequestMethod.GET })
    async detail(ctx) {
        ctx.body = 'hi foo detail'
    }
}

module.exports = HelloController
// 返回 Router 对象

