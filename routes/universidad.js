const { Router } = require('express')
const { getUniversidades, createUniversidad, deleteUniversidad } = require('../controller/universidad')

const router = Router()

router.get('/', getUniversidades)
router.post('/', createUniversidad)
router.delete('/:id', deleteUniversidad)
router.put('/:id', updateUniversidadById)


module.exports = router