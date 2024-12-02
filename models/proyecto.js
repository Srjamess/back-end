const { Schema, model } = require('mongoose');
const tipoProyecto = require('./tipoProyecto');
const etapa = require('./etapa');
const cliente = require('./cliente');

const proyectoSchema = Schema({
    numero: {
        type: String,
        required: [true, 'El numero es obligatorio']
    },
    titulo: {
        type: String,
        required: [true, 'El titulo es obligatorio']
    },
    fechaIniciacion: {
        type: Date,
        required: [true, 'La fecha de iniciacion es obligatoria']
    },
    tipoProyecto: {
        type: Schema.Types.ObjectId,
        ref: 'tipoProyecto',
        required: [true, 'El tipo de proyecto es obligatorio']
    },
    cliente: {
        type: Schema.Types.ObjectId,
        ref: 'cliente',
        required: [true, 'El cliente es obligatorio']
    },
    universidad: {
        type: Schema.Types.ObjectId,
        ref: 'universidad',
        required: [true, 'La universidad es obligatoria']
    },
    etapa: {
        type: Schema.Types.ObjectId,
        ref: 'etapa',
        required: [true, 'La etapa es obligatoria']
    },
    fechaCreacion:{
        type: Date,
        default: Date.now()
    },
    fechaActualizacion:{
        type: Date,
        default: Date.now()
    }
})
module.exports = model('proyecto', proyectoSchema);