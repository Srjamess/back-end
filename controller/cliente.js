const Cliente = require("../models/cliente");
const { request, response, json } = require("express");

const getClientes = async (req = request, res = response) => {
  try {
    const clientesDB = await Cliente.find(); //select * from tipoEquipo where estado=?
    return res.json(clientesDB);
  } catch (e) {
    return res.status(500).json({
      msg: "Error general " + e,
    });
  }
};

const crearCliente = async (req = request, res = response) => {
  try {
    //obtener el nombre y email del cliente
    const nombre = req.body.nombre ? req.body.nombre.toUpperCase() : "";
    const email = req.body.email;

    // Validar que el nombre y el email estén presentes
    if (!nombre || !email) {
      return res.status(400).json({
        msg: "El nombre y el email son obligatorios",
      });
    }

    //verificar si ya existe un cliente con el mismo nombre
    const clienteDB = await Cliente.findOne({ nombre });

    //si ya existe un cliente con el mismo nombre, retornar un error
    if (clienteDB) {
      return res.status(400).json({
        msg: `El cliente ${nombre} ya existe`,
      });
    }

    //crear un nuevo cliente
    const cliente = {
      nombre,
      email,
    };

    //guardar el cliente en la base de datos
    const clienteNuevo = new Cliente(cliente);
    console.log(clienteNuevo);

    await clienteNuevo.save();

    return res.status(201).json({
      msg: `El cliente ${nombre} fue creado`,
      cliente: clienteNuevo,
    });
  } catch (e) {
    console.log(e);
    return res.status(500).json({
      msg: "Error en el servidor" + e,
    });
  }
};

const updateClienteById = async (req = request, res = response) => {
  try {
    //obtener el id del cliente
    const id = req.body.id;
    //obtener el nombre y email del cliente
    const data = req.body;
    data.nombre = data.nombre ? data.nombre.toUpperCase() : "";
    data.fechaActualizacion = Date.now();
    // Validar que el nombre y el email estén presentes
    if (!id) {
      return res.status(400).json({
        msg: "el id es obligatorio",
      });
    }

    const cliente = await Cliente.findByIdAndUpdate(id, data, { new: true }); //new:true devuelve el registro actualizado
    return res.json({
      msg: "Cliente actualizado",
      cliente,
    });
  } catch (e) {
    console.log(e);
    return res.status(500).json({
      msg: "Error en el servidor" + e,
    });
  }
};

const deleteCliente = async (req = request, res = response) => {
  try {
    const id = req.body.id;

    if (!id) {
      return res.status(400).json({
        msg: "El id es obligatorio",
      });
    }

    if (!Cliente.findById(id)) {
      return res.status(404).json({
        msg: "Cliente no encontrado",
      });
    }

    const cliente = await Cliente.findByIdAndDelete(id);
    return res.json({
      msg: `Cliente ${cliente.nombre} eliminado`,
    });
  } catch (e) {
    console.log(e);
    return res.status(500).json({
      msg: "Error en el servidor" + e,
    });
  }
};

module.exports = {
  crearCliente,
  getClientes,
  updateClienteById,
  deleteCliente,
};
