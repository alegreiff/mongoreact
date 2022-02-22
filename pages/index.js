import React, { useEffect, useState } from "react";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import ProTip from "../src/ProTip";
import Link from "../src/Link";
import Copyright from "../src/Copyright";
import { Button } from "@mui/material";
import MenuSuperior from "../componentes/UI/MenuSuperior";
import Head from "next/head";

import { estadoUsuario } from "../data/StateZustand";
import { withPrivate } from "../data/rutas";

function IndexPage() {
  const { usuario, setEntradas, entradas } = estadoUsuario((state) => state);

  //console.log("USSSER", usuario);
  console.log("INTROUNCESES", entradas);
  useEffect(() => {
    if (!entradas) {
      Entradas();
      //const nuevosDatos = Entradas();
      //console.log("DATA_Uyy", nuevosDatos);
      //setEntradas(nuevosDatos);
      //(data?.entradas);
      //console.log("DATA_INN", entradas);
    }
  }, []);

  const Entradas = async () => {
    console.log("discurre por la snetradas");
    const response = await fetch("/api/blog/all", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await response.json();
    if (!response.ok) {
      throw new Error(data.message || "Algo salió remal");
    }
    setEntradas(data.entradas);
    //return data;
  };

  return (
    <>
      <Head>
        <meta name="jaime" content="lacasaloca"></meta>
      </Head>
      <Container maxWidth="lg">
        <MenuSuperior />
        <Box sx={{ my: 4 }}>
          <Typography variant="h4" component="h1" gutterBottom>
            Next.js example
          </Typography>
          <Link href="/about" color="secondary">
            Go to the about page
          </Link>
          <Button>Hola Ke ase</Button>
          <ProTip />
          <Copyright />
        </Box>
      </Container>
    </>
  );
}

export default withPrivate(IndexPage);
