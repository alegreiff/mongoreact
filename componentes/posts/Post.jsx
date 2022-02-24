import {
  Button,
  Card,
  CardActions,
  CardContent,
  Link,
  Typography,
} from "@mui/material";
import { useRouter } from "next/router";
import React from "react";
import Swal from "sweetalert2";

export const Post = ({ post, tipo = "lista" }) => {
  const router = useRouter();
  //console.log(tipo);
  const deleteDB = async (id) => {
    try {
      const URL =
        process.env.NODE_ENV === "development"
          ? "http://localhost:3000"
          : "https://jaimedegreiff.ml";
      const res = await fetch(`${URL}/api/posts/${id}`, {
        method: "DELETE",
        /* headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        }, */
      });
      console.log(res);
      router.push("/posts");
    } catch (error) {
      console.log(error);
    }
  };
  const borraPost = (post) => {
    Swal.fire({
      title: `¿Desea borrar ${post.tituloEntrada}?`,
      //text: "You won't be able to revert this!",
      //icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Sin mente",
      cancelButtonText: "Mejor no",
    }).then((result) => {
      if (result.isConfirmed) {
        deleteDB(post._id);

        Swal.fire("Éxito", "La entrada ha sido borrada.", "success");
      } else {
        Swal.fire("deje así");
      }
    });
  };
  return (
    <Card>
      <CardContent>
        <Typography sx={{ fontSize: 22 }} color="text.secondary" gutterBottom>
          {post.tituloEntrada}
        </Typography>

        <Typography variant="body2">{post.contenido}</Typography>
      </CardContent>
      <CardActions>
        {tipo === "lista" && (
          <Link href={`/posts/${post._id}`}>
            <Button size="small" variant="outlined">
              Ver
            </Button>
          </Link>
        )}

        <Link href={`/posts/${post._id}/edit`}>
          <Button size="small" color="secondary" variant="contained">
            Editar
          </Button>
        </Link>

        {tipo === "sencillo" && (
          <Button
            sx={{ background: "#DC143C", color: "white" }}
            size="small"
            color="secondary"
            variant="outlined"
            onClick={() => borraPost(post)}
          >
            Eliminar !
          </Button>
        )}
      </CardActions>
    </Card>
  );
};
