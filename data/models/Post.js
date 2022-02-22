const mongoose = require("mongoose");
const PostSchema = new mongoose.Schema({
  tituloEntrada: {
    type: String,
    required: [true, "El título es requerido"],
    unique: true,
    trim: true,
    maxlength: [40, "El título no debe ser más largo de 40 caracteres"],
  },

  contenido: {
    type: String,
    required: [true, "Contenido rrquerido"],
    trim: true,
  },
  accesos: {
    type: Number,
    required: [true],
  },
  fechaPublicacion: {
    type: String,
    required: [true],
  },
});

module.exports = mongoose.models.Post || mongoose.model("Post", PostSchema);

/* 
_id
:
6213edb538cea972c8d81500
fechaPublicacion
:
"2022-02-23T19:32:38.000Z"
tituloEntrada
:
"Modelo de entrada en Material UI"
contenido
:
"The API doesn't show any properties that have anything to do with 'cla..."
accesos
:
0
*/
