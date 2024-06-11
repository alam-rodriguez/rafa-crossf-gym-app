import { useEffect } from "react";

// Request
import { getUserActives } from "../../requests/users/useUsers";

// Zustand
import { useUsers } from "../../zustand/users/users";

export const useUserActives = () => {
  const { hasUsersActives, setUsersActives } = useUsers();

  useEffect(() => {
    const f = async () => {
      if (hasUsersActives) return;
      const users = await getUserActives();
      users.sort((a, b) => a.paymentUpTo - b.paymentUpTo);
      if (users) setUsersActives(users);
    };
    f();
  }, []);

  return;
};
