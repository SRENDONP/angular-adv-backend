const {response} = require('express')
const Medico = require('../models/medico')


//Metodo get de Medico
const getMedicos = async(req, res= response) => {

    const medicos = await Medico.find()
                                .populate('usuario','nombre')
                                .populate('hospital','nombre');

    res.json({
        ok:true,
        medicos
    })

}

//Metodo post de Medico
const crearMedico = async(req, res = response) => {
    
    const uid = req.uid; //=> con esto recupero el id del usuario que esta creando el hospital por que en el modelo yo le indique que se debe tener esa referencia
    //const hospital = '5f1f2d9bfb850e2d90906cdb' //aqui le estoy mandando el id quemado de un hospital, pero lo puedo enviar en el body en postman
    const medico  = new Medico({
        usuario:uid, //=>aqui envio el id del usuario, recordar que este esta en el token por eso lo puedo extraer
        //hospital,
        ...req.body //=> de esta forma desestructuro el body para obtener todos los campos y poder agregarle el usuario
    });

    try {

        const medicoDB = await  medico.save(); //en la variable hospitalDB guardo el mismo registro que se guardo en la base de datos
        
        res.json({
            ok:true,
            medico: medicoDB
        })
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok:false,
            msg:'Error inesperado'
        });
    }

}


//Metodo put de Medico
const actualizarMedico = (req, res) => {
    res.json({
        ok:true,
        msg:'editarMedico'
    })

}

//Metodo delete de Medico
const eliminarMedico = (req, res) => {
    res.json({
        ok:true,
        msg:'editarMedico'
    })

}




module.exports ={
    getMedicos,
    crearMedico,
    actualizarMedico,
    eliminarMedico
}