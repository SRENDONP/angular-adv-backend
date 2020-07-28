const path = require('path');
const fs = require('fs');


const { response } = require('express');
const { validationResult } = require('express-validator');

const { v4: uuidv4 } = require('uuid');

const Usuario = require('../models/usuario');
const Medico = require('../models/medico');
const Hospital = require('../models/hospital');
const {actualizarImagen} = require('../helpers/actualizar-imagen');


const cargarArchivo = (req, res= response) => {

    const tipo = req.params.tipo;
    const id = req.params.id;

    //Validacion de tipos
    const tiposValidos = ['hospitales','medicos','usuarios'];

    if (!tiposValidos.includes(tipo)) { //si el tipo que le llega en el body es diferente a los elementos de tipos validos
        return res.json({
            ok:false,
            msg:'El tipo seleccionado no es valido (tipo)'
        });
    }

    //Valida que si hallan seleccionado una imagen
    if (!req.files || Object.keys(req.files).length === 0) {
        return res.status(400).json({
            ok:false,
            msg:'No ha seleccionado ningun archivo'
        })
      }

    //Procesar la imagen
      const file = req.files.imagen;

      const nombreCortado = file.name.split('.'); //imagen1.jpg

      const extensionArchivo = nombreCortado[nombreCortado.length -1];

    //Validar extension

      const extensionesValidas = ['png', 'jpg','jpeg', 'gif', 'PNG'];

      if (!extensionesValidas.includes(extensionArchivo)) {
        return res.status(400).json({
            ok:false,
            msg:'La extension del archivo no es valida'
        });
      }

    //generar el nombre del archivo

    const nombreArchivo=`${uuidv4()}.${extensionArchivo}`;

    //path para guardar la imagen
    const path = `./uploads/${tipo}/${nombreArchivo}`;


    //Use el método mv() para colocar el archivo en algún lugar de su servidor
    file.mv(path, (err) => {
        if (err){
            return res.status(500).json({
                ok:false,
                msg:'Error al mover la imagen'
            });

        }

        //Actualizar la base de datos
        actualizarImagen(tipo, id, nombreArchivo);

        res.json({
            ok:true,
            resultados: 'Imagen Cargada Exitosamente',
            nombreArchivo
        })
    });
}

const mostrarArchivo =(req, res = response) =>{
    const tipo = req.params.tipo;
    const foto = req.params.foto;

    const pathImg = path.join(__dirname,`../uploads/${tipo}/${foto}`);
    
    //imagen por defecto
    
    if (fs.existsSync(pathImg)){
        res.sendFile(pathImg);
    }else{
        const pathImg = path.join(__dirname,`../uploads/no-img.jpg`);
        res.sendFile(pathImg);
        
    }

}



module.exports = {
    cargarArchivo,
    mostrarArchivo

}
