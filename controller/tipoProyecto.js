const tipoProyecto = require('../models/tipoProyecto');
const { request, response } = require('express');

const getTipoProyectos = async (req = request, res = response) => {
    try {
        const tipoProyectosDB = await tipoProyecto.find();
        return res.json(tipoProyectosDB)
    } catch (e) {
        return res.status(500).json({
            msg: 'Error general' + e
        })
    }
}
module.exports = {
    getTipoProyectos
}