import React from "react";

// Components
import TablaUsers from "../components/clientes/TablaUsers";
import SettingIcon from "../components/home/SettingIcon";

// Hook
import { useUserActives } from "../hooks/users/useUserActives";

// Zustand
import { useUsers } from "../zustand/users/users";
import { zusPayments } from "../zustand/payments/payments";

const Home = () => {
  useUserActives();
  const { usersActives } = useUsers();

  const { payments } = zusPayments();

  return (
    <div className="">
      <p className="text-center mt-10-  text-xl">Lista de clientes que no han pagado</p>
      <div className="mt-5">
        <TablaUsers users={usersActives} payments={payments} />
      </div>
      <SettingIcon />
    </div>
  );
};

export default Home;
