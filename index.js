//Datos de Conexion
//usario y contraseña mongo srendon CxVy1LVi7YFk8G1
//cadena de conexion: mongodb+srv://srendon:*****@cluster0-b9m4c.mongodb.net/hospitaldb?authSource=admin&replicaSet=Cluster0-shard-0&readPreference=primary&appname=MongoDB%20Compass&ssl=true

require('dotenv').config();

const express = require('express');
const cors = require('cors')

const {dbConnection} = require('./database/cofig');

// crear el servidor expres
const app = express();

//configurar cors
app.use(cors());

//Lectura Y parseo del body
app.use(express.json());


//base de datos
dbConnection();


//rutas
app.use( '/api/usuarios', require('./routes/usuarios') );
app.use( '/api/login', require('./routes/auth') );


app.listen(process.env.PORT, () => {
    console.log('servidor corriendo en el puerto 3000');
});

