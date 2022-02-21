import { Box } from "@mui/material";
import React from "react";
import moment from "moment";

export default function EntradaModelo({ entrada }) {
  //console.log(entrada);
  return (
    <Box>
      <h3>{entrada.tituloEntrada}</h3>
      <div dangerouslySetInnerHTML={{ __html: entrada.contenido }} />
      <span>{moment(entrada.fechaPublicacion).format("DD-MM-YYYY")}</span>
    </Box>
  );
}
