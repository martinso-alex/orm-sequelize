const { Router } = require('express')
const PessoasController = require('../controllers/PessoasController')

const router = Router()

router.get('/pessoas', PessoasController.listar)

router.get('/pessoas/:id', PessoasController.buscarPorId)

router.post('/pessoas', PessoasController.criar)

router.delete('/pessoas/:id', PessoasController.deletar)

router.put('/pessoas/:id', PessoasController.atualizar)

router.get('/pessoas/:idPessoa/matriculas', PessoasController.listarMatriculas)

router.get('/pessoas/:idPessoa/matriculas/:idMatricula', PessoasController.buscarMatriculaPorId)

router.post('/pessoas/:idPessoa/matriculas', PessoasController.criarMatricula)

router.delete('/pessoas/:idPessoa/matriculas/:idMatricula', PessoasController.deletarMatricula)

router.put('/pessoas/:idPessoa/matriculas/:idMatricula', PessoasController.atualizarMatricula)

module.exports = router