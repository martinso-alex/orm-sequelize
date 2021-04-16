const { MatriculasService } = require('../services')
const matriculaService = new MatriculasService()

class MatriculasController {
  static listar (req, res) {
    const { idPessoa } = req.params

    matriculaService.listar({where: {estudante_id: idPessoa}})
      .then((matriculas) => res.json(matriculas))
      .catch((error) => res.status(500).json(error.message))
  }

  static buscar (req, res) {
    
    const { idPessoa, idMatricula } = req.params

    matriculaService.buscar(
        {id: idMatricula, estudante_id: idPessoa}
    )
      .then((matricula) => {
        if (matricula) res.json(matricula)
        else res.status(404).json({"erro" : "matricula não encontrada"})
      })
      .catch((error) => res.status(500).json(error.message))
  }

  static criar (req, res) {
    const { id } = req.params
    const matricula = {...req.body, estudante_id: id}

    matriculaService.criar(matricula)
      .then(matricula => res.status(201).json(matricula))
      .catch(error => res.status(500).json(error.message))
  }

  static deletar (req, res) {
    const { idMatricula, idPessoa } = req.params

    matriculaService.deletar(
      {id: idMatricula, estudante_id: idPessoa}
    )
      .then((status) => {
        if (status) res.status(204).end()
        else res.status(404).json({"erro" : "matricula não encontrada"})
      })
      .catch(error => res.status(500).json(error.message))
  }

  static restaurar (req, res) {
    const { idMatricula, idPessoa } = req.params

    matriculaService.restaurar(
      {id: idMatricula, estudante_id: idPessoa}
    )
      .then((status) => {
        if (status) res.status(204).end()
        else res.status(404).json({"erro" : "matricula não deletada"})
      })
      .catch(error => res.status(500).json(error.message))
  }

  static atualizar (req, res) {
    const { idMatricula, idPessoa } = req.params
    const matricula = req.body

    matriculaService.atualizarTodos(
      matricula,
      {id:idMatricula, estudante_id: idPessoa}
    )
      .then(() => matriculaService.buscarPorId(idMatricula))
      .then((matricula) => {
        if (matricula) res.json(matricula)
        else res.status(404).json({"erro" : "matricula não encontrada"})
      })
      .catch(error => res.status(500).json(error.message))
  }

  static matriculasConfirmadas (req, res) {
    const { id } = req.params

    matriculaService.matriculasConfirmadas(id)
      .then(matriculas => {
        if (matriculas) res.json(matriculas)
        else res.status(404).json({"erro" : "pessoa não encontrada"})
      })
      .catch(error => res.status(500).json(error.message))
  }
}

module.exports = MatriculasController