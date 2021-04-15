const database = require('../models')

class PessoasController {
  static listarAtivos (req, res) {
    database.Pessoas.findAll()
      .then((pessoas) => res.json(pessoas))
      .catch((error) => res.status(500).json(error.message))
  }

  static listar (req, res) {
    database.Pessoas.scope('todos').findAll()
      .then((pessoas) => res.json(pessoas))
      .catch((error) => res.status(500).json(error.message))
  }

  static buscarPorId (req, res) {
    const { id } = req.params

    database.Pessoas.findByPk(id)
      .then((pessoa) => {
        if (pessoa) res.json(pessoa)
        else res.status(404).json(pessoa)
      })
      .catch((error) => res.status(500).json(error.message))
  }

  static criar (req, res) {
    const pessoa = req.body

    database.Pessoas.create(pessoa)
      .then(pessoa => res.status(201).json(pessoa))
      .catch(error => res.status(500).json(error.message))
  }

  static deletar (req, res) {
    const { id } = req.params

    database.Pessoas.destroy({where: {id: id}})
      .then((status) => {
        if (status) res.status(204).end()
        else res.status(404).json({"erro" : "pessoa não encontrada"})
      })
      .catch(error => res.status(500).json(error.message))
  }

  static restaurar (req, res) {
    const { id } = req.params

    database.Pessoas.restore({where: {id: id}})
      .then((status) => {
        if (status) res.status(204).end()
        else res.status(404).json({"erro" : "pessoa não deletada"})
      })
      .catch(error => res.status(500).json(error.message))
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
      .catch(error => res.status(500).json(error.message))
  }

  static listarMatriculas (req, res) {
    const { idPessoa } = req.params

    database.Matriculas.findAll({where: {estudante_id: idPessoa}})
      .then((matriculas) => res.json(matriculas))
      .catch((error) => res.status(500).json(error.message))
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
      .catch((error) => res.status(500).json(error.message))
  }

  static criarMatricula (req, res) {
    const { id } = req.params
    const matricula = {...req.body, estudante_id: id}

    database.Matriculas.create(matricula)
      .then(matricula => res.status(201).json(matricula))
      .catch(error => res.status(500).json(error.message))
  }

  static deletarMatricula (req, res) {
    const { idMatricula, idPessoa } = req.params

    database.Matriculas.destroy({where: {id: idMatricula, estudante_id: idPessoa}})
      .then((status) => {
        if (status) res.status(204).end()
        else res.status(404).json({"erro" : "matricula não encontrada"})
      })
      .catch(error => res.status(500).json(error.message))
  }

  static restaurarMatricula (req, res) {
    const { idMatricula, idPessoa } = req.params

    database.Matriculas.restore({where: {id: idMatricula, estudante_id: idPessoa}})
      .then((status) => {
        if (status) res.status(204).end()
        else res.status(404).json({"erro" : "matricula não deletada"})
      })
      .catch(error => res.status(500).json(error.message))
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
      .catch(error => res.status(500).json(error.message))
  }

  static matriculasConfirmadas (req, res) {
    const { id } = req.params

    database.Pessoas.findByPk(id)
      .then(pessoa => pessoa.getMatriculasConfirmadas())
      .then(matriculas => res.json(matriculas))
      .catch(error => res.status(500).json(error.message))
  }

  static desativaPessoa (req, res) {
    const { id } = req.params

    database.sequelize.transaction().then(t => {
      database.Pessoas.update(
        {ativo: false}, 
        {where: {id: id}}, 
        {transaction: t}
      )
        .then(() =>
          database.Matriculas.update(
            {status: 'cancelado'},
            {where: {estudante_id: id}}, 
            {transaction: t}
          )
        )
        .then(() => {
          t.commit()
          res.json({mensagem: `matrículas do estudante ${id} canceladas`})
        })
        .catch(error => {
          t.rollback()
          res.status(500).json(error.message)
        })
    })
    
  }
}

module.exports = PessoasController