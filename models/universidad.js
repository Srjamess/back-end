const {Schema, model} = require('mongoose');

const universidadShema = Shema({
    nombre:{
        type: String,
        required: [[true, 'El nombre es obligatorio']]
    },
    direccion:{
        type:String,
        requiered: [true, 'La direccion es obligatoria']
    },
     telefono:{
        type:String,
        requiered: [true, 'El telefonoo es obligatorio']
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

model.exports = model('universidad', universidadShema);