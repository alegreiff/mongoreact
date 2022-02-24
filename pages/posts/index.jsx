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
import { Post } from "../../componentes/posts/Post";
import Layout from "../../componentes/UI/Layout";

function PostIndexPage({ posts }) {
  console.log(process.env.NODE_ENV);
  return (
    <Layout>
      <Grid container spacing={3}>
        {posts.map((post) => (
          <Grid item xs={4} key={post._id}>
            <Post post={post} tipo="lista" />
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
