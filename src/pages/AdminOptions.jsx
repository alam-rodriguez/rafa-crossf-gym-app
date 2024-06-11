import React from "react";

// nextui
import { Button } from "@nextui-org/react";

// ReactRouter
import { useNavigate } from "react-router-dom";

const AdminOptions = () => {
  const navigate = useNavigate();

  return (
    <div className="flex justify-around">
      <Button className="" color="primary" onClick={() => navigate("/settigns")}>
        Ajustes
      </Button>
      <Button className="" color="primary" onClick={() => navigate("/statistics")}>
        Estadisticas
      </Button>
      {/* <Button color="primary">Estadisticas por usuarios</Button>
      <Button color="primary">Estadisticas por incripciones</Button>
      <Button color="primary">Estadisticas por mensualidad</Button>
      <Button color="primary">Estadisticas totales</Button> */}
    </div>
  );
};

export default AdminOptions;
