import { Router } from "next/router";
import React from "react";
import Layout from "../../componentes/UI/Layout";

export default function SinglePost() {
  const router = Router();
  console.log(router)
  return <Layout>El IDD</Layout>;
}
