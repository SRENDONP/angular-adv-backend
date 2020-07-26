const {response} = require('express');
const bcrypt = require ('bcryptjs');

const Usuario = require('../models/usuario'); //esto me importa el modelo de usuario
const { generarJWT } = require('../helpers/jwt');

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


module.exports = {
    login
}