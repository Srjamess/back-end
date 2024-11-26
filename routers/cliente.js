const { Router } = require('express')
const { crearCliente } = require('../controller/cliente')

const router = Router()

// crear
router.post('/', createCliente)