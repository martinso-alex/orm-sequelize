const pessoas = require('./pessoas')
const niveis = require('./niveis')
const turmas = require('./turmas')

module.exports = app => {
  app.use(pessoas)
  app.use(niveis)
  app.use(turmas)
}
