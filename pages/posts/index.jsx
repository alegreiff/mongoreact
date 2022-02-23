import {
  Button,
  Card,
  CardActions,
  CardContent,
  Grid,
  Typography,
} from "@mui/material";
import fetch from "isomorphic-fetch";
import Link from "next/link";
import React from "react";
import Layout from "../../componentes/UI/Layout";

function PostIndexPage({ posts }) {
  console.log(process.env.NODE_ENV);
  return (
    <Layout>
      <Grid container spacing={3}>
        {posts.map((post) => (
          <Grid item xs={4} key={post._id}>
            <Card>
              <CardContent>
                <Typography
                  sx={{ fontSize: 22 }}
                  color="text.secondary"
                  gutterBottom
                >
                  {post.tituloEntrada}
                </Typography>

                <Typography variant="body2">{post.contenido}</Typography>
              </CardContent>
              <CardActions>
                <Link href={`/posts/${post._id}`}>
                  <Button size="small" variant="outlined">
                    Ver entrada
                  </Button>
                </Link>
                <Link href={`/posts/${post._id}/edit`}>
                  <Button size="small" color="secondary" variant="contained">
                    Editar
                  </Button>
                </Link>
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Layout>
  );
}

//getInitialProps = async ({  }) => {
export async function getServerSideProps(context) {
  //console.log("LECONTEXTÉ", process.env.HOST);
  const res = await fetch(`${process.env.HOST}/api/posts`);
  const { data } = await res.json();
  return {
    props: { posts: data },
  };
}

export default PostIndexPage;
