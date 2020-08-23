const {response} = require('express')
const Medico = require('../models/medico')


//Metodo get de Medicos
const getMedicos = async(req, res= response) => {

    const medicos = await Medico.find()
                                .populate('usuario','nombre')
                                .populate('hospital','nombre');

    res.json({
        ok:true,
        medicos
    })

}

//Metodo get de Medico
const getMedicoById = async(req, res= response) => {

    const id  = req.params.id;
    
    
    try {
        const medico = await Medico.findById(id)
            .populate('usuario','nombre')
            .populate('hospital','nombre');
        
        res.json({
            ok:true,
            medico
        })
    }catch (error) {
        console.log(error);
        res.json({
            ok:false,
            msg:"Medico no encontrado"
        })
    }
    

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
const actualizarMedico = async(req, res) => {

    const id  = req.params.id;
    const uid = req.uid;

    try {

        const medico = await Medico.findById(id);

        if (!medico){
            return res.status(404).json({
                ok:false,
                msg:"Medico no encontrado"
            });
        }

        medico.nombre = req.body.nombre; //el primer elemento es el de la base de datos, el segundo es el que llega en el body, esto es una forma de hacerlo cuando hay pocos campos

        const cambiosMedico = {
            ...req.body,  //aqui obtengo todos los elementos que hay en la peticion o body
            usuario:uid  //aqui actualizo el campo usuario con el que esta logueado en el momento
        }

        const medicoActualizado = await Medico.findByIdAndUpdate(id, cambiosMedico,{new:true});


        res.json({
            ok:true,
            msg:'Medico Acutalizado',
            medico: medicoActualizado
            
        });
        
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok:false,
            msg:'Error inesperado'
        });
    }


}

//Metodo delete de Medico
const eliminarMedico = async(req, res) => {

    const id  = req.params.id;

    try {

        const medico = await Medico.findById(id);

        if (!medico){
            return res.status(404).json({
                ok:false,
                msg:"Medico no encontrado"
            });
        }

        await Medico.findByIdAndDelete(id);

        res.json({
            ok:true,
            msg:'Medico Eliminado',
            
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
    getMedicos,
    getMedicoById,
    crearMedico,
    actualizarMedico,
    eliminarMedico
}
