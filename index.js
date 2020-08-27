//Datos de Conexion
//usario y contraseña mongo srendon CxVy1LVi7YFk8G1
//cadena de conexion: mongodb+srv://srendon:*****@cluster0-b9m4c.mongodb.net/hospitaldb?authSource=admin&replicaSet=Cluster0-shard-0&readPreference=primary&appname=MongoDB%20Compass&ssl=true

require('dotenv').config();

const express = require('express');
const cors = require('cors')

const {dbConnection} = require('./database/cofig');

// crear el servidor expres
const app = express();

const path = require('path');

//configurar cors
app.use(cors());

//Lectura Y parseo del body
app.use(express.json());


//base de datos
dbConnection();

//Directorio Publico
app.use(express.static('public'));


//rutas
app.use( '/api/usuarios', require('./routes/usuarios') );
app.use( '/api/hospital', require('./routes/hospitales') );
app.use( '/api/medico', require('./routes/medicos') );

app.use( '/api/login', require('./routes/auth') );
app.use( '/api/todo', require('./routes/busquedas') );

app.use( '/api/upload', require('./routes/uploads') );

//lo ultimo
app.get('*', (req, res) => {
    res.sendFile(path.resolve( __dirname, 'public/index.html'));
}

app.listen(process.env.PORT, () => {
    console.log('servidor corriendo en el puerto 3000');
});

