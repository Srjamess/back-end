const { Router } = require('express')
const { getUniversidades, createUniversidad } = require('../controller/universidad')

const router = Router()

router.get('/', getUniversidades)
router.post('/', createUniversidad)

module.exports = router