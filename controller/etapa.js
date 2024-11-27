const e = require('express')
const Etapa = require('../models/etapa')
const { request, response, json } = require('express')

const getEtapas = async (req = request, res = response) => {
    try {
        const etapasDB = await Etapa.find()
        return res.json(etapasDB)
    } catch (e) {
        return res.status(500).json({
            msg: 'Error general' + e
        })
    }
}

module.exports = { getEtapas }