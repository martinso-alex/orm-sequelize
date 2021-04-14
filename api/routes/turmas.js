const { Router } = require('express')
const TurmasController = require('../controllers/TurmasController')

const router = Router()

router.get('/turmas', TurmasController.listar)

router.get('/turmas/:id', TurmasController.buscarPorId)

router.post('/turmas', TurmasController.criar)

router.delete('/turmas/:id', TurmasController.deletar)

router.put('/turmas/:id', TurmasController.atualizar)

module.exports = router