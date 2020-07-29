/*
    En este archivo defino las rutas que deben tener el api, estas se importan de lo que hay en el archivo 
    controllers/usuarios, y siempre se debe exportar al final para que pueda ser usado en el archivo de index, este 
    contiene las rutas del login
*/
//Ruta : /api/usuarios


const { Router }  = require('express');
const { login, googleSignIn, renewToken } = require('../controllers/auth'); //=>aqui importo los controllers
const { check } = require('express-validator'); // => aqui importo los check para validar los campos
const { validarCampos } = require('../middlewares/validar-campos');
const { validarJWT } = require('../middlewares/validar-jwt');

const router = Router();

//metodo post del login
router.post('/',[
    check('email', 'El email es obligatorio').isEmail(),
    check('password', 'El password es obligatorio').not().isEmpty(),
    validarCampos
],login );

router.post('/google',[
    validarCampos
],renewToken
);


router.get('/renew',
    
    validarJWT, renewToken );



module.exports = router;