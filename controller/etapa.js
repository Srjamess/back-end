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
        const anteProyecto = req.body.anteProyecto
            ? req.body.anteProyecto.toUpperCase() : '';
        const entregaParcial1 = req.body.entregaParcial1
            ? req.body.entregaParcial1.toUpperCase() : '';
        const entregraparcial2 = req.body.entregraparcial2
            ? req.body.entregraparcial2.toUpperCase() : '';
        const entregaFinal = req.body.entregaFinal
            ? req.body.entregaFinal.toUpperCase() : '';


        //verificar si la etapa ya existe
        const etapaDB = await Etapa.findOne({
            nombre,
            anteProyecto,
            entregaParcial1,
            entregraparcial2,
            entregaFinal
        });

        //si la etapa ya existe
        if (etapaDB) {
            return res.status(400).json({
                msg: `La etapa "${etapaDB.nombre}" ya existe`
            })
        }

        //crear la etapa
        const etapa = new Etapa({
            nombre,
            anteProyecto,
            entregaParcial1,
            entregraparcial2,
            entregaFinal
        })

        //guardar la etapa
        const newEtapa = new Etapa(etapa)
        console.log(newEtapa);

        await newEtapa.save();
        return res.json(201).json(newEtapa);
    }catch (e) {
        return res.status(500).json({
            msg: 'Error general' + e
        })
    }
}

module.exports = { getEtapas, crearEtapa }