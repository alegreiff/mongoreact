import { Button, Grid, TextField } from "@mui/material";
import React from "react";
import { FormBase } from "../../componentes/formularios/Formulario";
import Layout from "../../componentes/UI/Layout";
import fetch from "isomorphic-fetch";
//FORMULARIOS
import { useFormik } from "formik";
import { validationSchemaPost } from "../../componentes/formularios/validacionEntrada";
import estilos from "../../componentes/formularios/formularios.module.css";
import { useRouter } from "next/router";
export default function nuevo() {
  const router = useRouter();
  const formik = useFormik({
    initialValues: {
      tituloEntrada: "",
      contenido: "",
    },
    onSubmit: (values) => {
      creaEntrada(values);
    },
    onChange: () => {
      console.log(formik);
    },
    validationSchema: validationSchemaPost,
    validateOnMount: true,
  });

  const creaEntrada = async (values) => {
    const newPost = {
      tituloEntrada: values.tituloEntrada,
      contenido: values.contenido,
    };
    try {
      const res = await fetch(`${process.env.HOST}/api/posts`, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newPost),
      });
      console.log(res);
      router.push("/posts");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Layout>
      <Grid container>
        <Grid item xs={3}></Grid>
        <Grid item xs={6}>
          <FormBase nombre="Nuevo minipost" onSubmit={formik.handleSubmit}>
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
            <Button
              variant="outlined"
              disabled={!(formik.isValid && formik.dirty)}
              type="submit"
            >
              Guardar entrada
            </Button>
          </FormBase>
        </Grid>
        <Grid item xs={3}></Grid>
      </Grid>
    </Layout>
  );
}
