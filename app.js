const express = require('express')
const app = express()
const cors = require('cors')

// middlewares
app.use(express.json())
app.use(express.urlencoded({extended: false}))
app.use(cors({
    origin: '*'
}))

const cliente = require('./routes/cliente')

// routes
app.use('/api/clientes', cliente)

module.exports = app