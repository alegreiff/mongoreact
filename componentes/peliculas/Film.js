import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Grid,
  Typography,
} from "@mui/material";
import React from "react";

export const Film = ({ film }) => {
  return (
    <>
      <Grid item xs={12} md={3} xl={2}>
        <Card sx={{ maxWidth: 345 }}>
          {/* <CardMedia
            component="img"
            image={`https://reportes.ga/assets/posteres/${film.id}.jpg`}
            alt="green iguana"
          /> */}
          <CardContent>
            <Typography gutterBottom variant="h5" component="div">
              {film.titulo}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {film.formato} | {film.genero} | {film.year} | {film.duracion}
            </Typography>
          </CardContent>
          <CardActions>
            <Button size="small">{film.pais}</Button>
            {/* <Button size="small">Learn More</Button> */}
          </CardActions>
        </Card>
      </Grid>
    </>
  );
};
