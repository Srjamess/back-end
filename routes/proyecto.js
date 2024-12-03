const { Router } = require('express')
const { getProyectos, createProyecto } = require('../controller/proyecto')

const router = Router()

router.get('/', getProyectos)
router.post('/', createProyecto)

module.exports = router