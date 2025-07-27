const { Router } = require('express')
const { getTipoProyectos, createTipoProyecto,updateTipoProyectoById, deleteTipoProyecto } = require('../controller/tipoProyecto')

const router =Router()

router.get('/', getTipoProyectos)
router.post('/', createTipoProyecto)
router.put('/:id', updateTipoProyectoById)
router.delete('/:id', deleteTipoProyecto)

module.exports = router