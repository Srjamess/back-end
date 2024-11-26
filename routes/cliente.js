const { Router } = require('express')
const {
    getClientes,
    crearCliente,
    updateClienteById,
    deleteCliente } = require('../controller/cliente')

const router = Router()

// consultar
router.get('/', getClientes)

// crear
router.post('/', crearCliente)

router.put('/:id', updateClienteById)

router.delete('/:id', deleteCliente)


module.exports = router