const { Router } = require('express')
const TurmasController = require('../controllers/TurmasController')

const router = Router()

router.get('/turmas', TurmasController.listar)

router.get('/turmas/lotadas', TurmasController.turmasLotadas)

router.get('/turmas/:id', TurmasController.buscarPorId)

router.get('/turmas/:id/quantidade-matriculas', TurmasController.matriculasPorTurma)

router.post('/turmas', TurmasController.criar)

router.delete('/turmas/:id', TurmasController.deletar)

router.post('/turmas/:id/restaurar', TurmasController.restaurar)

router.put('/turmas/:id', TurmasController.atualizar)

module.exports = router