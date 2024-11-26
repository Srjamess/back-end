const app = require('express')()
const express = require('express')
const { mongoConnection } = require('./database/configuration');
const dotenv = require('dotenv').config();

const connect = mongoConnection()
app.set('port', process.env.PORT || 3000)

app.listen(app.get('port'), () => {
    console.log(`Server on port, ${app.get('port')}`);
    console.log('Environment:', process.env.NODE_ENV);
});