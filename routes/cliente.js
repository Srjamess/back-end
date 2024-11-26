const { Router } = require('express')
const {
    getClientes,
    crearCliente,
    updateClienteById } = require('../controller/cliente')

const router = Router()

// consultar
router.get('/', getClientes)

// crear
router.post('/', crearCliente)

router.put('/:id', updateClienteById)


module.exports = router