const Service = require('./Service')
const sequelize = require('sequelize')
const database = require('../models')

class TurmasService extends Service {
  constructor () {
    super('Turmas')
    this.matriculas = new Service('Matriculas')
  }

  async matriculasPorTurma (id) {
    return database[this.matriculas.model].findAndCountAll({
      where: {
        turma_id: id,
        status: 'confirmado'
      },
      limit: 20,
      order: [['estudante_id', 'ASC']]
    })
  }

  async turmasLotadas (lotacaoTurma) {
    return database[this.matriculas.model].count({
      where: {status: 'confirmado'},
      attributes: ['turma_id'],
      group: ['turma_id'],
      having: sequelize.literal(`count(turma_id) >= ${lotacaoTurma}`)
    })
  }
}

module.exports = TurmasService