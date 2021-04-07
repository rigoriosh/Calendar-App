const express = require('express');
const { dbConnection } = require('./db/dbConfig');
require('dotenv').config();

const port = process.env.PORT;

//Creando el servidor de express
const app = express(); 

// Bases de datos conection
dbConnection();

//Levantar el servidor
app.listen(port, () => {
    console.log(`Servidor corriendo en el puerto ${port}`);
})

// Directorio publico
app.use(express.static('build'))

//lectura y parseo del body
app.use(express.json());


// Rutas
app.use('/api/auth', require('./routes/auth'))

