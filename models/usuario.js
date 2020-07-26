const {Schema, model} = require('mongoose');

//de esta forma defino el esquema que va a tener la tabla en la base de datos, esto es por decir la definicion del modelo

const UsuarioSchema = Schema({
    nombre:{
        type: String,
        required: true 
    },
    email:{
        type: String,
        required: true,
        unique:true
    },
    password:{
        type: String,
        required: true
    },
    img:{
        type: String
    },
    role:{
        type: String,
        required: true,
        default:'USER_ROLE'
    },
    google:{
        type: Boolean,
        default:false
    },
});

UsuarioSchema. method('toJSON', function(){
    const{__v,_id, password, ...object} = this.toObject(); //=> con esto lo que hago es que no me retorne los campos que le indico en el const
    object.uid = _id;// aqui lo que esto haciendo es que en vez de mostrarme _id me lo convierta a uid
    return object;
})

module.exports = model('Usuario', UsuarioSchema);