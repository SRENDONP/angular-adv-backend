/*
ruta /api/hospital 
*/


const { Router }  = require('express');
const { check } = require('express-validator');
const { validarCampos } = require ('../middlewares/validar-campos');


const { getMedicos, crearMedico, actualizarMedico, eliminarMedico  } = require('../controllers/medicos');
const { validarJWT } = require('../middlewares/validar-jwt');
const router = Router();

//ruta para traer todos los medicos
router.get('/', getMedicos);

//ruta para crear un nuevo medico
router.post('/',[
    validarJWT,
    check('nombre', 'El nombre del medico es obligatorio').not().isEmpty(),
    check('hospital', 'Id de hospital incorrecto').isMongoId(),
    validarCampos
    ]
    ,crearMedico);

//ruta para editar un medico
router.put('/:id',[
    
    validarCampos
    ], actualizarMedico);


//Ruta para elminiar un usuario
router.delete('/:id',eliminarMedico);



module.exports = router;