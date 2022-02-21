import * as yup from "yup";

export const validationSchemaEntrada = yup.object({
  tituloEntrada: yup
    .string()
    .required("El título es requerido")
    .min(6, "Al menos seis caracteres"),
  fechaPublicacion: yup.date().required("Date is required"),

  //campoPassword: yup.string().required("Obveo").min(6, "Seis por lo menos"),
});
