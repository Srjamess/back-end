const { Router } = require('express')
const { getClientes, crearCliente } = require('../controller/cliente')

const router = Router()

// consultar
router.get('/', getClientes)

// crear
router.post('/', crearCliente)
    

module.exports = router