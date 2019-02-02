
const fs = require('fs')
const path = require('path')

let ctls = []
let filePath = __dirname
fs.readdirSync(filePath).filter(file => {
  return (file.indexOf('.') !== 0) && (file.slice(-3) === '.js') && (file !== 'auth.js' && file !== 'index.js')
}).forEach(file => {
  ctls.push(require(path.join(filePath, file)))
})
module.exports = ctls
