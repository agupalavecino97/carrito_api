const express = require('express');
const morgan = require('morgan'); // para que me meuestre lo que hace el server
var bodyParser = require('body-parser');//para convertir lo que llega a traves de las peticiones en un objeto json

const app = express();
// const { mongoose } = require('./db');
app.set('port', process.env.PORT || 3000); // designar un puerto 

app.use(morgan('dev')); // una opcion de morgan 
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());  // convierte lo que trae la peticion a un objeto json


//configurar cabeceras y CORS
app.use((req, res, next)=>{
    res.header('Access-Control-Allow-Origin', 'http://localhost:4200');
    res.header('Access-Control-Allow-Headers', 'X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Allow-Request-Method, Authorization');
    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
    res.header('Allow', 'GET, POST, OPTIONS, PUT, DELETE');
    res.header('content-type: application/json; charset=utf-8');
    next();
  });

// middlewares

// routes
app.use('/api',require('./routes/router'));

app.listen(app.get('port'),()=>{
    console.log('Server is running on port',app.get('port'));
})
