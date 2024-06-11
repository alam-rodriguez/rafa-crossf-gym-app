import { create } from "zustand";

export const zusStatistics = create((set) => ({
  men: 0,
  women: 0,
  allUsersCount: 0,
  activeUsers: 0,
  nonActiveUsers: 0,
  earningsWithRegistration: 0,
  earningsWithMensRegistration: 0,
  earningsWithWomensRegistration: 0,
  earningsWithMonthlyPayments: 0,
  earningsWithMensMonthlyPayments: 0,
  earningsWithWomensMonthlyPayments: 0,
  earnings: 0,
  setStatistics: ({
    men,
    women,
    allUsersCount,
    activeUsers,
    nonActiveUsers,
    earningsWithRegistration,
    earningsWithMensRegistration,
    earningsWithWomensRegistration,
    earningsWithMonthlyPayments,
    earningsWithMensMonthlyPayments,
    earningsWithWomensMonthlyPayments,
    earnings,
  }) =>
    set((state) => {
      // console.log(men);
      return {
        men,
        women,
        allUsersCount,
        activeUsers,
        nonActiveUsers,
        earningsWithRegistration,
        earningsWithMensRegistration,
        earningsWithWomensRegistration,
        earningsWithMonthlyPayments,
        earningsWithMensMonthlyPayments,
        earningsWithWomensMonthlyPayments,
        earnings,
      };
    }),
}));
