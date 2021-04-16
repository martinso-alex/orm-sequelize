const Service = require('./Service')
const database = require('../models')

class PessoasService extends Service {
  constructor () {
    super('Pessoas')
    this.matriculas = new Service('Matriculas')
  }

  async listarTodos (where = {}) {
    return database[this.model].scope('todos').findAll({where: {...where}})
  }

  async desativaPessoa (estudante_id) {
    return database.sequelize.transaction().then(t => {
      super.atualizar(
        {ativo: false},
        estudante_id,
        {transaction: t}
      )
        .then(this.matriculas.atualizarTodos(
          {status: 'cancelado'},
          {estudante_id: estudante_id},
          {transaction: t})
        )
        .then(() => t.commit())
        .catch(() => t.rollback())
    })
  }
}

module.exports = PessoasService