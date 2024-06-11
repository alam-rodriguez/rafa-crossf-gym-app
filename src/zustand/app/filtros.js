import { create } from "zustand";

export const filtrosUsers = create((set) => ({
  agruparPor: "",
  setAgruparPor: (e) => set(() => ({ agruparPor: e.target.value })),
  tiempo: "",
  setTiempo: (e) => set(() => ({ tiempo: e.target.value })),
  genero: "",
  setGenero: (e) => set(() => ({ genero: e.target.value })),
  estado: "",
  setEstado: (e) => set(() => ({ estado: e.target.value })),

  agruparPorTiempo: "",
  setAgruparPorTiempo: (e) => set(() => ({ agruparPorTiempo: e.target.value })),
  agruparPorGenero: "",
  setAgruparPorGenero: (e) => set(() => ({ agruparPorGenero: e.target.value })),
  agruparPorEstado: "",
  setAgruparPorEstado: (e) => set(() => ({ agruparPorEstado: e.target.value })),
}));
