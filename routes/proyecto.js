const { Router } = require('express')
const { getProyectos } = require('../controller/proyecto')

const router = Router()

router.get('/', getProyectos)

module.exports = router