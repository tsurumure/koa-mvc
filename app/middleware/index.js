// Support Post Request (ctx.request.body)
exports.bodyParser = require('koa-bodyparser')

// Static Dir
exports.serve = require('koa-static')

// GZip
exports.compress = require('koa-compress')

// Cache
exports.conditional = require('koa-conditional-get')
exports.etag = require('koa-etag')

exports.session = require('koa-session')

exports.handler = async (ctx, next) => {
  try {
    await next();
  } catch (err) {
    ctx.response.status = err.statusCode || err.status || 500;
    ctx.response.body = {
      message: err.message
    };
  }
}