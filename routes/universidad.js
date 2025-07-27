const { Router } = require('express')
const { getUniversidades, createUniversidad, deleteUniversidad, updateUniversidadById} = require('../controller/universidad')

const router = Router()

router.get('/', getUniversidades)
router.post('/', createUniversidad)
router.put('/:id', updateUniversidadById)
router.delete('/:id', deleteUniversidad)



module.exports = router