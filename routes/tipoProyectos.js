const { Router } = require('express')
const { getTipoProyectos, createTipoProyecto } = require('../controller/tipoProyecto')

const router =Router()

router.get('/', getTipoProyectos)
router.post('/', createTipoProyecto)

module.exports = router