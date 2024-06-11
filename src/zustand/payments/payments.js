import { create } from "zustand";

export const zusPayments = create((set) => ({
  payments: [],
  hasPayments: false,
  setPayments: (payments) => set(() => ({ payments: payments, hasPayments: true })),
  paymentsUserSelected: [],
  setPaymentsUserSelected: (payments) => set(() => ({ paymentsUserSelected: payments })),
  addPaymentUserSelected: (payment) => set((state) => ({ paymentsUserSelected: [...state.paymentsUserSelected, payment] })),
}));
