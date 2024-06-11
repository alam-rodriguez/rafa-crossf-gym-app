import React, { useEffect } from "react";

// Zod
import { zodResolver } from "@hookform/resolvers/zod";

// nextui
import { Input, Select, SelectItem, Button } from "@nextui-org/react";

// Zustand
import { userSelectedInfo } from "../zustand/users/users";
import { useForm, Controller } from "react-hook-form";

// Schema
import UpdateUser from "../schemas/updateUser";

// Request
import { updateInfoUser } from "../requests/users/useUsers";

// Hooks
import { useAlerts } from "../hooks/alerts/useAlerts";
import { useUserSelected } from "../hooks/users/useUserSelected";

const EditUser = () => {
  useUserSelected();

  const { userSelected, setUserSelected } = userSelectedInfo();
  useEffect(() => {
    console.log(userSelected);
  }, [userSelected]);

  const { waitingAlert, successAlert, errorAlert, questionAlert } = useAlerts();

  const {
    register,
    handleSubmit,
    watch,
    control,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(UpdateUser),
  });

  const generos = [
    { label: "Hombre", value: "hombre" },
    { label: "Mujer", value: "mujer" },
  ];

  const updateUser = async (data) => {
    console.log(userSelected);
    console.log(data);

    const want = await questionAlert("Quieres actualizar este usuario", "Quieres actualizar la informacion de este usuario, si aceptas se va a actualizar en la base de datos.", "Actualizar");
    if (!want) return;
    waitingAlert("Actualizando usuario...");
    const res = await updateInfoUser(userSelected.id, data);

    setTimeout(() => {
      if (res) {
        successAlert("Usuario actualizado", "la informacion del usuario ha sido actualizada correctamente.");
        setUserSelected({ ...userSelected, ...data });

        return;
      }
      errorAlert("Error", "Ha ocurrido un error al intentantar actualizar la informacion del usuario.");
    }, 5000);
  };

  if (userSelected.id == undefined) return <></>;
  return (
    <div className="">
      <p className="text-center text-xl">Editar cliente</p>

      <form onSubmit={handleSubmit(updateUser)} className="flex flex-col w-full gap-4 mt-5">
        <Controller
          render={({ field }) => (
            <>
              <Input type="text" label="Nombre" {...field} />
              {errors.name && <p className="text-xs text-red-700">{errors.name.message}</p>}
            </>
          )}
          control={control}
          name="name"
          defaultValue={userSelected.name}
        />
        <Controller render={({ field }) => <Input type="text" label="Telefono" {...field} />} control={control} name="number" defaultValue={userSelected.number} />
        <Controller render={({ field }) => <Input type="text" label="Direccion" {...field} />} control={control} name="address" defaultValue={userSelected.address} />
        <Controller render={({ field }) => <Input type="email" label="Email" {...field} />} control={control} name="email" defaultValue={userSelected.email} />
        <Controller
          render={({ field }) => (
            <div className="flex w-full flex-wrap md:flex-nowrap gap-4">
              <Select id="genre" {...field} value={field.value} label="Genero usuario" placeholder="Selecciona un genero" className="max-w-xs" defaultSelectedKeys={[userSelected.genre]}>
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
          defaultValue={userSelected.genre}
        />
        <div className="flex justify-end">
          <Button type="submit" color="primary">
            Actualizar usuario
          </Button>
        </div>
      </form>
    </div>
  );
};

export default EditUser;
