const { Router } = require('express')
const { getEtapas, crearEtapa, updateEtapaBYId } = require('../controller/etapa')

const router = Router()

router.get('/', getEtapas)
router.post('/', crearEtapa)
router.put('/:id', updateEtapaBYId)

module.exports = router