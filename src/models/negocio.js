const mongoose = require('mongoose');
const { Schema } = mongoose;

const negocioSchema = new Schema({
    nombre:{
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
    CUIT:{
        type: Number,
        required:true,
        unique: true
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

module.exports = mongoose.model('Negocio', negocioSchema);