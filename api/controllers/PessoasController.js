const database = require('../models')

class PessoasController {
  static listar (req, res) {
    database.Pessoas.findAll()
      .then((pessoas) => res.json(pessoas))
      .catch((error) => res.json(error))
  }
}

module.exports = PessoasController