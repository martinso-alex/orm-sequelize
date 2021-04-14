const database = require('../models')

class NiveisController {
  static listar (req, res) {
    database.Niveis.findAll()
      .then((niveis) => res.json(niveis))
      .catch((error) => res.json(error))
  }

  static buscarPorId (req, res) {
    const { id } = req.params

    database.Niveis.findByPk(id)
      .then((nivel) => {
        if (nivel) res.json(nivel)
        else res.status(404).json(nivel)
      })
      .catch((error) => res.json(error))
  }

  static criar (req, res) {
    const nivel = req.body

    database.Niveis.create(nivel)
      .then(nivel => res.status(201).json(nivel))
      .catch(error => res.json(error))
  }

  static deletar (req, res) {
    const { id } = req.params

    database.Niveis.destroy({where: {id: id}})
      .then((status) => {
        if (status) res.status(204).end()
        else res.status(404).json({"erro" : "nível não encontrada"})
      })
      .catch(error => res.json(error))
  }

  static atualizar (req, res) {
    const { id } = req.params
    const nivel = req.body

    database.Niveis.update(nivel, {where: {id:id}})
      .then(() => database.Niveis.findByPk(id))
      .then((nivel) => {
        if (nivel) res.json(nivel)
        else res.status(404).json({"erro" : "nível não encontrada"})
      })
      .catch(error => res.json(error))
  }
}

module.exports = NiveisController