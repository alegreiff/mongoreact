import { Router, useRouter } from "next/router";
import fetch from "isomorphic-fetch";
import React, { useEffect, useState } from "react";
import Layout from "../../../componentes/UI/Layout";
import { Post } from "../../../componentes/posts/Post";
import { Grid } from "@mui/material";

export default function SinglePost({ post }) {
  const router = useRouter();

  return (
    <Layout>
      <Grid container>
        <Grid item xs={2} />
        <Grid item xs={8}>
          <Post post={post} tipo="sencillo" />
        </Grid>
        <Grid item xs={2} />
      </Grid>
    </Layout>
  );
}

export async function getServerSideProps({ query: { id } }) {
  const res = await fetch(`${process.env.HOST}/api/posts/${id}`);
  const { data } = await res.json();
  console.log("ddd", data);
  return {
    props: { post: data },
  };
}
