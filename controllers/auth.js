const {response} = require('express');
const bcrypt = require ('bcryptjs');

const Usuario = require('../models/usuario'); //esto me importa el modelo de usuario
const { generarJWT } = require('../helpers/jwt');
const { googleVerify } = require('../helpers/google-verify');

const login = async(req, res = response)=> {

    const {email, password} = req.body;

    try {

        const usuarioDB = await Usuario.findOne({email}); //=> aqui estoy buscando el la bd que exista el correo ingresado

        //Verificacion de email
        if (!usuarioDB){
            return res.status(404).json({
                ok:false,
                msg:'Correo no valido'
            });
        }

        //Verificacion de Email
        const validPassword = bcrypt.compareSync(password, usuarioDB.password); //=>recordar que la contraseña esta encriptada  por ello se utilizar el bcrypt y el comparesync que recibe dos argumentos la contraseña que esta en al bd y la que le llega en el body
        if (!validPassword){
            return res.status(400).json({
                ok:false,
                msg:'Error de Contraseña'
            });
        }

        //Generar el token - JWT
        const token = await generarJWT(usuarioDB.id);



        res.json({
            ok:true,
            token
        })
        
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok:false,
            msg:'Error Inesperado'
        });
    }
}


const googleSignIn = async(req, res = response) => {

    const googleToken = req.body.token;

    try {

        const { name, email, picture } = await googleVerify( googleToken ); // solo estos 3 datos me interesan de la verifcacion de google

        const usuarioDB = await Usuario.findOne({ email });// aqui voy a buscar en la coleccion usuarios si ya el correo ya existe
        let usuario;

        if (!usuarioDB){ // si usuario no existe voy a crear uno nuevo
            usuario = new Usuario({
                nombre: name,
                email,
                password:'@@@',
                img: picture,
                google:true 
            });
        }else{
            // pero si existe 
            usuario = usuarioDB;
            usuario.google= true;
        }

        //guardo el usuario en la db

        await usuario.save();

        console.log('usuario guardado'+ usuario);

        //Generar el token - JWT
        const token = await generarJWT(usuario.id);

        res.json({
            ok:true,
            token
        });
        
    } catch (error) {
        res.status(401).json({
            ok:false,
            msg:'Error de validacion de token',
        });
        
    }
    
}


const renewToken = async(req , res = response) => {

    const uid = req.uid;

    //Generar el token - JWT
    const token = await generarJWT(uid);

    res.json({
        ok:true,
        uid,
        token

    });
}


module.exports = {
    login,
    googleSignIn,
    renewToken
}