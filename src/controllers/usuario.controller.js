const Usuario = require("../models/usuario");
const usuarioController = {};
const jwt = require("jsonwebtoken");
const bcryptjs = require("bcryptjs");

//login
usuarioController.login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const usuario = await Usuario.findOne({ email, eliminado: false });
    const passCorrecto = await bcryptjs.compare(password, usuario.password);
    if (!passCorrecto) {
      return res.status(400).json({ message: "Contraseña incorrecta" });
    }
    const payload = {
      usuario: {
        id: usuario._id,
        name: usuario.nombre + usuario.apellido,
        id_negocio: usuario.id_negocio,
      },
    };
    jwt.sign(
      payload,
      process.env.SECRETA,
      {
        expiresIn: 21600,
      },
      (error, token) => {
        if (error) throw error;
        res.json({ token });
      }
    );
  } catch (error) {
    res.status(500).json({ message: "Hubo un error interno" });
  }
};

usuarioController.registro = async (req, res) => {
  try {
    let usuario = await User.findOne({ email: req.body.email });
    if (usuario) {
      return res.status(400).json({ msg: "El usuario ya existe" });
    }
    usuario = new User(req.body);
    //hash
    const salt = await bcryptjs.genSalt(10);
    usuario.password = await bcryptjs.hash(usuario.password, salt);
    await usuario.save();

    const payload = {
      usuario: {
        id: usuario._id,
        name: usuario.nombre + usuario.apellido,
        id_negocio: usuario.id_negocio,
      },
    };
    //crear y firmar jwt
    jwt.sign(
      payload,
      process.env.SECRETA,
      {
        expiresIn: 21600,
      },
      (error, token) => {
        if (error) throw error;
        res.json({ token });
      }
    );
    res.json({ msg: "Usuario creado con exito" });
  } catch (e) {
    res.status(500).send("Hubo un error");
  }
};

//devolver todos los usuarios
usuarioController.getUsuarios = async (req, res) => {
  const usuarios = await Usuario.find({ eliminado: false });
  if (usuarios.length > 0) {
    res.status(200).send(usuarios);
  } else {
    res.status(500).send({ message: "Error al buscar los datos." });
  }
};

//devolver un solo usuario
usuarioController.getUsuario = async (req, res) => {
  const usuarios = await Usuario.find({ eliminado: false, _id: req.params.id });
  if (usuarios.length > 0) {
    res.status(200).send(usuarios);
  } else {
    res.status(500).send({ message: "Error al buscar los datos." });
  }
};

usuarioController.autenticarUsuario = async (req, res) => {
  try {
    const usuario = await User.findById(req.usuario.id).select("-password");
    if (!usuario.to_register) {
      return res.status(400).json({ msg: "El usuario no existe" });
    }
    res.json({ usuario });
  } catch (e) {
    console.log(e);
    res.status(500).json({ msg: "Hubo un error" });
  }
};

usuarioController.editUsuario = async (req, res) => {
  await Usuario.findByIdAndUpdate(req.params.id, {
    nombre: req.body.nombre,
    precio: req.body.precio,
    cantidad_stock: req.body.cantidad,
    id_categoria: req.body.id_categoria,
    stock_minimo: req.body.stock_minimo,
  }).then((err) => {
    if (err) {
      res.status(500).send({ message: "Error al  guardar los datos" });
    } else {
      res.status(200).send({ message: "usuario modificado correctamente" });
    }
  });
};

usuarioController.deleteUsuario = async (req, res) => {
  await Usuario.findByIdAndUpdate(req.params.id, { eliminado: true }).then(
    (err) => {
      if (err) {
        res.status(500).send({ message: "Error al  eliminar los datos" });
      } else {
        res.status(200).send({ message: "usuario eliminado correctamente" });
      }
    }
  );
};

module.exports = usuarioController;
