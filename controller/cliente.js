const Cliente = require('../models/cliente');
const { request, response } = require('express');

const crearCliente = async (req = request, res = response) => {
    try {
        //obtener el nombre y email del cliente
        const nombre = req.body.nombre ? req.body.nombre.toUpperCase() : ''
        const email = req.body.email

        //verificar si ya existe un cliente con el mismo nombre
        const clienteDB = await cliente.findOne({ nombre })

        //si ya existe un cliente con el mismo nombre, retornar un error
        if (clienteDB) {
            return res.status(400).json({
                msg: `El cliente ${nombre} ya existe`
            })
        }

        //crear un nuevo cliente
        const cliente = {
            nombre,
            email
        }

        //guardar el cliente en la base de datos
        const clienteNuevo = new Cliente(cliente)
        await clienteNuevo.save()
        return res.status(201).json({
            msg: `El cliente ${nombre} fue creado`,
            cliente: clienteNuevo
        })
    } catch (e) {
        return res.status(500).json({
            msg: 'Error en el servidor' +
                e
        })
    }
}
module.exports = {crearCliente}