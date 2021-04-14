const { Router } = require('express')
const NiveisController = require('../controllers/NiveisController')

const router = Router()

router.get('/niveis', NiveisController.listar)

router.get('/niveis/:id', NiveisController.buscarPorId)

router.post('/niveis', NiveisController.criar)

router.delete('/niveis/:id', NiveisController.deletar)

router.post('/niveis/:id/restaurar', NiveisController.restaurar)

router.put('/niveis/:id', NiveisController.atualizar)

module.exports = router