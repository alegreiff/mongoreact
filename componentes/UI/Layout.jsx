import { Container } from "@mui/material";
import React from "react";
import MenuSuperior from "./MenuSuperior";

export default function Layout(props) {
  return (
    <>
      <Container maxWidth="xl">
        <MenuSuperior />
        {props.children}
      </Container>
    </>
  );
}
