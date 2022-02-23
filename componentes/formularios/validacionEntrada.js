import * as yup from "yup";

export const validationSchemaEntrada = yup.object({
  tituloEntrada: yup
    .string()
    .required("El título es requerido")
    .min(6, "Al menos seis caracteres"),
  fechaPublicacion: yup.date().required("Date is required"),
});

export const validationSchemaPost = yup.object({
  tituloEntrada: yup.string().required("Se necesita el título"),
  contenido: yup.string(),
});

/*  
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
*/
