const Service = require('./Service')
const database = require('../models')

class MatriculasService extends Service {
  constructor () {
    super('Matriculas')
    this.pessoas = new Service('Pessoas')
  }

  async deletar (where) {
    return database[this.model].destroy({where: {...where}})
  }

  async restaurar (where) {
    return database[this.model].restore({where: {...where}})
  }

  async matriculasConfirmadas (id) {
    return this.pessoas.buscarPorId(id)
      .then(pessoa => {
        console.log(pessoa)
        if (pessoa) return pessoa.getMatriculasConfirmadas()
        else return
      })
  }
}

module.exports = MatriculasService