const { PessoasService } = require('../services')
const pessoaService = new PessoasService()

class PessoasController {
  static listarAtivos (req, res) {
    pessoaService.listar()
      .then(pessoas => res.json(pessoas))
      .catch(error => res.status(500).json(error.message))
  }

  static listarTodos (req, res) {
    pessoaService.listarTodos()
      .then(pessoas => res.json(pessoas))
      .catch(error => res.status(500).json(error.message))
  }

  static buscarPorId (req, res) {
    const { id } = req.params

    pessoaService.buscarPorId(id)
      .then(pessoa => {
        if (pessoa) res.json(pessoa)
        else res.status(404).json({"erro" : "pessoa não encontrada"})
      })
      .catch((error) => res.status(500).json(error.message))
  }

  static criar (req, res) {
    const pessoa = req.body

    pessoaService.criar(pessoa)
      .then(pessoa => res.status(201).json(pessoa))
      .catch(error => res.status(500).json(error.message))
  }

  static deletar (req, res) {
    const { id } = req.params

    pessoaService.deletar(id)
      .then(status => {
        if (status) res.status(204).end()
        else res.status(404).json({"erro" : "pessoa não encontrada"})
      })
      .catch(error => res.status(500).json(error.message))
  }

  static restaurar (req, res) {
    const { id } = req.params

    pessoaService.restaurar(id)
      .then(status => {
        if (status) res.status(204).end()
        else res.status(404).json({"erro" : "pessoa não deletada"})
      })
      .catch(error => res.status(500).json(error.message))
  }

  static atualizar (req, res) {
    const { id } = req.params
    const pessoa = req.body

    pessoaService.atualizar(pessoa, id)
      .then(() => pessoaService.buscarPorId(id))
      .then(pessoa => {
        if (pessoa) res.json(pessoa)
        else res.status(404).json({"erro" : "pessoa não encontrada"})
      })
      .catch(error => res.status(500).json(error.message))
  }

  static desativaPessoa (req, res) {
    const { id } = req.params

    pessoaService.desativaPessoa(id)
      .then(() => res.json({mensagem: `matrículas do estudante ${id} canceladas`}))
      .catch(error => res.status(500).json(error.message))
  }
}

module.exports = PessoasController