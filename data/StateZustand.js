import create from "zustand";
import { devtools } from "zustand/middleware";

const useStore = create(
  devtools((set, get) => ({
    usuario: null,
    setUsuario: (user) => set({ usuario: user }),
    entradas: null,
    setEntradas: (posts) => set({ entradas: posts }),
    addEntrada: (post) => {
      const currentEntradas = get().entradas;
      set({ entradas: [...currentEntradas, post] });
    },
    //addEntrada: (post => set({  }))
  }))
);

export const estadoUsuario = useStore;
