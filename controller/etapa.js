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

const crearEtapa = async (req = request, res = response) => {
    try {
        //obtener el nombre de la etapa
        const nombre = req.body.nombre
            ? req.body.nombre.toUpperCase() : '';
        // const anteProyecto = req.body.anteProyecto
        //     ? req.body.anteProyecto.toUpperCase() : '';
        // const entregaParcial1 = req.body.entregaParcial1
        //     ? req.body.entregaParcial1.toUpperCase() : '';
        // const entregraparcial2 = req.body.entregraparcial2
        //     ? req.body.entregraparcial2.toUpperCase() : '';
        // const entregaFinal = req.body.entregaFinal
        //     ? req.body.entregaFinal.toUpperCase() : '';


        //verificar si la etapa ya existe
        const etapaDB = await Etapa.findOne({
            nombre
            // anteProyecto,
            // entregaParcial1,
            // entregraparcial2,
            // entregaFinal
        });

        //si la etapa ya existe
        if (etapaDB) {
            return res.status(400).json({
                msg: `La etapa "${etapaDB.nombre}" ya existe`
            })
        }

        //crear la etapa
        const etapa = new Etapa({
            nombre
            // anteProyecto,
            // entregaParcial1,
            // entregraparcial2,
            // entregaFinal
        })

        //guardar la etapa
        const newEtapa = new Etapa(etapa)
        console.log(newEtapa);
        await newEtapa.save();
        return res.status(201).json({
            msg: `Etapa  ${nombre}creada`,
            etapa: newEtapa
        });
    } catch (e) {
        return res.status(500).json({
            msg: 'Error general' + e
        })
    }
}

const updateEtapaBYId = async (req = request, res = response) => {
    try {
        //obtener el id de la etapa
        const id = req.body.id
        //obtener el nombre de la etapa
        const data = req.body
        data.nombre = data.nombre ? data.nombre.toUpperCase() : ''
        data.fechaActualizacion = Date.now()

        //validar que el id de la etapa esté presente
        if (!id) {
            return res.status(400), json({
                msg: 'el id y el nombre de la etapa es obligatorio'
            })
        }

        //actualizar la etapa en la base de datos
        const etapaActualizada = await Etapa.findByIdAndUpdate(id, data, { new: true })
        return res.json({
            msg: 'Etapa actualizada',
            etapa: etapaActualizada
        })
    } catch (e) {
        return res.status(500), json({
            msg: 'Error general' + e
        })
    }
}

const deleteEtapa = async (req = request, res = response) => {
    try {
        //obtener el id de la etapa
        const id = req.body.id

        if (!id) {
            return res.status(400).json({
                msg: 'El id es obligatorio'
            })
        }

        //eliminar la etapa de la base de datos
        if (!Etapa.findById(id)) {
            return res.status(404).json({
                msg: 'La etapa no existe'
            })

        }
        const etapa = await Etapa.findByIdAndDelete(id)
        return res.json({
            msg: `Etapa  ${etapa.nombre} eliminada`
        })

    } catch (e) {
        return res.status(500).json({
            msg: 'Error general' + e
        })
    }
}

module.exports = {
    getEtapas,
    crearEtapa,
    updateEtapaBYId,
    deleteEtapa
}