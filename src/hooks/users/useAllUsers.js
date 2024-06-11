import { useEffect } from "react";

// Requests
import { getAllUsers } from "../../requests/users/useUsers";

// Zustand
import { useUsers } from "../../zustand/users/users";

export const useAllUsers = () => {
  const { hasAllUsers, allUsers, setAllUsers } = useUsers();

  useEffect(() => {
    const f = async () => {
      if (hasAllUsers) return;
      const users = await getAllUsers();
      if (users) setAllUsers(users);
    };
    f();
  }, []);

  return {};
};
