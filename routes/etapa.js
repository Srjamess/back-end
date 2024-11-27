const { Router } = require('express')
const { getEtapas } = require('../controller/etapa')

const router = Router()

router.get('/', getEtapas)

module.exports = router