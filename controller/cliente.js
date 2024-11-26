const Cliente = require('../models/cliente');
const { request, response } = require('express');

const getClientes = async (req = request,
    res = response) => {
    try {
        const clientesDB = await Cliente.find()//select * from tipoEquipo where estado=?
        return res.json(clientesDB)
    } catch (e) {
        return res.status(500).json({
            msg: 'Error general ' + e
        })
    }
}

const crearCliente = async (req = request, res = response) => {
    try {
        //obtener el nombre y email del cliente
        const nombre = req.body.nombre ? req.body.nombre.toUpperCase() : ''
        const email = req.body.email

         // Validar que el nombre y el email estén presentes
         if (!nombre || !email) {
            return res.status(400).json({
                msg: 'El nombre y el email son obligatorios',
            });
        }

        //verificar si ya existe un cliente con el mismo nombre
        const clienteDB = await Cliente.findOne({ nombre })

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
        console.log(e)
        return res.status(500).json({
            msg: 'Error en el servidor' + 
                e
        })
    }
}




module.exports = {
    crearCliente,
    getClientes
}