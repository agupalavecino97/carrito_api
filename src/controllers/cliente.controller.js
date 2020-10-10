const Cliente = require("../models/cliente");
const clienteController = {};

//devolver todos los clientes
clienteController.getClientes = async (req, res) => {
  const clientes = await Cliente.find({ eliminado: false }).select("-password");
  if (clientes.length > 0) {
    res.status(200).send(clientes);
  } else {
    res.status(500).send({ message: "Error al buscar los datos." });
  }
};

clienteController.addCliente = async (req, res) => {
    const { CUIT } = req.body;
    var cliente = Cliente.findOne({ email });
    if (cliente) {
      return res
        .status(500)
        .send({ message: "Ya existe cliente con el mismo email" });
    }
    cliente = Cliente(req.body);
    (await cliente).save((err, cliente) => {
      if (err) {
        res.status(500).send({ message: "Error al  guardar los datos" });
      } else {
        res.status(200).send(cliente); //O creado con exito;
      }
    });
  };

//devolver un solo cliente
clienteController.getCliente = async (req, res) => {
  const clientes = await Cliente.find({
    eliminado: false,
    _id: req.params.id,
  }).select("-password");
  if (clientes.length > 0) {
    res.status(200).send(clientes);
  } else {
    res.status(500).send({ message: "Error al buscar los datos." });
  }
};

clienteController.editCliente = async (req, res) => {
  /*   const { nombre, apellido, direccion, telefono, email } = req.body;*/
  const newCliente = Cliente(req.body);
  Cliente.findByIdAndUpdate(req.params.id, newCliente, {
    new: true,
  }).then((err, cliente) => {
    if (err) {
      res.status(500).send({ message: "Error al  guardar los datos" });
    } else {
      res.status(200).send({ message: "cliente modificado correctamente" });
      console.log(cliente);
    }
  });
};

clienteController.deleteCliente = async (req, res) => {
  await Cliente.findByIdAndUpdate(req.params.id, { eliminado: true }).then(
    (err) => {
      if (err) {
        res.status(500).send({ message: "Error al  eliminar los datos" });
      } else {
        res.status(200).send({ message: "cliente eliminado correctamente" });
      }
    }
  );
};

module.exports = clienteController;
