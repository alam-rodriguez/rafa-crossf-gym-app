import React, { useEffect, useState } from "react";

import { Input, Spinner } from "@nextui-org/react";
import { Select, SelectSection, SelectItem, Button } from "@nextui-org/react";

// Zustand
import { infoNewUser } from "../zustand/users/users";
import { useForm, Controller } from "react-hook-form";

import moduleName from "module";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import User from "../schemas/user";
import { data } from "autoprefixer";
import { settingsApp } from "../zustand/app/settings";

import { createUser } from "../requests/users/useUsers";
import { useUserPaymentUpTo } from "../hooks/users/useUserPaymentUpTo";

import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import { useAlerts } from "../hooks/alerts/useAlerts";

const MySwal = withReactContent(Swal);

const NewUser = () => {
  const { waitingAlert, createUserAlert, successAlert, errorAlert } = useAlerts();
  const { appSettings } = settingsApp();

  const { setUserPaymentUpTo } = useUserPaymentUpTo();

  const {
    register,
    handleSubmit,
    watch,
    control,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(User),
  });

  useEffect(() => {
    // if (appSettings.registrationPrice == undefined) return;
    // console.log(appSettings.registrationPrice);
    // User.parse({ registrationPricePaid: appSettings.registrationPrice });
    console.log(User);
  }, [User]);

  // const { nombre, setNombre, telefono, setTelefono, direccion, setDireccion, email, setEmail, genero, setGenero } = infoNewUser();

  const generos = [
    { label: "Hombre", value: "hombre" },
    { label: "Mujer", value: "mujer" },
  ];

  const [statusPage, setStatusPage] = useState("");

  const createNewUser = async (data) => {
    // waitingAlert();
    // return;
    const want = await createUserAlert();
    if (!want) return;
    setStatusPage("creating");
    waitingAlert();

    data.registrationPricePaid = appSettings.registrationPrice;
    data.paymentUpTo = setUserPaymentUpTo();
    console.log(data);

    const res = await createUser(data);

    if (res) {
      successAlert();
      setStatusPage("created");
      return;
    }
    errorAlert();
    return;

    return;
    const fecha = new Date();

    const fechaUserCreatedInMilliseconds = fecha.getTime();
    const fechaInText = fecha.toLocaleDateString();

    const newUser = {
      id: uuidv4(),
      nombre,
      telefono,
      direccion,
      email,
      genero,
      estado: "activo",
      fechaUserCreatedInMilliseconds,
      fechaInText,
      fechasDePago: [],
    };
    console.log(newUser);
  };

  return (
    <div className="">
      <p className="text-center text-xl">Crear nuevo cliente</p>

      {/* <div className="flex w-full flex-wrap md:flex-nowrap gap-4"> */}
      <form onSubmit={handleSubmit(createNewUser)} className="flex flex-col w-full gap-4 mt-5">
        {/* <Spinner /> */}
        <Controller
          render={({ field }) => (
            <>
              <Input type="text" label="Nombre" {...field} />
              {errors.name && <p className="text-xs text-red-700">{errors.name.message}</p>}
            </>
          )}
          control={control}
          name="name"
          defaultValue=""
        />
        <Controller render={({ field }) => <Input type="text" label="Telefono" {...field} />} control={control} name="number" defaultValue="" />
        <Controller render={({ field }) => <Input type="text" label="Direccion" {...field} />} control={control} name="address" defaultValue="" />

        <Controller render={({ field }) => <Input type="email" label="Email" {...field} />} control={control} name="email" defaultValue="" />

        <Controller
          render={({ field }) => (
            <div className="flex w-full flex-wrap md:flex-nowrap gap-4">
              <Select {...field} label="Genero usuario" placeholder="Selecciona un genero" className="max-w-xs">
                {generos.map((genero) => (
                  <SelectItem key={genero.value} value={genero.value}>
                    {genero.label}
                  </SelectItem>
                ))}
              </Select>
              {errors.genre && <p className="text-xs text-red-700">{errors.genre.message}</p>}
            </div>
          )}
          control={control}
          name="genre"
          defaultValue=""
        />

        <div className="flex justify-end">
          {statusPage == "" ? (
            <Button type="submit" color="primary">
              Registrar usuario
            </Button>
          ) : statusPage == "creating" ? (
            <Button type="button" color="primary">
              Registrando usuario
            </Button>
          ) : statusPage == "created" ? (
            <Button type="button" color="primary" onClick={() => window.location.reload()}>
              Registrar nuevo usuario
            </Button>
          ) : (
            <></>
          )}
          {/* <Button type="submit" color="primary">
            Button
          </Button> */}
        </div>
      </form>
    </div>
  );
};

export default NewUser;

// import React from 'react'

const Cargando = () => {
  return <Spinner />;
};

// export default NewUser
