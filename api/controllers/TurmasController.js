const database = require('../models')

class TurmasController {
  static listar (req, res) {
    database.Turmas.findAll()
      .then((turmas) => res.json(turmas))
      .catch((error) => res.status(500).json(error.message))
  }

  static buscarPorId (req, res) {
    const { id } = req.params

    database.Turmas.findByPk(id)
      .then((turma) => {
        if (turma) res.json(turma)
        else res.status(404).json(nivel)
      })
      .catch((error) => res.status(500).json(error.message))
  }

  static criar (req, res) {
    const nivel = req.body

    database.Turmas.create(nivel)
      .then(turma => res.status(201).json(turma))
      .catch(error => res.status(500).json(error.message))
  }

  static deletar (req, res) {
    const { id } = req.params

    database.Turmas.destroy({where: {id: id}})
      .then((status) => {
        if (status) res.status(204).end()
        else res.status(404).json({"erro" : "turma não encontrada"})
      })
      .catch(error => res.status(500).json(error.message))
  }

  static restaurar (req, res) {
    const { id } = req.params

    database.Turmas.restore({where: {id: id}})
      .then((status) => {
        if (status) res.status(204).end()
        else res.status(404).json({"erro" : "turma não deletada"})
      })
      .catch(error => res.status(500).json(error.message))
  }

  static atualizar (req, res) {
    const { id } = req.params
    const turma = req.body

    database.Turmas.update(turma, {where: {id:id}})
      .then(() => database.Turmas.findByPk(id))
      .then((turma) => {
        if (turma) res.json(turma)
        else res.status(404).json({"erro" : "turma não encontrada"})
      })
      .catch(error => res.status(500).json(error.message))
  }
}

module.exports = TurmasController