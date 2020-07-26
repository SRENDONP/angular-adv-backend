const {response} = require('express')
const { validationResult } = require('express-validator')

const validarCampos = (req, res, next) =>{

    const errores = validationResult( req ); //=>con esta funcion estoy validando que no hallan errores en lo que declare en las rutas con los check
    if (!errores.isEmpty()){
        return res.status(400).json({
            ok:false,
            errors: errores.mapped()
        });
    }
    next();
}


module.exports={
    validarCampos
}