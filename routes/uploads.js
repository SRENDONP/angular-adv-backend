/*
ruta: api/uploads/:elemento de busqueda
 */

const { Router }  = require('express');
const { validarJWT } = require('../middlewares/validar-jwt');
const fileUpload = require('express-fileupload');

const { cargarArchivo, mostrarArchivo } = require('../controllers/uploads');

const router = Router();

router.use(fileUpload());


//ruta para traer todos los elementos
router.put('/:tipo/:id', validarJWT, cargarArchivo);

router.get('/:tipo/:foto', mostrarArchivo);




module.exports = router;
