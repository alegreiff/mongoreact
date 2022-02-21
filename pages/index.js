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
import { auth, googleProvider } from "../data/firebase";
import { signInWithPopup } from "firebase/auth";
import { estadoUsuario } from "../data/StateZustand";
import { withPrivate } from "../data/rutas";

function IndexPage() {
  const { setUsuario, usuario, setEntradas, entradas } = estadoUsuario(
    (state) => state
  );
  useEffect(() => {
    if (!entradas) {
      Entradas();
    }
  }, []);

  const Entradas = async () => {
    const response = await fetch("/api/blog/all", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await response.json();
    /* if (!response.ok) {
      throw new Error(data.message || "Algo salió remal");
    } */
    setEntradas(data?.entradas);
    console.log("DATA", data);
    return data;
  };

  const [error, setError] = useState();

  const loginGoogle = async () => {
    const { error, user } = await signInWithPopup(auth, googleProvider);
    setUsuario(user ?? null);
    setError(error ?? "");
  };

  return (
    <>
      <Head>
        <meta name="jaime" content="lacasaloca"></meta>
      </Head>
      <Container maxWidth="lg">
        <MenuSuperior />
        <Box sx={{ my: 4 }}>
          <Button variant="contained" onClick={loginGoogle}>
            Acceso google - {usuario?.email}
          </Button>
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
