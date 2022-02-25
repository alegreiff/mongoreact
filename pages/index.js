import React, { useEffect, useState } from "react";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import ProTip from "../src/ProTip";
import Link from "../src/Link";
import Copyright from "../src/Copyright";
import { Button, Grid, TextField } from "@mui/material";
import Head from "next/head";
import { estadoUsuario } from "../data/StateZustand";
import { withPrivate } from "../data/rutas";
import Layout from "../componentes/UI/Layout";
import useSWR from "swr";
import { Film } from "../componentes/peliculas/Film";

const fetcher = (...args) => fetch(...args).then((response) => response.json());

function IndexPage(props) {
  console.log(props);
  const GoogleURL =
    "https://script.google.com/macros/s/AKfycbydSoKVY_hk0RRd8FOiWuVEVcrUhk9MQs_G38sx3ibbxaEDmGPaYx90Ea803s3te6hx/exec";

  const { data, error } = useSWR(GoogleURL, fetcher);
  const { usuario, setEntradas, entradas } = estadoUsuario((state) => state);
  const [palabra, setPalabra] = useState("");
  const [peliculas, setPeliculas] = useState([]);

  if (error) return <h1>{error}</h1>;
  console.log(data);

  const filtroPalabra = (e) => {
    setPalabra(e.target.value);
  };
  useEffect(() => {
    if (data?.datos) {
      const filtro = data.datos.filter((f) =>
        f.titulo.toLowerCase().includes(palabra.toLowerCase())
      );
      setPeliculas(filtro);
    }
  }, [palabra]);

  useEffect(() => {
    //retinaData();
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
    const adata = await response.json();
    if (!response.ok) {
      throw new Error(adata.message || "Algo salió remal");
    }
    setEntradas(adata.entradas);
  };

  if (!usuario) {
    return null;
  }

  return (
    <>
      <Layout>
        <Box mb={5} mt={3}>
          <TextField
            id="outlined-basic"
            label="País"
            variant="outlined"
            placeholder="País"
            onChange={filtroPalabra}
          />{" "}
          {palabra}
        </Box>
        <Grid container spacing={2}>
          {peliculas
            ? peliculas.map((film) => {
                return <Film key={film.id} film={film} />;
              })
            : "C A R G A N D O"}
        </Grid>
      </Layout>
    </>
  );
}

/* export async function getServerSideProps(context) {
  //console.log("LECONTEXTÉ", process.env.HOST);
  const response = await fetch(
    "https://script.google.com/macros/s/AKfycbydSoKVY_hk0RRd8FOiWuVEVcrUhk9MQs_G38sx3ibbxaEDmGPaYx90Ea803s3te6hx/exec"
  );
  const data = await response.json();
  return {
    props: { posts: data },
  };
} */
export default withPrivate(IndexPage);

/* 
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

*/
