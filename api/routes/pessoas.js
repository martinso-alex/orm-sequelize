const { Router } = require('express')
const PessoasController = require('../controllers/PessoasController')

const router = Router()

router.get('/pessoas', PessoasController.listar)

router.get('/pessoas/:id', PessoasController.buscarPorId)

router.post('/pessoas', PessoasController.criar)

router.delete('/pessoas/:id', PessoasController.deletar)

router.put('/pessoas/:id', PessoasController.atualizar)

module.exports = router