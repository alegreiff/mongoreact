import { Box, Container } from "@mui/material";
import React, { useEffect, useState } from "react";
import EntradaModelo from "../../componentes/blog/Entrada";
import Layout from "../../componentes/UI/Layout";
import { estadoUsuario } from "../../data/StateZustand";

export default function Crear() {
  const { entradas } = estadoUsuario((state) => state);
  const [posts, setPosts] = useState(entradas);
  useEffect(() => {
    if (!posts) {
      setPosts(entradas);
    }
    //console.log(posts);
  });
  return (
    <Layout>
      <h5>Hola</h5>
    </Layout>
  );
}

/* 
{posts ??  posts.map((post) => (
        <EntradaModelo key={post._id} entrada={post} />
      ))}
*/

/* <Box>{posts ?? posts.map((post) => <EntradaModelo key={post._id} />)}</Box> */
