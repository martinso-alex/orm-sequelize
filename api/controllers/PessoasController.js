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

  static listarMatriculas (req, res) {
    const { idPessoa } = req.params

    database.Matriculas.findAll({where: {estudante_id: idPessoa}})
      .then((matriculas) => res.json(matriculas))
      .catch((error) => res.json(error))
  }

  static buscarMatriculaPorId (req, res) {
    const { idPessoa, idMatricula } = req.params

    database.Matriculas.findOne(
        {where: {id: idMatricula, estudante_id: idPessoa}}
      )
      .then((matricula) => {
        if (matricula) res.json(matricula)
        else res.status(404).json(matricula)
      })
      .catch((error) => res.json(error))
  }

  static criarMatricula (req, res) {
    const { idPessoa } = req.params
    const matricula = {...req.body, estudante_id: idPessoa}

    database.Matriculas.create(matricula)
      .then(matricula => res.status(201).json(matricula))
      .catch(error => res.json(error))
  }

  static deletarMatricula (req, res) {
    const { idMatricula, idPessoa } = req.params

    database.Matriculas.destroy({where: {id: idMatricula, estudante_id: idPessoa}})
      .then((status) => {
        if (status) res.status(204).end()
        else res.status(404).json({"erro" : "matricula não encontrada"})
      })
      .catch(error => res.json(error))
  }

  static atualizarMatricula (req, res) {
    const { idMatricula, idPessoa } = req.params
    const matricula = req.body

    database.Matriculas.update(matricula, {where: {id:idMatricula, estudante_id: idPessoa}})
      .then(() => database.Matriculas.findByPk(idMatricula))
      .then((matricula) => {
        if (matricula) res.json(matricula)
        else res.status(404).json({"erro" : "matricula não encontrada"})
      })
      .catch(error => res.json(error))
  }
}

module.exports = PessoasController