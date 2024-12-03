const Universidad = require('../models/universidad');
const { request, response, json } = require('express');

const getUniversidades = async (req = request, res = response) => {
    try {
        const universidadDB = await Universidad.find()
        return res.json(universidadDB)
    } catch (e) {
        return res.status(500).json({
            msg: 'Error general ' + e
        })
    }
}

const createUniversidad = async (req = request, res = response) => {
    try {
        //obtener el nombre de la universidad
        const nombre = req.body.nombre ? req.body.nombre.toUpperCase() : ''
        const direccion = req.body.direccion
        const telefono = req.body.telefono

        //validar que el nombre dirección y telefono estén presentes
        if (!nombre || !direccion || !telefono) {
            return res.status(400).json({
                msg: 'El nombre, la dirección y el telefono son obligatorios.'
            })
        }

        //verificar si ya existe una universidad con el mismo nombre
        const universidadDB = await Universidad.findOne({ nombre })

        //si ya existe una universidad con el mismo nombre, retornar un error
        if (universidadDB) {
            return res.status(400).json({
                msg: `La universidad ${nombre} ya existe.`
            })
        }

        //crear una nueva universidad
        const universidad = {
            nombre,
            telefono,
            direccion
        }

        //guardar la universidad en la base de datos
        const universidadNueva = new Universidad(universidad)
        console.log(universidadNueva)
        await universidadNueva.save()
        return res.status(201).json({
            msg: `la universidad ${nombre} fue creada con exito.`,
            universidad: universidadNueva
        })
    } catch (e) {
        console.log(e)
        return res.status(500), json({
            msg: 'error en el servidor ' + e
        })
    }
}

module.exports = {
    getUniversidades,
    createUniversidad
}