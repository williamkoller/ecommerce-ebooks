const express = require('express')
const router = express.Router()
const UsuarioController = require('../controllers/usuarios-controller')
router.get('/', (req, res) => res.redirect('/produtos/'))
router.post('/cadastro', UsuarioController.postCadastro)
router.post('/login', UsuarioController.postLogin)

module.exports = router
