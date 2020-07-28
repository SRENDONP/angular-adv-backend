const {response} = require('express');
const { validationResult } = require('express-validator');

const Usuario = require('../models/usuario');
const Medico = require('../models/medico');
const Hospital = require('../models/hospital');

// metodo get que me permite hacer busquedas por algun tipo de cadena de texto tanto en medicos, usuarios y hospitales
const getTodo = async(req, res) => {

    const busqueda = req.params.busqueda //en busqueda asigno el elemento que viene en el body como parametro que llamamos en la ruta busqueda
    
    const regex = new RegExp (busqueda, 'i');//=> esta expresion regular es para buscar de manera mas flexible resultados osea que no sea coincidencia exacta

    const [usuarios, medicos, hospitales] = await Promise.all([//=> hago uso de la desestructuracion
        Usuario.find({ nombre:regex }), //=> aqui busco en usuarios todo lo que tenga el parametro de busqueda
        Medico.find({ nombre:regex }), //=> aqui busco en medico todo lo que tenga el parametro de busqueda
        Hospital.find({ nombre:regex }) //=> aqui busco en hospital todo lo que tenga el parametro de busqueda 
    ]);

    res.json(
        {
            ok:true,
            usuarios,
            medicos,
            hospitales
    });
}


//
const getDocumentosColeccion = async(req, res) => {

    const tabla = req.params.tabla //en busqueda asigno el elemento que viene en el body como parametro que llamamos en la ruta como primer argumento tabla
    const busqueda = req.params.busqueda //en busqueda asigno el elemento que viene en el body como parametro que llamamos en la ruta busqueda
    
    const regex = new RegExp (busqueda, 'i');//=> esta expresion regular es para buscar de manera mas flexible resultados osea que no sea coincidencia exacta

    let data = [];
    
    switch (tabla) {
        case 'medicos':
            data = await Medico.find({ nombre:regex })//=> aqui busco en medico todo lo que tenga el parametro de busqueda
                                    .populate('usuario', 'nombre img')//aqui le indico los campos que me debe retornar de la referencia que hace a usuario
                                    .populate('hospital', 'nombre img'); //aqui me retorna los campos que le indico de la referencia a hospital
        break;
        
        case 'hospitales':
            data = await Hospital.find({ nombre:regex }) //=> aqui busco en hospital todo lo que tenga el parametro de busqueda    
                                    .populate('usuario', 'nombre img');
        break;
        
        case 'usuarios':
            data = await Usuario.find({ nombre:regex }); //=> aqui busco en usuarios todo lo que tenga el parametro de busqueda
        break;
        
        default:
            return res.status(400).json({
                ok:false,
                msg:'Tabla no encontrada'
            });
    }
            
    res.json({
        ok:true,
        resultados: data
    })
}          
                    


module.exports = {
    getTodo,
    getDocumentosColeccion

}