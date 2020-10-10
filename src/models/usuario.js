const mongoose = require("mongoose");
const { Schema } = mongoose;

const usuarioSchema = new Schema({
  email: {
    type: String,
    unique: true,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  nombre: {
    type: String,
    required: true,
  },
  apellido: {
    type: String,
    required: true,
  },
  eliminado: {
    type: Boolean,
    default: "false",
  },
  rol: {
    type: Number,
    default: 1,
  },
  id_negocio: {
    type: Schema.Types.ObjectId,
    ref: "Negocio",
    required: true,
  },
});

module.exports = mongoose.model("Usuario", usuarioSchema);
