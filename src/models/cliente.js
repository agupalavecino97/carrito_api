const mongoose = require('mongoose');
const { Schema } = mongoose;

const clienteSchema = new Schema({
    nombre:{
        type: String,
        required: true    
    },
    apellido:{
        type: String,
        required: true        
    },
    direccion:{
        type: String,
        required: true
    },
    telefono:{
        type: Number,
        required: true
    },
    email:{ 
        type: String,
        unique: true,
        required: true
    },
    password:{
        type: String,
        required: true        
    },
    eliminado:{
        type: Boolean,
        default: 'false'    
    },
});

module.exports = mongoose.model('Cliente', clienteSchema);