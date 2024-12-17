const { Router } = require('express')
const { getEtapas, crearEtapa, updateEtapaBYId, deleteEtapa } = require('../controller/etapa')

const router = Router()

router.get('/', getEtapas)
router.post('/', crearEtapa)
router.put('/:id', updateEtapaBYId)
router.delete('/:id', deleteEtapa)

module.exports = router