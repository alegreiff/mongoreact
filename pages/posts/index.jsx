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
  return (
    <Layout>
      <Grid container spacing={3}>
        {posts.map((post) => (
          <Grid item xs={6} key={post._id}>
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
                  <Button size="small">Learn More</Button>
                </Link>
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Layout>
  );
}

PostIndexPage.getInitialProps = async ({ origin }) => {
  //const res = await fetch("https://jaimedegreiff.ml/api/posts");
  const res = await fetch("http://localhost:3000/api/posts");
  const { data } = await res.json();
  return { posts: data };
};

export default PostIndexPage;
