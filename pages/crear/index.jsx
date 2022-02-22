import React, { useEffect, useState } from "react";
import EntradaModelo from "../../componentes/blog/Entrada";
import Layout from "../../componentes/UI/Layout";
import { withPrivate } from "../../data/rutas";
import { estadoUsuario } from "../../data/StateZustand";

function Crear() {
  const { entradas } = estadoUsuario((state) => state);
  console.log(entradas);
  const [posts, setPosts] = useState(entradas);
  useEffect(() => {
    if (!posts) {
      setPosts(entradas);
    }
    //console.log(posts);
  });
  if (!entradas) {
    return <h1>no hay nada aquí...</h1>;
  }
  return (
    <Layout>
      {entradas.map((post) => (
        <EntradaModelo key={post._id} entrada={post} />
      ))}
    </Layout>
  );
}
export default withPrivate(Crear);
/* <Box>{posts ?? posts.map((post) => <EntradaModelo key={post._id} />)}</Box> */
