const pessoas = require('./pessoas')

module.exports = app => {
  app.use(pessoas)
}
