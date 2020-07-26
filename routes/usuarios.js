/*
    En este archivo defino las rutas que deben tener el api, estas se importan de lo que hay en el archivo 
    controllers/usuarios, y siempre se debe exportar al final para que pueda ser usado en el archivo de index
*/


//Ruta : /api/usuarios


const { Router }  = require('express');
const { check } = require('express-validator');
const { validarCampos } = require ('../middlewares/validar-campos');


const { getUsuarios, crearUsuario, actualizarUsuario, eliminarUsuario } = require('../controllers/usuarios');
const { validarJWT } = require('../middlewares/validar-jwt');
const router = Router();

//ruta para traer todos los usuarios
router.get('/', validarJWT, getUsuarios);

//ruta para crear un nuevo usuario
router.post('/',[
    check('nombre','El nombre debe ser obligatorio').not().isEmpty(),
    check('password','El password debe ser obligatorio').not().isEmpty(),
    check('email','El email debe ser obligatorio').isEmail(),
    validarCampos
    ]
    ,crearUsuario);

//ruta para editar un usuario
router.put('/:id',[
    validarJWT,
    check('nombre','El nombre debe ser obligatorio').not().isEmpty(),
    check('email','El email debe ser obligatorio').isEmail(),
    validarCampos
    ], actualizarUsuario);


//Ruta para elminiar un usuario
router.delete('/:id', validarJWT, eliminarUsuario);



module.exports = router;