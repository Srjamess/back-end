const Proyecto = require("../models/proyecto");
const { request, response, json } = require("express");
const TipoProyecto = require("../models/tipoProyecto");
const Cliente = require("../models/cliente");
const Etapa = require("../models/etapa");
const Universidad = require("../models/universidad");

//listar proyectos
const getProyectos = async (req = request, res = response) => {
  try {
    const proyectosDB = await Proyecto.find()
      .populate("tipoProyecto")
      .populate("cliente")
      .populate("etapa")
      .populate("universidad");

    return res.json(proyectosDB);
  } catch (e) {
    return res.status(500).json({
      msg: "error general" + e,
    });
  }
};

const createProyecto = async (req = request, res = response) => {
  try {
    const data = req.body;
    console.log(data);
    const { tipoProyecto, cliente, universidad, etapa, titulo } = data;

    // Función genérica para validar existencia en base al modelo y al ID
    const validarExistencia = async (Modelo, id, nombre) => {
      const documento = await Modelo.findById(id);
      if (!documento) {
        throw new Error(`${nombre} con ID ${id} no existe`);
      }
      return documento;
    };

    try {
      // Validar todas las entidades en paralelo
      await Promise.all([
        validarExistencia(TipoProyecto, tipoProyecto._id, "Tipo de proyecto"),
        validarExistencia(Cliente, cliente._id, "Cliente"),
        validarExistencia(Universidad, universidad._id, "Universidad"),
        validarExistencia(Etapa, etapa._id, "Etapa"),
      ]);
    } catch (err) {
      // Capturar error de validación y responder
      return res.status(400).json({ msg: err.message });
    }

    // Validar si el proyecto ya existe por  el título
    const proyectoExistente = await Proyecto.findOne({ titulo });

    if (proyectoExistente) {
      return res.status(400).json({
        msg: "El proyecto ya existe con el mismo número o título",
      });
    }

    // Crear y guardar nuevo proyecto
    const proyectoNuevo = new Proyecto(data);
    console.log(proyectoNuevo);

    await proyectoNuevo.save();

    return res.status(201).json({
      msg: "Proyecto creado",
      proyecto: proyectoNuevo,
    });
  } catch (e) {
    console.error(e);
    return res.status(500).json({
      msg: "Error general",
      error: e.message,
    });
  }
};

const updateProyectoById = async (req = request, res = response) => {
  try {
    //obtener el id del proyecto
    const id = req.body.id;

    //obtener los doatos del proyecto
    const data = req.body.nombre ? req.body.numero.toUperCase() : "";
    data.titulo = req.body.titulo;
    data.fechaIniciacion = req.body.fechaIniciacion;
    data.fechaFinalizacion = req.body.fechaFinalizacion;
    data.tipoProyecto = req.body.tipoProyecto;
    data.cliente = req.body.cliente;
    data.universidad = req.body.universidad;
    data.etapa = req.body.etapa;
    data.fechaActualizacion = Date.now();

    //validar que el id del proyecto esté presente
    if (!id) {
      return res.status(400).json({
        msg: `El id y el nombre del proyecto son obligatorios`,
      });
    }

    const Proyecto = await Proyecto.findByIdAndUpdate(id.data, {
      new: true,
    });
    return res.json({
      msg: `Proyecto ${tittulo} actualizado con exito`,
      proyecto: Proyecto,
    });
  } catch (e) {
    return res.status(500).json({
      msg: `Error general` + e,
    });
  }
};

module.exports = {
  getProyectos,
  createProyecto,
  updateProyectoById
};
