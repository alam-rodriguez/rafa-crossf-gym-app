// Swal
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

// nextui
import { Spinner } from "@nextui-org/react";

export const useAlerts = () => {
  const MySwal = withReactContent(Swal);

  const waitingAlert = (title = "Cargando...") => {
    MySwal.fire({
      title: title,
      html: <Spinner className="h-12" />,
      showConfirmButton: false,
      allowOutsideClick: false,
      allowEscapeKey: false,
      allowEnterKey: false,
    });
  };

  const createUserAlert = async () => {
    const want = await MySwal.fire({
      title: "Quieres registrar este usuario?",
      text: "Este usuario se registrara en la base de datos permanentemente",
      icon: "question",
      showCancelButton: true,
      confirmButtonText: "Registrar",
      cancelButtonText: "Cancelar",
    });
    return want.isConfirmed;
  };

  const questionAlert = async (title = "Quieres registrar este usuario?", text = "Este usuario se registrara en la base de datos permanentemente", confirmButtonText = "Registrar") => {
    const want = await MySwal.fire({
      title: title,
      text: text,
      icon: "question",
      showCancelButton: true,
      confirmButtonText: confirmButtonText,
      cancelButtonText: "Cancelar",
    });
    return want.isConfirmed;
  };

  const successAlert = (title = "Usuario registrado", text = "El nuevo usuario ha sido registrado correctamente") =>
    MySwal.fire({
      title: title,
      text: text,
      icon: "success",
    });

  const errorAlert = (title = "Error", text = "Ha ocurrido un error al intentar registrar al usuario, intentelo de nuevo.") =>
    MySwal.fire({
      title: title,
      text: text,
      icon: "error",
    });

  return { waitingAlert, createUserAlert, successAlert, errorAlert, questionAlert };
};
