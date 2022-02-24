import { useRouter } from "next/router";
import { useEffect } from "react";
import { estadoUsuario } from "./StateZustand";
import { auth } from "../data/firebase";
import { onAuthStateChanged } from "firebase/auth";

export function withPublic(Component) {
  return function WithPublic() {
    const { usuario } = estadoUsuario((state) => state);
    const router = useRouter();
    if (usuario) {
      router.replace("/");
      return <h1>Cargando AAA </h1>;
    }
    return <Component />;
  };
}

export function withPrivate(Component) {
  return function WithPrivate(props) {
    console.log("WithPrivate", props.post);
    const { setUsuario } = estadoUsuario((state) => state);

    const router = useRouter();
    useEffect(() => {
      onAuthStateChanged(auth, (user) => {
        if (user) {
          setUsuario(user);
          console.log("user resetted");
        } else {
          console.log("Nolas");
          router.replace("/acceso");
        }
      });
    }, []);
    /* useEffect(() => {
      if (!usuario) {
        console.log("Pasa por with private function");
        router.replace("/acceso");
        return <h1>Cargando BBB </h1>;
      }
    }); */

    return <Component {...props} />;
  };
}
