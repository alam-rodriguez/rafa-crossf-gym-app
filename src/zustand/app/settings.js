import { create } from "zustand";

export const settingsApp = create((set) => ({
  // appSettings: {
  //   monthlyPrice: 1000,
  //   nameApp: "China Gym",
  //   registrationPrice: 500,
  // },
  appSettings: {},
  hasAppSettings: false,
  setAppSettings: (settings) => set(() => ({ appSettings: settings, hasAppSettings: true })),
}));
