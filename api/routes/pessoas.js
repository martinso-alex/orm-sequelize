const { Router } = require('express')
const PessoasController = require('../controllers/PessoasController')

const router = Router()

router.get('/pessoas', PessoasController.listar)

module.exports = router