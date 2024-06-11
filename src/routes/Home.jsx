import React, { useEffect } from "react";

// Components
import TablaUsers from "../components/clientes/TablaUsers";

import { Icon } from "@iconify/react";
import SettingIcon from "../components/home/SettingIcon";
import { useUsers } from "../zustand/users/users";

const users_ = [
  // {
  //   id: "6bf4b65a-3739-4268-8f86-be0e18b0704d",
  //   nombre: "Alam Rodriguez",
  //   telefono: "8283198834",
  //   direccion: "San antonio de guerra",
  //   email: "Alamrd2016@gmail.com",
  //   genero: "hombre",
  //   estado: "activo",
  //   fechaUserCreatedInMilliseconds: 1712242619504,
  //   fechaInText: "4/4/2024",
  //   fechasDePago: [],
  // },
  {
    address: "San Antonio De Guerra Calle General José Amador",
    email: "alamrd2016@gmail.com",
    genre: "hombre",
    id: "a89a6976-e12e-4a90-b192-b51d9f3bf11a",
    name: "Alam",
    number: "8293198834",
    state: "Active",
    userCreatedDate: 1715011187364,
  },
];
const Home = () => {
  const { users, setUsers } = useUsers();

  useEffect(() => {
    setUsers([
      {
        address: "San Antonio De Guerra Calle General José Amador",
        email: "alamrd2016@gmail.com",
        genre: "hombre",
        id: "a89a6976-e12e-4a90-b192-b51d9f3bf11a",
        name: "Alam",
        number: "8293198834",
        state: "Active",
        userCreatedDate: 1715011187364,
      },
    ]);
  }, []);

  // useEffect(() => {
  //   const fechaActual = new Date();
  //   console.log(fechaActual)
  //   console.log(users)
  //   users.forEach((user) => {
  //     const fechaUserWasCreated = new Date(user.fechaUserCreatedInMilliseconds)
  //     let diferenciaAnios = fechaActual.getFullYear() - fechaUserWasCreated.getFullYear()
  //     let diferenciaMeses = fechaActual.getMonth() - fechaUserWasCreated.getMonth()
  //     let diferenciaDias = fechaActual.getDate() - fechaUserWasCreated.getDate()

  //     console.log(diferenciaAnios)
  //     console.log(diferenciaMeses)
  //     console.log(diferenciaDias)
  //     // if(fechaUserCreatedInMilliseconds)

  //   })

  // }, []);

  return (
    <div className="">
      <p className="text-center mt-10 text-xl">Lista de clientes que no han pagado</p>
      <div className="mt-5">
        <TablaUsers users={users} />
      </div>

      <SettingIcon />
    </div>
  );
};

export default Home;
