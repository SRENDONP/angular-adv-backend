const jwt = require("jsonwebtoken");
const Usuario = require("../models/usuario");


const validarJWT = (req,res,next) => {

    //leer token
    const token = req.header('x-token');

    //valido que si este llegando un token en los header del body
    if (!token){
        return res.status(401).json({
            ok:false,
            msg:'No hay token en la validación'
        });
    }

    try {
        const {uid} = jwt.verify(token, process.env.JWT_SECRET)
        req.uid = uid;
        next();
        
    } catch (error) {
        return res.status(401).json({
            ok:false,
            msg:'No hay token en la validación'
        });
    }

    //

}

const validarADMIN_ROLE = async(req, res, next) => {

    const uid = req.uid;
    try {
        const usuarioDB = await Usuario.findById(uid);
        if (!usuarioDB){
            return res.status(400).json({
                ok: false,
                msg:'Usuario no existe'
            });
        }

        if (usuarioDB.role !== 'ADMIN_TOLE'){
            return res.status(403).json({
                ok: false,
                msg: 'No tiene permisos para realizar la solicitud'
            });
        }
        next();
    }catch (e) {
        res.status(500).json({
            ok:false,
            msg:'Comuniquese con el administrador'
        });
    }

}

const validarADMIN_ROLE_o_MismoUsuario = async(req, res, next) => {

    const uid = req.uid;
    const id  = req.params.id;
    try {
        const usuarioDB = await Usuario.findById(uid);
        if (!usuarioDB){
            return res.status(400).json({
                ok: false,
                msg:'Usuario no existe'
            });
        }

        if (usuarioDB.role === 'ADMIN_TOLE' || uid === id){
            next();
        }else{
            return res.status(403).json({
                ok: false,
                msg: 'No tiene permisos para realizar la solicitud'
            });
        }

    }catch (e) {
        res.status(500).json({
            ok:false,
            msg:'Comuniquese con el administrador'
        });
    }

}

module.exports={
    validarJWT,
    validarADMIN_ROLE,
    validarADMIN_ROLE_o_MismoUsuario
}
