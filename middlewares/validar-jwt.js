const jwt = require("jsonwebtoken");

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

module.exports={
    validarJWT
}