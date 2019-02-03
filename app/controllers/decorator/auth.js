const session = require('koa-session')
const jwt = require('jsonwebtoken')

module.exports = () => {
    return function (target, key, descriptor) {
        let fn = descriptor.value
        descriptor.value = async (ctx) => {
            const token = ctx.session.token
            if (token) {
                jwt.verify(token, 'secret', function(err, decoded) {
                    if (err) {
                        ctx.render('front/layout/error', { ctx, status: 10401, msg: 'token 已过期' })
                    }
                    if (decoded) { fn(ctx) }
                })
            } else {
                ctx.render('front/layout/error', { ctx, status: 401, msg: '未登录' })
            }
        }
    }
}

// module.exports = (ctx) => {
//     return new Promise((resolve, reject) => {
//         const token = ctx.session.token
//         if (token) {
//             jwt.verify(token, 'secret', function(err, decoded) {
//                 if (err) {
//                     // ctx.body = { status: 10401, msg: 'token 已过期' }
//                     ctx.render('front/layout/error', { ctx, status: 10401, msg: 'token 已过期' })
//                     resolve(false)
//                 }
//                 if (decoded) { resolve(decoded) }
//             })
//         } else {
//             resolve(false)
//             // ctx.body = { status: 401, msg: '未登录' }
//             ctx.render('front/layout/error', { ctx, status: 401, msg: '未登录' })
//         }
//     })
// }
