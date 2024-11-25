const {Shema, model} = require('mongoose');
const tipoProyecto = require('./tipoProyecto');
const etapa = require('./etapa');

const proyectoShema = Shema({
    numero:{
        type: String,
        requiered: [true, 'El numero es obligatorio']
    },
    titulo:{
        type: String,
        requiered: [true, 'El titulo es oblogatorio']
    },
    tipoProyecto:{
        type: Schema.Types.ObjectId,
        ref: 'tipoProyecto',
        requiered: [true, 'El tipo de proyecto es obligatorio']
    },
    cliente:{
        type: Schema.Types.ObjectId,
        ref: 'cliente',
        requiered: [true, 'El cliente es obligatorio']
    },
    universidad:{
        type: Schema.Types.ObjectId,
        ref: 'universidad',
        requiered: [true, 'La universidad es obligatoria']
    },
    etapa:{
        type: Schema.Types.ObjectId,
        ref: 'etapa',
        requiered: [true, 'La etapa es obligatoria']
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

model.exports = model('proyecto', proyectoShema);