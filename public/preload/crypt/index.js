const encoding = require('./encoding')
const hash = require('./hash')

module.exports = {
  base64: encoding.base64,
  hex: encoding.hex,
  url: encoding.url,
  md5: hash.md5,
  sha256: hash.sha256
}
