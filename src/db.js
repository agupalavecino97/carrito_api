const mongoose = require("mongoose");

mongoose.connect("FALTA CONEXION!!!!", {
    useUnifiedTopology: true,
    useNewUrlParser:true
})
    .then((db) => console.log("Base de Datos conectada!!"))
    .catch((error) => console.error(error));