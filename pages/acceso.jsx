import React, { useEffect, useState } from "react";
import { auth, googleProvider } from "../data/firebase";
import { signInWithPopup } from "firebase/auth";
import { Box, Button } from "@mui/material";
import { estadoUsuario } from "../data/StateZustand";
import { withPublic } from "../data/rutas";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

function AccesoPage() {
  const mensaje = withReactContent(Swal);
  const { setUsuario } = estadoUsuario((state) => state);
  const [user, setUser] = useState(null);
  //console.log(usuario);

  const [error, setError] = useState();
  useEffect(() => {
    if (user) {
      setUsuario(user ?? null);
    }
  }, [user]);

  const loginGoogle = async () => {
    const { error, user } = await signInWithPopup(auth, googleProvider);
    if (user.email === "alegreiff@gmail.com") {
      Swal.fire({
        title: user.email,
        text: "You won't be able to revert this!",
        icon: "warning",
        //showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, delete it!",
      }).then((result) => {
        if (result.isConfirmed) {
          Swal.fire("Deleted!", "Your file has been deleted.", "success");
          setUser(user);
          //setUsuario(user ?? null);
          setError(error ?? "");
        }
      });
    } else {
      Swal.fire("Tu correo NO está autorizado");
    }
    //setUsuario(user ?? null);
    //setError(error ?? "");
  };

  return (
    <>
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        minHeight="100vh"
      >
        <Button variant="contained" onClick={loginGoogle}>
          Acceso google
        </Button>
      </Box>
    </>
  );
}

export default withPublic(AccesoPage);
