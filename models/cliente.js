const { Schema, model } = require("mongoose");

const clienteSchema = Schema({
  nombre: {
    type: String,
    required: [true, "El nombre es Obligatorio"],
  },
  email: {
    type: String,
    required: [true, "El email es Obligatorio"],
    unique: [true, "El email ya existe"],
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

module.exports = model("cliente", clienteSchema);
