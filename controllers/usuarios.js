/*
    En este archivo defino la estructura del api, es decir todos los metodos que contiene, siempre debo exportar cada metodo
    para luego poder ser usado en el archivo de rutas
*/

//aqui defino en una variable el modelo que deben tener los body, importandolo del modelo
const Usuario = require('../models/usuario');

const {response} = require('express');
const { validationResult } = require('express-validator');
const bcrypt = require ('bcryptjs');
const { generarJWT } = require('../helpers/jwt');
//const { delete } = require('../routes/usuarios');


//Metodo GET de Usuarios 
const getUsuarios = async(req, res) => {

    const usuarios = await Usuario.find({}, 'nombre email role google' ); //=> aqui estoy buscando todos los elementos de la coleccion, con el {},'nombre ...' esto definiendo el filtro de los elementos que quiero que me retorne

    res.json(
        {
            ok:true,
            usuarios
    });
}


//Metodo POST de Usuarios 
const crearUsuario = async(req, res) => {

    const{email, password, nombre} = req.body; // => aqui le digo que el body trae estos campos

    

    try {

        const existeEmail =  await Usuario.findOne({email}) //=> aqui le pregunto que si el email quele envio en el body ya esta en la bd
        if (existeEmail){
            return res.status(400).json({
                ok: false,
                msg:"Ya existe un registro con el mismo correo"
            });
        }
        
        const usuario = new Usuario(req.body); //=> aqui creo una variable de tipo Usuario(modelo), y le asigno el valor del body
    
        const salt  = bcrypt.genSaltSync();//=> Procedimiento para encriptar la contraseña
        usuario.password = bcrypt.hashSync(password, salt);

        await usuario.save(); //=> aqui le digo que espere que resuelva la funcion save, para eso es el metodo await, pero para que el await funcione debe estar dentro de un async que se define en el crear usuario
    
        //Generar el token - JWT
        const token = await generarJWT(usuario.id);
        
        res.json(
            {
                ok:true,
                usuario,
                token
        });
        
    } catch (error) {
        console.log(error);
        res.status(500).json(
            {
            ok:false,
            msg:'Error inesperado'
        })
    }
    
}

//Metodo put o actualizar usuarios
const actualizarUsuario = async(req, res = response) => {

    const uid = req.params.id;

    try {

        const usuarioDB = await Usuario.findById(uid); //=> aqui estoy buscando el usuario por el uid que le llega en el body
        
        if (!usuarioDB){
            return res.status(404).json({
                ok:false,
                msg:'Usuario no encontrado'
            });
        }

        //Actualizaciones
         const {password, google, email,...campos} = req.body;

         if (usuarioDB.email !== email){ //=> esta validacion es para cuando no se modifica el email

             const existeEmail = await Usuario.findOne({email});
             if(existeEmail){
                 return res.status(400).json({
                     ok:false,
                     msg:'Ya existe usuario con el mismo email'
                 })
             }

         }

         campos.email = email;


         const usuarioActualizado = await Usuario.findByIdAndUpdate(uid, campos, {new:true});

        res.json({
            ok:true,
            msg:'Usuario modificado correctamente',
            usuario: usuarioActualizado
        })
        
    } catch ( error ) {
        console.log(error);
        res.status(500).json({
            ok:false,
            mgs:'Error Inesperado'
        })
    }
}

//metodo delete

const eliminarUsuario = async(req, res = response) => {

    const uid = req.params.id;

    try {
        const usuarioDB = await Usuario.findById(uid); //=> aqui estoy buscando el usuario por el uid que le llega en el body
        
        if (!usuarioDB){
            return res.status(404).json({
                ok:false,
                msg:'Usuario no encontrado'
            });
        }

        await Usuario.findByIdAndDelete(uid);

        res.json({
            ok:true,
            msg: 'Usuario Eliminado'
        })

        
    } catch (error) {
        
        console.log(error);
        res.status(500).json({
            ok:false,
            msg:'Error al borrar'
        });
    }
 
}




module.exports = {
    getUsuarios,
    crearUsuario,
    actualizarUsuario,
    eliminarUsuario

}