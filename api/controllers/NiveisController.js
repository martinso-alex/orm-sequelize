const { NiveisService } = require('../services')
const nivelService = new NiveisService()

class NiveisController {
  static listar (req, res) {
    nivelService.listar()
      .then((niveis) => res.json(niveis))
      .catch((error) => res.status(500).json(error.message))
  }

  static buscarPorId (req, res) {
    const { id } = req.params

    nivelService.buscarPorId(id)
      .then((nivel) => {
        if (nivel) res.json(nivel)
        else res.status(404).json({"erro" : "nível não encontrado"})
      })
      .catch((error) => res.status(500).json(error.message))
  }

  static criar (req, res) {
    const nivel = req.body

    nivelService.criar(nivel)
      .then(nivel => res.status(201).json(nivel))
      .catch(error => res.status(500).json(error.message))
  }

  static deletar (req, res) {
    const { id } = req.params

    nivelService.deletar(id)
      .then((status) => {
        if (status) res.status(204).end()
        else res.status(404).json({"erro" : "nível não encontrado"})
      })
      .catch(error => res.status(500).json(error.message))
  }

  static restaurar (req, res) {
    const { id } = req.params

    nivelService.restaurar(id)
      .then((status) => {
        if (status) res.status(204).end()
        else res.status(404).json({"erro" : "nível não deletado"})
      })
      .catch(error => res.status(500).json(error.message))
  }

  static atualizar (req, res) {
    const { id } = req.params
    const nivel = req.body

    nivelService.atualizar(nivel, id)
      .then(() => nivelService.buscarPorId(id))
      .then((nivel) => {
        if (nivel) res.json(nivel)
        else res.status(404).json({"erro" : "nível não encontrado"})
      })
      .catch(error => res.status(500).json(error.message))
  }
}

module.exports = NiveisController