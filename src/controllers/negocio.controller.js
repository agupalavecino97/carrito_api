const Negocio = require("../models/negocio");
const negocioController = {};

//devolver todos los negocios
negocioController.getNegocios = async (req, res) => {
  const negocios = await Negocio.find({ eliminado: false });
  if (negocios.length > 0) {
    res.status(200).send(negocios);
  } else {
    res.status(500).send({ message: "Error al buscar los datos." });
  }
};

negocioController.addNegocio = async (req, res) => {
  const { CUIT } = req.body;
  var negocio = Negocio.findOne({ CUIT });
  if (negocio) {
    return res
      .status(500)
      .send({ message: "Ya existe negocio con el mismo CUIT" });
  }
  negocio = Negocio(req.body);
  (await negocio).save((err, negocio) => {
    if (err) {
      res.status(500).send({ message: "Error al  guardar los datos" });
    } else {
      res.status(200).send(negocio); //O creado con exito;
    }
  });
};

//devolver un solo negocio
negocioController.getNegocio = async (req, res) => {
  const negocios = await Negocio.find({
    eliminado: false,
    _id: req.params.id,
  });
  if (negocios.length > 0) {
    res.status(200).send(negocios);
  } else {
    res.status(500).send({ message: "Error al buscar los datos." });
  }
};

negocioController.editNegocio = async (req, res) => {
  const { id_negocio } = req.body; /* lo agrega auth */
  const newNegocio = Negocio(req.body);
  if (req.params.id === id_negocio) {
    Negocio.findByIdAndUpdate(req.params.id, newNegocio, {
      new: true,
    }).then((err, negocio) => {
      if (err) {
        res.status(500).send({ message: "Error al  guardar los datos" });
      } else {
        res.status(200).send({ message: "negocio modificado correctamente" });
        console.log(negocio);
      }
    });
  } else {
    res.status(500).send({ message: "No tiene permisos para editar" });
  }
};

negocioController.deleteNegocio = async (req, res) => {
  const { id_negocio } = req.body; /* lo agrega auth */
  if (req.params.id === id_negocio) {
    await Negocio.findByIdAndUpdate(req.params.id, { eliminado: true }).then(
      (err) => {
        if (err) {
          res.status(500).send({ message: "Error al  eliminar los datos" });
        } else {
          res.status(200).send({ message: "negocio eliminado correctamente" });
        }
      }
    );
  } else {
    res.status(500).send({ message: "No tiene permisos para editar" });
  }
};

module.exports = negocioController;
