require('dotenv').config();

const express = require('express');
const cors = require('cors')

const {dbConnection} = require('./database/cofig');

// crear el servidor expres
const app= express();

//configurar cors
app.use(cors());

//usario y contraseña mongo srendon CxVy1LVi7YFk8G1
//cadena de conexion: mongodb+srv://srendon:*****@cluster0-b9m4c.mongodb.net/hospitaldb?authSource=admin&replicaSet=Cluster0-shard-0&readPreference=primary&appname=MongoDB%20Compass&ssl=true

//base de datos
dbConnection();


//rutas
app.get('/',(req, res)=>{
    res.json({ok:true,
              msg:'estoy respondiendo'  })
});

app.listen(process.env.PORT, ()=>{
    console.log('servidor corriendo en el puerto 3000')
});

