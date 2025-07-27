const TipoProyecto = require('../models/tipoProyecto');
const { request, response, json } = require('express');

const getTipoProyectos = async (req = request, res = response) => {
    try {
        const tipoProyectosDB = await TipoProyecto.find();
        return res.json(tipoProyectosDB)
    } catch (e) {
        return res.status(500).json({
            msg: 'Error general' + e
        })
    }
}

const createTipoProyecto = async (req = request, res = response) => {
    try {
        //obtener el nombre de tipoProyecto
        const nombre = req.body.nombre ? req.body.nombre.toUpperCase() : ''

        // Validar que el nombre esté presente
        if (!nombre) {
            return res.status(400).json({
                msg: 'El nombre es obligatorio'
            })
        }

        // Verificar si ya existe un tipoProyecto con ese nombre
        const tipoProyectoDB = await TipoProyecto.findOne({ nombre })


        // Si ya existe un tipoProyecto con ese nombre, retornar un error
        if (tipoProyectoDB) {
            return res.status(400).json({
                msg: `El tipo de proyecto ${nombre} ya existe.`
            })
        }

        //crear un nuevo tipoProyecto
        const tipoProyecto = { nombre }

        //guardar el tipoProyecto en la base de datos
        const tipoProyectoNuevo = new TipoProyecto(tipoProyecto)
        console.log(tipoProyectoNuevo)

        await tipoProyectoNuevo.save()

        return res.status(201).json({
            msg: `El tipo de proyecto ${nombre} fue creado. `,
            tipoProyecto: tipoProyectoNuevo
        })
    } catch (e) {
        console.log(e)
        return res.status(500).json({
            msg: 'Error en el servidor' + e
        })
    }
}

const updateTipoProyectoById = async (req = request, res = response) => {
    try {
        //obtener el nombre de tipoProyecto
        const id =req.body.id
        // obtener el nombre de tipoProyecto
        const data =req.body.nombre ? req.body.nombre.toUperCase() : ''

        // Validar que el nombre esté presente
        if(!id){
            return res.status(400).json({
                msg: "el id es obligatorio"
            })
        }

        const TipoProyectoDB = await TipoProyecto.findByIdAndUpdate(id,data, {
            new: true,
        });
        return res.status(200).json({
            msg: `El tipo de proyecto ${data.nombre} fue actualizado.`,
            tipoProyecto: TipoProyectoDB
        });

    } catch (e) {
        return res.status(500).json({
            msg:"Error de el servidor" + e  
        })
    }

}

const deleteTipoProyecto = async (req = request, res = response) => {
    try {
        const { id } = req.params;

        // Validar que el id esté presente
        if (!id) {
            return res.status(400).json({
                msg: "El id es obligatorio"
            });
        }

        const tipoProyectoDB = await TipoProyecto.findByIdAndDelete(id);

        // Verificar si el tipoProyecto fue encontrado y eliminado
        if (!tipoProyectoDB) {
            return res.status(404).json({
                msg: `El tipo de proyecto con id ${id} no fue encontrado.`
            });
        }

        return res.status(200).json({
            msg: `El tipo de proyecto ${tipoProyectoDB.nombre} fue eliminado.`,
            tipoProyecto: tipoProyectoDB
        });
    } catch (e) {
        return res.status(500).json({
            msg: "Error de el servidor" + e
        });
    }
}

module.exports = {
    getTipoProyectos,
    createTipoProyecto,
    updateTipoProyectoById,
    deleteTipoProyecto
}