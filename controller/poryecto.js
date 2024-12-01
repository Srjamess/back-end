const Proyecto = require('../models/Proyecto');
const { request, response, json } = require('express')
const TipoProyecto =require ('../models/tipoProyecto');
const Cliente = require('../models/cliente');

//listar proyectos
const getProyectos = async (req = request, res = response) => {
    try {
        const proyectosDB = await Proyecto.find()
            .populate({
                path: 'tipoPoyecto'
            })
            .populate({
                path: 'cliente'
            })
            return res,json(proyectosDB)
    }catch(e){
        return res.json({
            msg: 'error general' + e
        })
    }
}