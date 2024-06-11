import React, { useEffect } from "react";

import { useNavigate } from "react-router-dom";
import { Table, TableHeader, TableColumn, TableBody, TableRow, TableCell } from "@nextui-org/react";
import { userSelectedInfo } from "../../zustand/users/users";

const TablaUsers = ({ users, payments }) => {
  const { setUserSelected } = userSelectedInfo();

  const navigate = useNavigate();

  useEffect(() => {
    console.log(users);
  }, []);

  const userClick = (user) => {
    console.log(user);
    setUserSelected(user);
    navigate(`/user/${user.id}`);
  };

  const calcularDiferenciaEntreFechas = (fecha1, fecha2) => {
    let anios = fecha2.getFullYear() - fecha1.getFullYear();
    let meses = fecha2.getMonth() - fecha1.getMonth();
    let dias = fecha2.getDate() - fecha1.getDate();

    if (dias < 0) {
      meses--;
      const mesAnterior = new Date(fecha2.getFullYear(), fecha2.getMonth(), 0);
      dias += mesAnterior.getDate();
    }
    if (meses < 0) {
      anios--;
      meses += 12;
    }
    const diferencia = `${anios > 0 ? `${anios} años` : ""} ${meses > 0 ? `${meses} meses` : ""} ${dias > 0 ? `${dias} días` : ""}`;
    return {
      anios,
      meses,
      dias,
      diferencia,
    };
  };

  return (
    <Table aria-label="Example static collection table">
      <TableHeader>
        <TableColumn>NOMBRE</TableColumn>
        <TableColumn>TELEFONO</TableColumn>
        <TableColumn>ESTADO</TableColumn>
        <TableColumn>PROXIMO PAGO EN</TableColumn>
      </TableHeader>
      <TableBody>
        {users.map((user) => {
          const fecha1 = new Date();
          // const fecha1 = new Date("2024-9-10");
          const fecha2 = new Date(user.paymentUpTo);

          const { anios, meses, dias, diferencia } = calcularDiferenciaEntreFechas(fecha1, fecha2);
          let textToRender = diferencia;

          if (anios == 0 && meses == 0 && dias == 0) {
            textToRender = "Debe pagar hoy";
          }
          if (anios < 0 || meses < 0 || dias < 0) {
            const { diferencia } = calcularDiferenciaEntreFechas(fecha2, fecha1);
            textToRender = `Tiene ${diferencia} de atraso`;
          }

          const textMustBeRed = textToRender.startsWith("Debe") || textToRender.startsWith("Tiene");

          return (
            <TableRow key={user.id} onClick={() => userClick(user)}>
              <TableCell>{user.name}</TableCell>
              <TableCell>{user.number.length > 0 ? user.number : "000-000-0000"}</TableCell>
              <TableCell>{user.state == "Active" ? <span className="text-green-700">Activo</span> : <span className="text-red-700">No activo</span>}</TableCell>
              <TableCell>
                <span className={`${textMustBeRed ? "bg-red-800 text-white rounded p-1" : ""}`}>{textToRender}</span>
              </TableCell>
            </TableRow>
          );
        })}
      </TableBody>
    </Table>
  );
};

export default TablaUsers;
