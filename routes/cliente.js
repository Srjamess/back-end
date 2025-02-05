const { Router } = require('express')
const {
    getClientes,
    crearCliente,
    updateClienteById,
    deleteCliente } = require('../controller/cliente')

const router = Router()


router.get('/', getClientes)
router.post('/', crearCliente)
router.put('/:id', updateClienteById)
router.delete('/:id', deleteCliente)

module.exports = router