import React, { useEffect, useState } from "react";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import ProTip from "../src/ProTip";
import Link from "../src/Link";
import Copyright from "../src/Copyright";
import { Button } from "@mui/material";
import Head from "next/head";
import { estadoUsuario } from "../data/StateZustand";
import { withPrivate } from "../data/rutas";
import Layout from "../componentes/UI/Layout";

function IndexPage(props) {
  console.log(props);
  const { usuario, setEntradas, entradas } = estadoUsuario((state) => state);

  useEffect(() => {
    //retinaData();
    if (!entradas) {
      Entradas();
    }
  }, []);

  /* const retinaData = async () => {
    const response = await fetch(
      "https://script.google.com/macros/s/AKfycbztzXBkzgYd4kgV3BAa1fi1-UQY8rgw4935BkyUt0-bEJJeTgrDHX1dIxqyzSDG03g/exec"
    );
    const data = await response.json();
    console.log(data);
  }; */

  const Entradas = async () => {
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
  };

  if (!usuario) {
    return null;
  }

  return (
    <>
      <Head>
        <meta name="jaime" content="lacasaloca"></meta>
        <title>El comienzo de la web</title>
      </Head>

      <Layout>
        <Box sx={{ my: 4 }}>
          <Typography variant="h4" component="h1" gutterBottom>
            Next.js example
          </Typography>
          <Link href="/about" color="secondary">
            Acerca de este ensayo
          </Link>
          <Button>Hola Ke ase</Button>

          <ProTip />
          <Copyright />
        </Box>
      </Layout>
    </>
  );
}

export async function getServerSideProps(context) {
  //console.log("LECONTEXTÉ", process.env.HOST);
  const response = await fetch(
    "https://script.google.com/macros/s/AKfycbydSoKVY_hk0RRd8FOiWuVEVcrUhk9MQs_G38sx3ibbxaEDmGPaYx90Ea803s3te6hx/exec"
  );
  const data = await response.json();
  return {
    props: { posts: data },
  };
}
export default withPrivate(IndexPage);
