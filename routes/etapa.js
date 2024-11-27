const { Router } = require('express')
const { getEtapas, crearEtapa } = require('../controller/etapa')

const router = Router()

router.get('/', getEtapas)
router.post('/', crearEtapa)

module.exports = router