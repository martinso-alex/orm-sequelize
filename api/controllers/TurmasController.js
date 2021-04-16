const { TurmasService } = require('../services')
const turmaService = new TurmasService()
const { Op } = require('sequelize')

class TurmasController {
  static listar (req, res) {
    const { data_inicial, data_final } = req.query
    const where = {}

    if (data_inicial || data_final) where.data_inicio = {}
    if (data_inicial) where.data_inicio[Op.gte] = data_inicial
    if (data_final) where.data_inicio[Op.lte] = data_final

    turmaService.listar(where)
      .then((turmas) => res.json(turmas))
      .catch((error) => res.status(500).json(error.message))
  }

  static buscarPorId (req, res) {
    const { id } = req.params

    turmaService.buscarPorId(id)
      .then((turma) => {
        if (turma) res.json(turma)
        else res.status(404).json({"erro" : "turma não encontrada"})
      })
      .catch((error) => res.status(500).json(error.message))
  }

  static criar (req, res) {
    const nivel = req.body

    turmaService.criar(nivel)
      .then(turma => res.status(201).json(turma))
      .catch(error => res.status(500).json(error.message))
  }

  static deletar (req, res) {
    const { id } = req.params

    turmaService.deletar(id)
      .then((status) => {
        if (status) res.status(204).end()
        else res.status(404).json({"erro" : "turma não encontrada"})
      })
      .catch(error => res.status(500).json(error.message))
  }

  static restaurar (req, res) {
    const { id } = req.params

    turmaService.restaurar(id)
      .then((status) => {
        if (status) res.status(204).end()
        else res.status(404).json({"erro" : "turma não deletada"})
      })
      .catch(error => res.status(500).json(error.message))
  }

  static atualizar (req, res) {
    const { id } = req.params
    const turma = req.body

    turmaService.atualizar(turma, id)
      .then(() => turmaService.buscarPorId(id))
      .then((turma) => {
        if (turma) res.json(turma)
        else res.status(404).json({"erro" : "turma não encontrada"})
      })
      .catch(error => res.status(500).json(error.message))
  }

  static matriculasPorTurma (req, res) {
    const { id } = req.params

    turmaService.matriculasPorTurma(id)
      .then(matriculas => {
        if (matriculas.count) res.json(matriculas)
        else res.status(404).json({"erro" : "turma sem matrículas confirmadas"})
      })
      .catch(error => res.status(500).json(error.message))
  }

  static turmasLotadas (req, res) {
    const lotacaoTurma = 2

    turmaService.turmasLotadas(lotacaoTurma)
      .then(turmas => res.json(turmas))
      .catch(error => res.status(500).json(error.message))
  }
}

module.exports = TurmasController