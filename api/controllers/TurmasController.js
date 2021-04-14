const database = require('../models')

class TurmasController {
  static listar (req, res) {
    database.Turmas.findAll()
      .then((turmas) => res.json(turmas))
      .catch((error) => res.json(error))
  }

  static buscarPorId (req, res) {
    const { id } = req.params

    database.Turmas.findByPk(id)
      .then((turma) => {
        if (turma) res.json(turma)
        else res.status(404).json(nivel)
      })
      .catch((error) => res.json(error))
  }

  static criar (req, res) {
    const nivel = req.body

    database.Turmas.create(nivel)
      .then(turma => res.status(201).json(turma))
      .catch(error => res.json(error))
  }

  static deletar (req, res) {
    const { id } = req.params

    database.Turmas.destroy({where: {id: id}})
      .then((status) => {
        if (status) res.status(204).end()
        else res.status(404).json({"erro" : "turma não encontrada"})
      })
      .catch(error => res.json(error))
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
      .catch(error => res.json(error))
  }
}

module.exports = TurmasController