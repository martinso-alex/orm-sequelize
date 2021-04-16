const { Router } = require('express')
const PessoasController = require('../controllers/PessoasController')
const MatriculasController = require('../controllers/MatriculasController')

const router = Router()

router.get(
  '/pessoas',
  PessoasController.listarAtivos
)

router.get(
  '/pessoas/todas',
  PessoasController.listarTodos
)

router.get(
  '/pessoas/:id',
  PessoasController.buscarPorId
)

router.post(
  '/pessoas',
  PessoasController.criar
)

router.delete(
  '/pessoas/:id',
  PessoasController.deletar
)

router.post(
  '/pessoas/:id/restaurar',
  PessoasController.restaurar
)

router.post(
  '/pessoas/:id/desativar',
  PessoasController.desativaPessoa
)

router.put(
  '/pessoas/:id',
  PessoasController.atualizar
)

router.get(
  '/pessoas/:idPessoa/matriculas',
  MatriculasController.listar
)

router.get(
  '/pessoas/:id/matriculas-confirmadas',
  MatriculasController.matriculasConfirmadas
)

router.get(
  '/pessoas/:idPessoa/matriculas/:idMatricula',
  MatriculasController.buscar
)

router.post(
  '/pessoas/:id/matriculas',
  MatriculasController.criar
)

router.delete(
  '/pessoas/:idPessoa/matriculas/:idMatricula',
  MatriculasController.deletar
)

router.post(
  '/pessoas/:idPessoa/matriculas/:idMatricula/restaurar',
  MatriculasController.restaurar
)

router.put(
  '/pessoas/:idPessoa/matriculas/:idMatricula',
  MatriculasController.atualizar
)

module.exports = router