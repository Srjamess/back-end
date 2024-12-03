const Proyecto = require('../models/proyecto');
const { request, response, json } = require('express')
const TipoProyecto = require('../models/tipoProyecto');
const Cliente = require('../models/cliente');

//listar proyectos
const getProyectos = async (req = request, res = response) => {
    try {
        const proyectosDB = await Proyecto.find()

            .populate('tipoProyecto')
            .populate('cliente', 'nombre')
            .populate('etapa')
            .populate('universidad');

        return res.json(proyectosDB)
    } catch (e) {
        return res.status(500).json({
            msg: 'error general' + e
        })
    }
}

module.exports = {
    getProyectos
}