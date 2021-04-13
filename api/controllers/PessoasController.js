const database = require('../models')

class PessoasController {
  static listar (req, res) {
    database.Pessoas.findAll()
      .then((pessoas) => res.json(pessoas))
      .catch((error) => res.json(error))
  }

  static buscarPorId (req, res) {
    const { id } = req.params

    database.Pessoas.findByPk(id)
      .then((pessoa) => {
        if (pessoa) res.json(pessoa)
        else res.status(404).json(pessoa)
      })
      .catch((error) => res.json(error))
  }

  static criar (req, res) {
    const pessoa = req.body

    database.Pessoas.create(pessoa)
      .then(pessoa => res.status(201).json(pessoa))
      .catch(error => res.json(error))
  }

  static deletar (req, res) {
    const { id } = req.params

    database.Pessoas.destroy({where: {id: id}})
      .then((status) => {
        if (status) res.status(204).end()
        else res.status(404).json({"erro" : "pessoa não encontrada"})
      })
      .catch(error => res.json(error))
  }

  static atualizar (req, res) {
    const { id } = req.params
    const pessoa = req.body

    database.Pessoas.update(pessoa, {where: {id:id}})
      .then(() => database.Pessoas.findByPk(id))
      .then((pessoa) => {
        if (pessoa) res.json(pessoa)
        else res.status(404).json({"erro" : "pessoa não encontrada"})
      })
      .catch(error => res.json(error))
  }
}

module.exports = PessoasController