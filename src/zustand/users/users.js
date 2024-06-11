import { create } from "zustand";

export const infoNewUser = create((set) => ({
  nombre: "",
  setNombre: (e) => set(() => ({ nombre: e.target.value })),
  telefono: "",
  setTelefono: (e) => set(() => ({ telefono: e.target.value })),
  direccion: "",
  setDireccion: (e) => set(() => ({ direccion: e.target.value })),
  email: "",
  setEmail: (e) => set(() => ({ email: e.target.value })),
  genero: "",
  setGenero: (e) => set(() => ({ genero: e.target.value })),
}));

export const userSelectedInfo = create((set) => ({
  userSelected: {},
  setUserSelected: (user) => set(() => ({ userSelected: user })),
  setUserSelectedDatePaymentUpto: (paymentUpTo) => set((state) => ({ setUserSelected: { ...state.setUserSelected, paymentUpTo } })),
}));

export const useUsers = create((set) => ({
  hasUsersActives: false,
  usersActives: [],
  setUsersActives: (users) => set(() => ({ usersActives: users, hasUsersActives: true })),
  hasAllUsers: false,
  allUsers: [],
  setAllUsers: (users) => set(() => ({ allUsers: users, hasAllUsers: true })),

  users: [],
  setUsers: (users) => set(() => ({ users: users })),
  paymentsList: [],
  addPaymentsList: (payment) => set((state) => ({ paymentsList: [...state.paymentsList, payment] })),
}));
