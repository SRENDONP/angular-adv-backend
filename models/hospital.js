const {Schema, model} = require('mongoose');

//de esta forma defino el esquema que va a tener la tabla en la base de datos, esto es por decir la definicion del modelo

const HospitalSchema = Schema({
    nombre:{
        type: String,
        required: true 
    },
    img:{
        type: String
    },
    usuario:{
        required:true,
        type: Schema.Types.ObjectId,
        ref:'Usuario'
    }
    
},{collection:'hospitales'});

HospitalSchema. method('toJSON', function(){
    const{__v, ...object} = this.toObject(); //=> con esto lo que hago es que no me retorne los campos que le indico en el const
    return object;
})

module.exports = model('Hospital', HospitalSchema);