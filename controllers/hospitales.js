const {response} = require('express')

const Hospital = require('../models/hospital')


//Metodo get de hospitales
const getHospitales = async(req, res = response) => {

    const hospitales = await Hospital.find().populate('usuario','nombre'); //=> la insturccion find() me busca todos los 
                                                                            //hospitales, la instruccion populate le digo que de usuario que tambien me traiga el nombre de quien creo el hospital

    res.json({
        ok:true,
        hospitales
    })

}

//Metodo post de hospitales
const crearHospital = async(req, res=response) => {

    const uid = req.uid; //=> con esto recupero el id del usuario que esta creando el hospital por que en el modelo yo le indique que se debe tener esa referencia
    const hospital  = new Hospital({
        usuario:uid, //=>aqui envio el id del usuario, recordar que este esta en el token por eso lo puedo extraer
        ...req.body //=> de esta forma desestructuro el body para obtener todos los campos y poder agregarle el usuario
    });

    try {

        const hospitalDB = await  hospital.save(); //en la variable hospitalDB guardo el mismo registro que se guardo en la base de datos
        
        res.json({
            ok:true,
            hospital: hospitalDB
        })
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok:false,
            msg:'Error inesperado'
        });
    }


}


//Metodo put de hospitales
const actualizarHospital = async(req, res) => {

    const id  = req.params.id;
    const uid = req.uid;

    try {

        const hospital = await Hospital.findById(id);

        if (!hospital){
            return res.status(404).json({
                ok:false,
                msg:"Hospital no encontrado"
            });
        }

        hospital.nombre = req.body.nombre; //el primer elemento es el de la base de datos, el segundo es el que llega en el body, esto es una forma de hacerlo cuando hay pocos campos

        const cambiosHospital = {
            ...req.body,  //aqui obtengo todos los elementos que hay en la peticion o body
            usuario:uid
        }

        const hospitalActualizado = await Hospital.findByIdAndUpdate(id, cambiosHospital,{new:true});


        res.json({
            ok:true,
            msg:'Hospital Acutalizado',
            hospital: hospitalActualizado
            
        });
        
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok:false,
            msg:'Error inesperado'
        });
    }


}

//Metodo delete de hospitales
const eliminarHospital = async(req, res) => {

    const id  = req.params.id;

    try {

        const hospital = await Hospital.findById(id);

        if (!hospital){
            return res.status(404).json({
                ok:false,
                msg:"Hospital no encontrado"
            });
        }

        await Hospital.findByIdAndDelete(id);

        res.json({
            ok:true,
            msg:'Hospital Eliminado',
            
        });
        
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok:false,
            msg:'Error inesperado'
        });
    }


}




module.exports ={
    getHospitales,
    crearHospital,
    actualizarHospital,
    eliminarHospital
}