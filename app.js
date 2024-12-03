const express = require('express')
const app = express()
const cors = require('cors')

// middlewares
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cors({
    origin: '*'
}))

const cliente = require('./routes/cliente')
const etapa = require('./routes/etapa')
const proyecto = require('./routes/proyecto')
const tipoProyecto = require('./routes/tipoProyectos')
const universidad = require('./routes/universidad')

// routes
app.use('/api/clientes', cliente)
app.use('/api/etapas', etapa)
app.use('/api/proyectos', proyecto)
app.use('/api/tipoProyectos', tipoProyecto)
app.use('/api/universidad', universidad)

module.exports = app