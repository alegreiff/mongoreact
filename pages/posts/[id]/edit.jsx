import { Box, Button, Grid, TextField } from "@mui/material";
import React from "react";
import { FormBase } from "../../../componentes/formularios/Formulario";
import Layout from "../../../componentes/UI/Layout";
import fetch from "isomorphic-fetch";
//FORMULARIOS
import { useFormik } from "formik";
import { validationSchemaPost } from "../../../componentes/formularios/validacionEntrada";
import estilos from "../../../componentes/formularios/formularios.module.css";
import { useRouter } from "next/router";
//FECHA
import moment from "moment";
import "moment/locale/es";
moment.locale("es"); // it is required to select default locale manually
import DateAdapter from "@mui/lab/AdapterMoment";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import { DatePicker } from "@mui/lab";
//SWAL
import Swal from "sweetalert2";

export default function nuevo({ post }) {
  const router = useRouter();
  const formik = useFormik({
    initialValues: {
      tituloEntrada: post.tituloEntrada,
      contenido: post.contenido,
      fechaPublicacion: post.fechaPublicacion,
    },
    onSubmit: (values) => {
      creaEntrada(values);
    },
    onChange: () => {
      console.log(formik);
    },
    validationSchema: validationSchemaPost,
    validateOnMount: false,
  });

  const creaEntrada = async (values) => {
    const newPost = {
      tituloEntrada: values.tituloEntrada,
      contenido: values.contenido,
      fechaPublicacion: values.fechaPublicacion,
    };
    try {
      const URL =
        process.env.NODE_ENV === "development"
          ? "http://localhost:3000"
          : "https://jaimedegreiff.ml";
      const res = await fetch(`${URL}/api/posts/${post._id}`, {
        method: "PUT",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newPost),
      });
      console.log(res);
      Swal.fire("Good job!", "You clicked the button!", "success");
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

export async function getServerSideProps({ query: { id } }) {
  const res = await fetch(`${process.env.HOST}/api/posts/${id}`);
  const { data } = await res.json();
  console.log("ddd", data);
  return {
    props: { post: data },
  };
}
