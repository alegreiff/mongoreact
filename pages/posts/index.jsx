import { Grid } from "@mui/material";
import fetch from "isomorphic-fetch";
import React from "react";
import { Post } from "../../componentes/posts/Post";
import Layout from "../../componentes/UI/Layout";
import { withPrivate } from "../../data/rutas";

function PostIndexPage({ posts }) {
  return (
    <Layout>
      <Grid container spacing={3}>
        {posts.map((post) => (
          <Grid item xs={12} md={6} xl={4} key={post._id}>
            <Post post={post} tipo="lista" />
          </Grid>
        ))}
      </Grid>
    </Layout>
  );
}
export default withPrivate(PostIndexPage);
//export default PostIndexPage;

//getInitialProps = async ({  }) => {
export async function getServerSideProps(context) {
  //console.log("LECONTEXTÃ‰", process.env.HOST);
  const res = await fetch(`${process.env.HOST}/api/posts`);
  const { data } = await res.json();
  return {
    props: { posts: data },
  };
}
