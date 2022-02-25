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
      return null;
    }
    return <Component />;
  };
}

export function withPrivate(Component) {
  return function WithPrivate(props) {
    const { setUsuario } = estadoUsuario((state) => state);

    const router = useRouter();
    useEffect(() => {
      onAuthStateChanged(auth, (user) => {
        if (user) {
          setUsuario(user);
          console.log("USER SETTED");
        } else {
          router.replace("/acceso");
        }
      });
    }, []);

    return <Component {...props} />;
  };
}
