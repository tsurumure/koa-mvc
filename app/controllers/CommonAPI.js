const decorator = require('./decorator')
const auth = require('./decorator/auth')
const Models = require('../sequelize/models')

@decorator.Controller({ prefix: '/api/common' })
class CommonAPI {
    @decorator.Request({ url: '/test', method: decorator.RequestMethod.GET })
    async test(ctx) {
        ctx.body = { msg: 'test' }
    }
}
module.exports = CommonAPI
