const database = require('../models')

class Service {
  constructor (model) {
    this.model = model
  }

  async listar (where = {}) {
    return database[this.model].findAll({where: {...where}})
  }

  async buscarPorId (id) {
    return database[this.model].findByPk(id)
  }

  async buscar (where) {
    return database[this.model].findOne({where: {...where}})
  }

  async criar (dados) {
    return database[this.model].create(dados)
  }

  async deletar (id, where = {}) {
    return database[this.model].destroy({where: {...where, id}})
  }

  async restaurar (id, where = {}) {
    return database[this.model].restore({where: {...where, id}})
  }

  async atualizar (dados, id, transaction = {}) {
    return database[this.model]
      .update(dados, {where: {id: id}}, transaction)
  }

  async atualizarTodos (dados, where, transaction = {}) {
    return database[this.model]
      .update(dados, {where: {...where}}, transaction)
  }
}

module.exports = Service