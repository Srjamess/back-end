const { Router } = require('express')
const { getTipoProyectos } = require('../controller/tipoProyecto')

const router =Router()

router.get('/', getTipoProyectos)

module.exports = router