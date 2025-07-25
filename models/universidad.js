const { Schema, model } = require("mongoose");

const universidadSchema = Schema({
  nombre: {
    type: String,
    required: [[true, "El nombre es obligatorio"]],
  },
  direccion: {
    type: String,
    requiered: [true, "La direccion es obligatoria"],
  },
  telefono: {
    type: String,
    requiered: [true, "El telefonoo es obligatorio"],
  },
  fechaCreacion: {
    type: Date,
    default: Date.now(),
  },
  fechaActualizacion: {
    type: Date,
    default: Date.now(),
  },
});

module.exports = model("universidad", universidadSchema);
