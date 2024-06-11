import React, { useEffect } from "react";

// Nextui
import { Select, SelectSection, SelectItem, Button, Input } from "@nextui-org/react";

// Zustand
import { settingsApp } from "../zustand/app/settings";

import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import SettingsSchema from "../schemas/settings";
import { updateSettings } from "../requests/settigns/useSettings";

const Settings = () => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
    control,
  } = useForm({ resolver: zodResolver(SettingsSchema) });

  const onSubmit = (data) => {
    console.log(data);
    setAppSettings(data);
    updateSettings(data);
  };

  const { hasAppSettings, appSettings, setAppSettings } = settingsApp();

  // useEffect(() => {
  //   console.log(appSettings);
  // }, [appSettings]);

  if (!hasAppSettings) return <></>;

  return (
    <div className="">
      <form className="flex flex-col items-center w-full gap-4 mt-16" onSubmit={handleSubmit(onSubmit)}>
        <Controller
          defaultValue={appSettings.nameApp}
          control={control}
          name="nameApp"
          render={({ field }) => (
            <>
              <Input type="text" label="Nombre de la app" {...field} />
              {errors.nameApp && <p className="text-xs text-red-700">{errors.nameApp.message}</p>}
            </>
          )}
        />

        <Controller
          defaultValue={appSettings.registrationPrice}
          render={({ field }) => <Input type="number" label="Precio inscripcion" {...field} onChange={(e) => field.onChange(e.target.valueAsNumber)} />}
          name="registrationPrice"
          control={control}
        />
        <Controller
          defaultValue={appSettings.monthlyPrice}
          render={({ field }) => <Input type="number" label="Precio inscripcion" {...field} onChange={(e) => field.onChange(e.target.valueAsNumber)} />}
          name="monthlyPrice"
          control={control}
        />

        <div className="flex justify-end">
          <Button type="submit" color="primary">
            Guardar cambios
          </Button>
        </div>
      </form>
    </div>
  );
};

export default Settings;
