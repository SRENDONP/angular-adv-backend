const fs = require('fs') //este es el filesystem

//debo importar los 3 modelo para poder trabajar con la ruta de las imagenes
const Usuario = require('../models/usuario');
const Medico = require('../models/medico');
const Hospital = require('../models/hospital');


const borrarImagen = (path) =>{ 

        if (fs.existsSync(path)){
            //borrar la imagen antigua
            fs.unlinkSync(path);
        }
    }

const actualizarImagen = async(tipo, id, nombreArchivo) => {

    let pathViejo = '';

    switch (tipo) { // aqui estoy validando que el tipo sea medico
        case 'medicos':
            const medico= await Medico.findById(id); //estoybuscando por el id del medico que me llego en los parametros 
            if (!medico) { //si no es medico me retorna un false
                return false;
            }

            pathViejo =`./uploads/medicos/${medico.img}`; //qui estoy preguntando si ya tenia imangen
            borrarImagen(pathViejo);

            medico.img = nombreArchivo; //aqui le digo que al medico le ponga el nombre de archivo en el atributo img definido en el modelo
            await medico.save(); //aqui guardo los cambios solo en la imagen

            return true;

            break;
        case 'hospitales':

            const hospital = await Hospital.findById(id); //estoybuscando por el id del hospital que me llego en los parametros 
            if (!hospital) { //si no es hospital me retorna un false
                return false;
            }

            pathViejo=`./uploads/hospitales/${hospital.img}`; //qui estoy preguntando si ya tenia imangen
            borrarImagen(pathViejo);

            hospital.img = nombreArchivo; //aqui le digo que al hospital le ponga el nombre de archivo en el atributo img definido en el modelo
            await hospital.save(); //aqui guardo los cambios solo en la imagen

            return true;
            
            break;
        case 'usuarios':

            const usuario = await Usuario.findById(id); //estoybuscando por el id del usuario que me llego en los parametros 
            if (!usuario) { //si no es usuario me retorna un false
                return false;
            }

            pathViejo=`./uploads/usuarios/${usuario.img}`; //qui estoy preguntando si ya tenia imangen
            borrarImagen(pathViejo);

            usuario.img = nombreArchivo; //aqui le digo que al usuario le ponga el nombre de archivo en el atributo img definido en el modelo
            await usuario.save(); //aqui guardo los cambios solo en la imagen

            return true;
            
            break;
    
        default:
            break;
    }


}


module.exports={
    actualizarImagen
}