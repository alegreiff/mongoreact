import { Box, Button, Grid, TextField } from "@mui/material";
import React, { useState } from "react";
import { FormBase } from "../../componentes/formularios/Formulario";
import Layout from "../../componentes/UI/Layout";
import { withPrivate } from "../../data/rutas";
import { useFormik } from "formik";
import { validationSchemaEntrada } from "../../componentes/formularios/validacionEntrada";
import estilos from "../../componentes/formularios/formularios.module.css";
import moment from "moment";
import "moment/locale/es";
moment.locale("es"); // it is required to select default locale manually
import { estadoUsuario } from "../../data/StateZustand";

import DateAdapter from "@mui/lab/AdapterMoment";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import { DatePicker } from "@mui/lab";

function CrearEntrada() {
  const { addEntrada, entradas } = estadoUsuario((state) => state);

  const [value, setValue] = useState(null);

  const formik = useFormik({
    initialValues: {
      tituloEntrada: "",
      fechaPublicacion: "",
      contenido: "",
    },
    onSubmit: (values) => {
      createPost(values);
      //console.log(JSON.stringify(values));
      //createUser(values.campoCorreo, values.campoPassword);
    },
    onChange: () => {
      console.log(formik);
    },
    validationSchema: validationSchemaEntrada,
    validateOnMount: true,
  });

  const createPost = async (valores) => {
    const fecha = moment(valores.fechaPublicacion).format("DD-MM-YYYY");
    console.log("Valores: ", valores.fechaPublicacion);
    console.log("FECHA", fecha);
    const response = await fetch("/api/blog/nuevo", {
      method: "POST",
      body: JSON.stringify({ valores }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await response.json();
    if (!response.ok) {
      throw new Error(data.message || "Algo salió remal");
    }
    console.log("DATA", data);
    if (data && entradas) {
      const entrada = {
        _id: data.result.insertedId,
        fechaPublicacion: moment(valores.fechaPublicacion).format("DD-MM-YYYY"),
        tituloEntrada: valores.tituloEntrada,
        contenido: valores.contenido,
        accesos: 0,
      };
      addEntrada(entrada);
    }
    return data;
  };

  return (
    <Layout>
      <FormBase nombre="Crear entrada" onSubmit={formik.handleSubmit}>
        <Grid container spacing={4}>
          <Grid item xs={12} md={6}>
            <TextField
              label="Título"
              fullWidth
              name="tituloEntrada"
              value={formik.values.tituloEntrada}
              onChange={formik.handleChange}
              error={
                formik.touched.tituloEntrada &&
                Boolean(formik.errors.tituloEntrada)
              }
              helperText={
                formik.touched.tituloEntrada && formik.errors.tituloEntrada
              }
              onBlur={formik.handleBlur}
            ></TextField>
            <Box className={estilos.input}>
              <LocalizationProvider dateAdapter={DateAdapter}>
                <DatePicker
                  label="Fecha de publicación"
                  value={formik.values.fechaPublicacion}
                  onChange={(newValue) => {
                    formik.setFieldValue("fechaPublicacion", newValue);
                    /* moment(newValue).format("DD-MM-YYYY") */
                  }}
                  error={
                    formik.touched.fechaPublicacion &&
                    Boolean(formik.errors.fechaPublicacion)
                  }
                  helperText={
                    formik.touched.fechaPublicacion &&
                    formik.errors.fechaPublicacion
                  }
                  onBlur={formik.handleBlur}
                  renderInput={(params) => <TextField {...params} />}
                />
              </LocalizationProvider>
            </Box>
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField
              className={estilos.input}
              multiline
              maxRows={15}
              label="Contenido de la entrada"
              className={estilos.textareaFull}
              name="contenido"
              value={formik.values.contenido}
              onChange={formik.handleChange}
              error={
                formik.touched.contenido && Boolean(formik.errors.contenido)
              }
              helperText={formik.touched.contenido && formik.errors.contenido}
              onBlur={formik.handleBlur}
            ></TextField>
          </Grid>
          <Grid item xs={12} container justifyContent="center">
            <Button
              variant="outlined"
              disabled={!(formik.isValid && formik.dirty)}
              type="submit"
            >
              Guardar entrada
            </Button>
          </Grid>
        </Grid>
      </FormBase>
    </Layout>
  );
}

export default withPrivate(CrearEntrada);
