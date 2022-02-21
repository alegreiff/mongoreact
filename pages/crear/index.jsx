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
      {posts.map((post) => (
        <EntradaModelo key={post._id} entrada={post} />
      ))}
    </Layout>
  );
}

/* <Box>{posts ?? posts.map((post) => <EntradaModelo key={post._id} />)}</Box> */
