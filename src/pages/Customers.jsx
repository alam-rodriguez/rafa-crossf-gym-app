import React, { Children, useEffect, useState } from "react";
import { Table, TableHeader, TableColumn, TableBody, TableRow, TableCell, Select, SelectItem, Input, Button } from "@nextui-org/react";
import { filtrosUsers } from "../zustand/app/filtros";

import SelectPersonal from "../components/clientes/SelectPersonal";
import { getAllUsers } from "../requests/users/useUsers";
import { useUsers } from "../zustand/users/users";
import TablaUsers from "../components/clientes/TablaUsers";
import { Controller, useForm } from "react-hook-form";
import { useAllUsers } from "../hooks/users/useAllUsers";

const Customers = () => {
  const { agruparPor, setAgruparPor, tiempo, setTiempo, genero, setGenero, estado, setEstado } = filtrosUsers();

  useAllUsers();
  const { allUsers } = useUsers();

  // const { hasAllUsers, allUsers, setAllUsers } = useUsers();

  // useEffect(() => {
  //   const f = async () => {
  //     if (hasAllUsers) return;
  //     const users = await getAllUsers();
  //     if (users) setAllUsers(users);
  //   };
  //   f();
  // }, []);

  const {
    register,
    handleSubmit,
    watch,
    control,
    formState: { errors },
  } = useForm({
    // resolver: zodResolver(User),
  });

  const [filteredUsers, setFilteredUsers] = useState([]);

  useEffect(() => {
    setFilteredUsers(allUsers);
  }, [allUsers]);

  useEffect(() => {
    console.log(watch("groupBy"));
    if (watch("groupBy") == "Tiempo registrado") {
      if (watch("time") == "usuarios mas nuevos") {
        const usersUpdate = [...allUsers];
        usersUpdate.sort((a, b) => b.userCreatedDate - a.userCreatedDate);
        setFilteredUsers(usersUpdate);
        console.log(watch("time"));
      }
      if (watch("time") == "usuarios mas antiguos") {
        const usersUpdate = [...allUsers];
        usersUpdate.sort((a, b) => a.userCreatedDate - b.userCreatedDate);
        setFilteredUsers(usersUpdate);
        console.log(watch("time"));
      }
    }
    if (watch("groupBy") == "Genero") {
      const newUsers = allUsers.filter((user) => {
        if (watch("genre") == "Genero masculino") return user.genre == "hombre";
        return user.genre == "mujer";
      });
      setFilteredUsers(newUsers);
    }
    if (watch("groupBy") == "Estado") {
      const newUsers = allUsers.filter((user) => {
        if (watch("state") == "Activos") return user.state == "Active";
        return user.state == "Inactive";
      });
      setFilteredUsers(newUsers);
    }
  }, [watch("time"), watch("genre"), watch("state")]);

  const handleClickBuscar = () => {
    console.log(allUsers);
    const newUsers = allUsers.filter((user) => {
      return (
        user.name.toLowerCase().includes(watch("nombre").toLowerCase()) ||
        user.number.toLowerCase().includes(watch("nombre").toLowerCase()) ||
        user.email.toLowerCase().includes(watch("nombre").toLowerCase()) ||
        user.address.toLowerCase().includes(watch("nombre").toLowerCase())
      );
    });
    setFilteredUsers(newUsers);
  };

  return (
    <div>
      <div>
        <p className="text-center mt-10- mb-4 text-xl">Lista de todos los clientes</p>
        <div className="flex flex-row gap-5 justify-center">
          <Controller
            name="groupBy"
            control={control}
            defaultValue=""
            render={({ field }) => (
              <Select label="Agrupar por" placeholder={""} className="max-w-xs" {...field}>
                {["Nombres", "Tiempo registrado", "Genero", "Estado"].map((item) => (
                  <SelectItem key={item} value={item}>
                    {item}
                  </SelectItem>
                ))}
              </Select>
            )}
          />
          {/* <SelectPersonal
            value={agruparPor}
            label="Agrupar por"
            placeholder=""
            handleChange={setAgruparPor}
            items={[
              { label: "Nombres", value: "nombres" },
              { label: "Tiempo registrado", value: "tiempo" },
              { label: "Genero", value: "genero" },
              { label: "Estado", value: "estado" },
            ]}
          /> */}

          {watch("groupBy") == "" ? (
            <></>
          ) : watch("groupBy") == "Nombres" ? (
            <Input type="text" label="Nombre" {...register("nombre")} />
          ) : watch("groupBy") == "Tiempo registrado" ? (
            <Controller
              name="time"
              control={control}
              render={({ field }) => (
                <Select label="Agrupar por" placeholder={""} className="max-w-xs" {...field}>
                  {["usuarios mas nuevos", "usuarios mas antiguos"].map((item) => (
                    <SelectItem key={item} value={item}>
                      {item}
                    </SelectItem>
                  ))}
                </Select>
              )}
            />
          ) : watch("groupBy") == "Genero" ? (
            <Controller
              name="genre"
              control={control}
              render={({ field }) => (
                <Select label="Agrupar por" placeholder={""} className="max-w-xs" {...field}>
                  {["Genero masculino", "Genero femenino"].map((item) => (
                    <SelectItem key={item} value={item}>
                      {item}
                    </SelectItem>
                  ))}
                </Select>
              )}
            />
          ) : watch("groupBy") == "Estado" ? (
            <Controller
              name="state"
              control={control}
              render={({ field }) => (
                <Select label="Agrupar por" placeholder={""} className="max-w-xs" {...field}>
                  {["Activos", "Inactivos"].map((item) => (
                    <SelectItem key={item} value={item}>
                      {item}
                    </SelectItem>
                  ))}
                </Select>
              )}
            />
          ) : (
            <></>
          )}
        </div>
        {watch("groupBy") == "Nombres" ? (
          <div className="flex justify-center mt-5">
            <Button color="primary" onClick={handleClickBuscar}>
              Buscar
            </Button>
          </div>
        ) : (
          <></>
        )}

        {/* <div className="flex w-full flex-wrap md:flex-nowrap gap-4">
          <Select
            value={agruparPor}
            label="Agrupar por"
            placeholder=""
            className="max-w-xs" 
            onChange={setAgruparPor}
          >
            {generos.map((genero) => (
              <SelectItem key={genero.value} value={genero.value}>
                {genero.label}
              </SelectItem>
            ))}
          </Select>
        </div> */}
      </div>

      <div className="mt-5">
        <div className="mt-5">
          <TablaUsers users={filteredUsers} />
        </div>
        {/* <Table aria-label="Example static collection table">
          <TableHeader>
            <TableColumn>NOMBRE</TableColumn>
            <TableColumn>TELEFONO</TableColumn>
            <TableColumn>ESTADO</TableColumn>
            <TableColumn>PROXIMO PAGO EN</TableColumn>
          </TableHeader>
          <TableBody>
            <TableRow key="1">
              <TableCell>Tony Reichert</TableCell>
              <TableCell>8293198834</TableCell>
              <TableCell>Activo</TableCell>
              <TableCell>5 DIAS</TableCell>
            </TableRow>
          </TableBody>
        </Table> */}
      </div>
    </div>
  );
};

export default Customers;
