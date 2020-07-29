/*
ruta /api/hospital 
*/


const { Router }  = require('express');
const { check, validationResult } = require('express-validator');
const { validarCampos } = require ('../middlewares/validar-campos');


const { getHospitales, crearHospital, actualizarHospital, eliminarHospital  } = require('../controllers/hospitales');
const { validarJWT } = require('../middlewares/validar-jwt');
const router = Router();

//ruta para traer todos los usuarios
router.get('/', getHospitales);

//ruta para crear un nuevo usuario
router.post('/',[
    validarJWT,
    check('nombre', 'El nombre del Hospital es Obligatorio').not().isEmpty(),
    validarCampos
    ]
    ,crearHospital);

//ruta para editar un usuario
router.put('/:id',[
    
    validarCampos,
    validarJWT,
    check('nombre', 'El nombre del Hospital es Obligatorio').not().isEmpty(),
    ], actualizarHospital);


//Ruta para elminiar un usuario
router.delete('/:id',validarJWT,eliminarHospital);



module.exports = router;