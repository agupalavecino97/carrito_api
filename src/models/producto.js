const mongoose = require('mongoose');
const { Schema } = mongoose;

const productoSchema = new Schema({
    nombre:{ 
        type: String,
        required: true
    },
    descripcion:{
        type: String,
        required: true        
    },
    marca:{
        type: String,
        required: true    
    },
    capacidad:{
        type: String,
        required: true        
    },
    eliminado:{
        type: Boolean,
        default: 'false'    
    },
    precio:{
        type: Number, 
        required: true   
    },
});

module.exports = mongoose.model('Producto', productoSchema);