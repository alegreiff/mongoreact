import * as React from "react";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import ProTip from "../src/ProTip";
import Link from "../src/Link";
import Copyright from "../src/Copyright";
import MenuSuperior from "../componentes/UI/MenuSuperior";
import Layout from "../componentes/UI/Layout";
import { withPublic } from "../data/rutas";

function About() {
  return (
    <Layout>
      <Box sx={{ my: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Next.js example
        </Typography>
        <Button variant="contained" component={Link} noLinkStyle href="/">
          Go to the main page
        </Button>
        <ProTip />
        <Copyright />
      </Box>
    </Layout>
  );
}
export default withPublic(About);
