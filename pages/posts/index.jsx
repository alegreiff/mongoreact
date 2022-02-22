import { Grid } from "@mui/material";
import React from "react";
import Layout from "../../componentes/UI/Layout";

function PostIndexPage({ posts }) {
  return (
    <Layout>
      <Grid container>
        <Grid item xs={12}>
          {posts.map((post) => (
            <div key={post._id}>
              <h5>{post.tituloEntrada}</h5>
            </div>
          ))}
        </Grid>
      </Grid>
    </Layout>
  );
}

PostIndexPage.getInitialProps = async ({ origin }) => {
  const res = await fetch(`${origin}/api/posts`);
  const { data } = await res.json();
  return { posts: data };
};

export default PostIndexPage;
