import { useEffect } from "react";

// resquest
import { getPayments } from "../../requests/payments/usePayments";

// Zustans
import { zusPayments } from "../../zustand/payments/payments";

export const usePayments = () => {
  const { hasPayments, setPayments } = zusPayments();
  useEffect(() => {
    if (hasPayments) return;
    const f = async () => {
      const res = await getPayments();
      if (res) setPayments(res);
    };
    f();
  }, []);

  return;
};
