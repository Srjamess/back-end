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

// routes
app.use('/api/clientes', cliente)
app.use('/api/etapas', etapa)

module.exports = app