const path = require('path');
const log4js = require('koa-log4');

log4js.configure({
  appenders: {
    access: {
        type: 'dateFile',
        pattern: '-yyyyMMdd.log',
        filename: './logs/access/access',
        alwaysIncludePattern: true,
        daysToKeep: 1
    },
    error: {
      type: 'dateFile',
      pattern: '-yyyyMMdd.log',
      filename: './logs/error/error',
      alwaysIncludePattern: true
    },
    out: {
      type: 'console'
    }
  },
  categories: {
    default: { appenders: ['out'], level: 'info' },
    access: { appenders: ['access'], level: 'info' },
    error: { appenders: ['error'], level: 'WARN'}
  }
});

exports.accessLogger = () => log4js.koaLogger(log4js.getLogger('access')); //记录所有访问级别的日志
exports.log = log4js.getLogger('error');  //记录所有应用级别的日志
