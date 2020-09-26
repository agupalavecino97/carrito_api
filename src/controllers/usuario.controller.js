const Usuario = require('../models/usuario');
const usuarioController = {};

//devolver todos los usuarios
usuarioController.getUsuarios = async (req, res) =>{
    const usuarios = await Usuario.find({eliminado: false});
    if (usuarios.length > 0){
        res.status(200).send(usuarios)
    }else{
        res.status(500).send({message:"Error al buscar los datos."});
    }
};

//devolver un solo usuario
usuarioController.getUsuario = async (req, res) =>{
  const usuarios = await Usuario.find({eliminado: false, _id: req.params.id});
    if (usuarios.length > 0){
        res.status(200).send(usuarios)
    }else{
        res.status(500).send({message:"Error al buscar los datos."});
    }
};

usuarioController.editUsuario = async (req, res) =>{
    await Usuario.findByIdAndUpdate(req.params.id,
        {nombre: req.body.nombre,
        precio: req.body.precio,
        cantidad_stock: req.body.cantidad,
        id_categoria: req.body.id_categoria,
        stock_minimo: req.body.stock_minimo})
        .then(
            (err)=>{
                if (err) {
                    res.status(500).send({message: 'Error al  guardar los datos'})
                }else{
                    res.status(200).send({message: 'usuario modificado correctamente'})
                } 
            });
};

usuarioController.deleteUsuario = async (req, res) =>{
    await Usuario.findByIdAndUpdate(req.params.id, {eliminado: true})
    .then(
        (err)=>{
            if (err) {
                res.status(500).send({message: 'Error al  eliminar los datos'})
            }else{
                res.status(200).send({message: 'usuario eliminado correctamente'})
            } 
        });
};

function isAuthenticated (req, res, next){
  if(req.isAuthenticated()){
      return next();
  }else{
      res.status(200).send({message: 'usuario eliminado correctamente'}); 
      
  }
}

module.exports = usuarioController;