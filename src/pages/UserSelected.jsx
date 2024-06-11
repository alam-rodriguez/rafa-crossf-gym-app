import React, { useEffect, useState } from "react";

import { useUsers, userSelectedInfo } from "../zustand/users/users";

import { Button } from "@nextui-org/react";
import { changeUserPaymentUpTo, getUserById, setUserState } from "../requests/users/useUsers";
import { useNavigate, useParams } from "react-router-dom";

import { v4 as uuid } from "uuid";
import { addPayment, deletePayment, getPaymentsById } from "../requests/payments/usePayments";
import { zusPayments } from "../zustand/payments/payments";

// Hooks
import { useUserSelected } from "../hooks/users/useUserSelected";
import { useUserPaymentUpTo } from "../hooks/users/useUserPaymentUpTo";
import { useAlerts } from "../hooks/alerts/useAlerts";
import SecondHeader from "../components/home/SecondHeader";
import { settingsApp } from "../zustand/app/settings";

const UserSelected = () => {
  const { meses, setMeses, sonDelMismoMes, obtenerPrimerDiaProximoMes, verificarCoincidenciaMesAnio, calcMeses } = useUserSelected();
  const { userSelected, setUserSelected, setUserSelectedDatePaymentUpto } = userSelectedInfo();

  const { setUserPaymentUpTo } = useUserPaymentUpTo();

  const { appSettings } = settingsApp();

  const { waitingAlert, createUserAlert, successAlert, errorAlert, questionAlert } = useAlerts();

  // let { id } = useParams();

  // useEffect(() => {
  //   if (userSelected.id != undefined) return;
  //   const f = async () => {
  //     const user = await getUserById(id);
  //     if (user) setUserSelected(user);
  //   };
  //   f();
  // }, []);

  const { hasPayments, payments, paymentsUserSelected, setPaymentsUserSelected, addPaymentUserSelected } = zusPayments();

  // useEffect(() => {
  //   if (hasPayments) {
  //     const paymentsUser = payments.filter((payment) => payment.user_id == id);
  //     setPaymentsUserSelected(paymentsUser);
  //     console.log(paymentsUser);
  //     return;
  //   }
  //   const f = async () => {
  //     const res = await getPaymentsById(id);
  //     console.log(res);
  //     if (res) setPaymentsUserSelected(res);
  //   };
  //   f();
  // }, []);

  const { paymentsList, addPaymentsList } = useUsers();

  const navigate = useNavigate();

  // const [meses, setMeses] = useState([]);

  // const [userPayments, setUserPayments] = useState([]);

  // useEffect(() => {
  //   if (userSelected.id == undefined) return;

  //   // console.log(paymentsList.filter((paymentItem) => paymentItem.userId == userSelected.id));
  //   // setUserPayments(paymentsList.filter((paymentItem) => paymentItem.userId == userSelected.id));

  //   // console.log(userSelected);
  //   // const fecha = new Date(userSelected.userCreatedDate);
  //   // console.log(fecha.toLocaleDateString());

  //   function mesesYAniosEntreFechas(fechaInicio, fechaFin) {
  //     var mesesYAnios = [];
  //     var fechaInicioObj = new Date(fechaInicio);
  //     var fechaFinObj = new Date(fechaFin);

  //     // Iterar desde la fecha de inicio hasta la fecha de fin
  //     var iterador = new Date(fechaInicioObj);
  //     while (iterador <= fechaFinObj) {
  //       var mesNumber = iterador.getMonth();
  //       console.log(mesNumber);
  //       var mes = iterador.toLocaleDateString("default", { month: "long" }); // Obtener el nombre del mes
  //       var anio = iterador.getFullYear(); // Obtener el año
  //       mesesYAnios.push({ mes: mes, anio: anio, mesNumber: mesNumber });
  //       iterador.setMonth(iterador.getMonth() + 1); // Avanzar al siguiente mes
  //     }

  //     return mesesYAnios;
  //   }

  //   // Ejemplo de uso:

  //   var fechaInicioMilisegundos = userSelected.userCreatedDate; // Milisegundos correspondientes a 01/01/2022
  //   var fechaFinMilisegundos = new Date().getTime(); // Milisegundos correspondientes a 06/05/2024

  //   // console.log("Los meses entre las fechas son: ");
  //   // listaMesesYAnios.forEach(function (mesAnio) {
  //   //   console.log(mesAnio.mes + " " + mesAnio.anio);
  //   // });
  //   const paymensDate = paymentsUserSelected.map((payment) => payment.paymentDate);
  //   const maxDate = Math.max(...paymensDate, fechaFinMilisegundos);
  //   console.log(paymensDate);
  //   console.log(fechaFinMilisegundos);
  //   console.log(maxDate);
  //   console.log(paymentsUserSelected);
  //   console.log("------------------");
  //   const ff = new Date(maxDate);
  //   console.log(ff);
  //   var listaMesesYAnios = mesesYAniosEntreFechas(fechaInicioMilisegundos, maxDate);
  //   console.log(listaMesesYAnios);
  //   setMeses(listaMesesYAnios);

  //   // function diferenciaMeses(fechaInicio, fechaFin) {
  //   //   var fechaInicioObj = new Date(fechaInicio);
  //   //   var fechaFinObj = new Date(fechaFin);

  //   //   var dif = (fechaFinObj.getFullYear() - fechaInicioObj.getFullYear()) * 12;
  //   //   dif -= fechaInicioObj.getMonth() + 1;
  //   //   dif += fechaFinObj.getMonth();
  //   //   return dif <= 0 ? 0 : dif;
  //   // }

  //   // // Ejemplo de uso:
  //   // var fechaInicioMilisegundos = userSelected.userCreatedDate; // Milisegundos correspondientes a 01/01/2022
  //   // var fechaFinMilisegundos = new Date().getTime(); // Milisegundos correspondientes a 06/05/2024

  //   // var mesesDiferencia = diferenciaMeses(fechaInicioMilisegundos, fechaFinMilisegundos);
  //   // console.log("La diferencia en meses es: " + mesesDiferencia);
  // }, [userSelected, paymentsUserSelected]);

  // const handleClickPagar = async (date = new Date().getTime()) => {
  const handleClickPagar = async (date) => {
    // waitingAlert, questionAlert, successAlert, errorAlert;

    console.log(date);
    const fechaDeAhora = new Date().getTime();

    // return;
    const want = await questionAlert("Realizar pago", "Realmente deseas realizar el pago?, si lo haces se añadira el pago a la base de datos.", "Relizar pago");
    if (!want) return;

    // return;
    // return;
    // console.log(date);
    // console.log(new Date(date));

    // return;
    const paymensDate = paymentsUserSelected.map((payment) => payment.paymentDate);
    // if();
    const maxDate = Math.max(...paymensDate, date != undefined ? date : fechaDeAhora);

    console.log(...paymensDate);
    console.log(maxDate);
    console.log(new Date(maxDate));

    const datePayment = obtenerPrimerDiaProximoMes(maxDate);
    const nextDatePaymentUpTo = obtenerPrimerDiaProximoMes(datePayment);
    // const datePayment = setUserPaymentUpTo(date);
    // console.log(date);
    // console.log(datePayment);
    console.log(new Date(date));
    console.log(new Date(nextDatePaymentUpTo));

    // return;

    // return;

    // if (false) {
    //   console.log(first);
    //   return;
    // }

    // const sonDelMismoMes = (fecha1, fecha2) => {
    //   const date1 = new Date(fecha1);
    //   const date2 = new Date(fecha2);

    //   const anio1 = date1.getFullYear();
    //   const mes1 = date1.getMonth();

    //   const anio2 = date2.getFullYear();
    //   const mes2 = date2.getMonth();

    //   return anio1 === anio2 && mes1 === mes2;
    // };

    // return;
    const res = sonDelMismoMes(date != undefined ? date : fechaDeAhora, userSelected.userCreatedDate);

    let dateIsInPayment = false;
    paymentsUserSelected.forEach((paymentUser) => {
      const res = sonDelMismoMes(date != undefined ? date : fechaDeAhora, paymentUser.paymentDate);
      if (res) {
        dateIsInPayment = true;
        return;
      }
    });

    // function obtenerPrimerDiaProximoMes(fecha) {
    //   // Convertir la entrada a un objeto Date
    //   const date = new Date(fecha);

    //   // Obtener el mes y el año actuales
    //   const day = date.getDate();
    //   const month = date.getMonth();
    //   const year = date.getFullYear();

    //   // Crear una nueva fecha para el primer día del próximo mes
    //   const primerDiaProximoMes = new Date(year, month + 1, day);

    //   if (primerDiaProximoMes.getMonth() !== (month + 1) % 12) {
    //     primerDiaProximoMes.setDate(0); // Esto ajusta la fecha al último día del mes anterior
    //   }

    //   return primerDiaProximoMes.getTime();
    // }

    if (res || dateIsInPayment) {
      const want = await questionAlert("Realizar pago adelantado", "El mes actual esta pagado, pero el usuario puede pago por adelantado.", "Relizar pago adelantado");
      if (!want) return;
      // alert("Ya este mes esta pagado");
      // const userWant = confirm("Deseas pagar el proximo mes ?");

      // const paymensDate = paymentsUserSelected.map((payment) => payment.paymentDate);
      // const maxDate = Math.max(...paymensDate, date);
      // var listaMesesYAnios = mesesYAniosEntreFechas(fechaInicioMilisegundos, fechaFinMilisegundos);

      console.log(paymentsUserSelected);
      console.log(paymensDate);
      console.log(date);
      // console.log(maxDate);
      // const datePayment = obtenerPrimerDiaProximoMes(date);
      // console.log(userWant);
      if (!want) {
        return;
      }
      // if (userWant) {
      //   console.log(date);

      //   const paymentInfo = {
      //     id: uuid(),
      //     user_id: userSelected.id,
      //     paymentAmount: 0,
      //     paymentDate: datePayment,
      //     paymentMethod: "efectivo",
      //   };
      //   await addPayment(paymentInfo);
      //   addPaymentUserSelected(paymentInfo);
      //   addPaymentsList(paymentInfo);

      //   const datesPaymentsUser = paymentsUserSelected.map((payment) => payment.paymentDate);
      //   datesPaymentsUser.push(datePayment);
      //   const maxDate = Math.max(...datesPaymentsUser);
      //   // const fechaAdelantada = setUserPaymentUpTo(maxDate);
      //   await changeUserPaymentUpTo(userSelected.id, nextDatePaymentUpTo);

      //   console.log(paymentInfo);
      //   setMeses([]);

      // return;
      // }
    }
    waitingAlert("Realizando pago...");

    // console.log(paymentsUserSelected);
    // return;

    console.log(paymentsList.length);
    const paymentInfo = {
      id: uuid(),
      user_id: userSelected.id,
      paymentAmount: appSettings.monthlyPrice,
      paymentDate: date != undefined ? date : datePayment,
      paymentMethod: "efectivo",
    };

    addPaymentUserSelected(paymentInfo);

    const resPayment = await addPayment(paymentInfo);

    // const datesPaymentsUser = paymentsUserSelected.map((payment) => payment.paymentDate);
    // datesPaymentsUser.push(date);
    // const maxDate = Math.max(...datesPaymentsUser);
    // const fechaAdelantada = setUserPaymentUpTo(maxDate);
    let resUser = true;
    if (date == undefined) resUser = await changeUserPaymentUpTo(userSelected.id, nextDatePaymentUpTo);

    addPaymentsList(paymentInfo);

    console.log(paymentInfo);
    // setUserSelected({});
    // setMeses([]);
    // setUserSelectedDatePaymentUpto(nextDatePaymentUpTo);

    if (resPayment && resUser) await successAlert("pago realizado exitosamente", "El pago se ha realizado exitosamente y se ha agregada a la base de datos");
    else errorAlert("Error", "Ha ocurrido un error al intentar realizar el pago de este usuario");

    window.location.reload();
    // calcMeses(nextDatePaymentUpTo);

    return;
    const newUserInfo = { ...userSelected };
    const fechaActual = new Date().getTime();
    console.log(fechaActual);
    newUserInfo.fechasDePago = [...newUserInfo.fechasDePago, fechaActual];
    newUserInfo.mesesPagados = {
      mes: new Date().toLocaleDateString(),
      pagado: true,
    };

    console.log(newUserInfo);
  };

  // function verificarCoincidenciaMesAnio(fecha1, fecha2) {
  //   console.log(fecha1);
  //   console.log(fecha2);
  //   // Obtener el mes y el año de la primera fecha
  //   var mesFecha1 = fecha1.getMonth();
  //   var anioFecha1 = fecha1.getFullYear();

  //   console.log(mesFecha1);

  //   console.log(fecha2);

  //   let itsPaid = false;

  //   const f = fecha2.forEach((fecha) => {
  //     // Obtener el mes y el año de la segunda fecha
  //     var mesFecha2 = fecha.getMonth();
  //     var anioFecha2 = fecha.getFullYear();

  //     // Verificar si el mes y el año coinciden
  //     console.log(mesFecha1);
  //     console.log(anioFecha1);
  //     console.log("-------");
  //     console.log(mesFecha2);
  //     console.log(anioFecha2);
  //     if (mesFecha1 === mesFecha2 && anioFecha1 === anioFecha2) {
  //       itsPaid = true;
  //       console.log("first");
  //       // return true;
  //     }
  //   });

  //   return itsPaid;
  // }

  const marcarComoInactivo = async (newState) => {
    // waitingAlert, createUserAlert, successAlert, errorAlert;
    // TODO:
    const want = await questionAlert("Marcar usuario", "Estas seguro que quieres cambiar el estado del usuario ?", "Marcar");
    if (!want) return;
    waitingAlert("Cambiando el estado del usuario...");

    const res = await setUserState(userSelected.id, newState);
    console.log(res);
    if (res) await successAlert("Estado de usuario cambiado", "");
    else await errorAlert("Ha ocurrido un error", "");
    console.log(res);
    console.log(userSelected.id);
    window.location.reload();
  };

  const reembolsarMes = async (mes, anio) => {
    // waitingAlert, createUserAlert, successAlert, errorAlert, questionAlert;
    const want = await questionAlert("Reembolsar mes", "Estas seguro de que quieres reembolsar este mes, se eliminara el registro de la base de datos.", "Reembolsar");
    if (!want) return;
    waitingAlert("Reembolsando...");
    const fecha = new Date(anio, mes).getTime();

    console.log(new Date(fecha).toDateString());
    // return;

    let paymentId = false;

    console.log(paymentsUserSelected);
    paymentsUserSelected.forEach((paymentUser) => {
      const res = sonDelMismoMes(fecha, paymentUser.paymentDate);
      console.log(res);
      if (res) {
        paymentId = paymentUser.id;
        return;
      }
    });

    console.log(paymentId);

    if (!paymentId) return;

    // const datesPaymentsUser = paymentsUserSelected.map((payment) => ({ id: payment.id, date: payment.paymentDate }));

    const newPaymentsDate = paymentsUserSelected.filter((payment) => payment.id != paymentId);

    const datesPaymentsUser2 = newPaymentsDate.map((payment) => payment.paymentDate);
    datesPaymentsUser2.push(userSelected.userCreatedDate);

    const maxDate = Math.max(...datesPaymentsUser2);
    const fechaAdelantada = setUserPaymentUpTo(maxDate);

    const resPayment = await deletePayment(paymentId);
    const resUser = await changeUserPaymentUpTo(userSelected.id, fechaAdelantada);

    console.log(resPayment);
    if (resPayment && resUser) await successAlert("Mes reembolsado", "Este mes ha sido reembolsado correctamente.");
    else await errorAlert("Error", "Ha ocurrido un error al intentar reembolsar este mes");

    // setUserSelected({});
    // setMeses([]);
    // setUserSelectedDatePaymentUpto(fechaAdelantada);
    // calcMeses(fechaAdelantada);
    // setUserPayments([]);
    window.location.reload();
  };

  if (userSelected.id == undefined) return <></>;
  return (
    <div>
      {/* <SecondHeader /> */}
      <div className="border-b">
        <UserInfo title="Nombre" content={userSelected.name} />
        <UserInfo title="Telefono" content={userSelected.number} />
        <UserInfo title="Dirreccion" content={userSelected.address} />
        <UserInfo title="Email" content={userSelected.email} />
        <UserInfo title="Genero" content={userSelected.genre} />
        <UserInfo title="Estado" content={userSelected.state} />
        <UserInfo title="Fecha inscripcion" content={new Date(userSelected.userCreatedDate).toLocaleDateString()} />

        <hr />

        <div className="flex justify-end my-4 gap-3">
          <Button color="warning" onClick={() => navigate(`edit`)}>
            Editar
          </Button>
          <Button color="success" onClick={() => handleClickPagar()}>
            Pagar mes actual
          </Button>
          {userSelected.state == "Active" ? (
            <Button color="danger" onClick={() => marcarComoInactivo("Inactive")}>
              Marcar como inactivo
            </Button>
          ) : (
            <Button color="success" onClick={() => marcarComoInactivo("Active")}>
              Marcar como activo
            </Button>
          )}
        </div>

        <hr />

        <p className="text-center mb-3">Historial de pagos</p>

        {meses.map((mes, i) => {
          console.log("--------------------------------------------");
          console.log(meses);
          console.log("--------------------------------------------");

          // console.error(meses);
          console.log(i);
          console.log(mes);
          const dateMonth = new Date(mes.anio, mes.mesNumber);
          console.log(new Date(dateMonth));

          // const array = [new Date(userSelected.userCreatedDate)];
          const array = [];

          paymentsUserSelected.forEach((userPayment) => {
            if (userPayment.user_id == userSelected.id) {
              array.push(new Date(userPayment.paymentDate));
            }
          });
          console.log(paymentsUserSelected);
          // console.log(new Date(paymentsUserSelected[0].paymentDate).toDateString());
          console.log(array);

          console.log(array);
          // const res = verificarCoincidenciaMesAnio(dateMonth, array);
          // console.log(res);

          // const res = verificarCoincidenciaMesAnio(dateMonth, array);

          return (
            <div className={`flex justify-between my-2 items-center ${i + 1 < meses.length ? "border-b" : ""}`} key={i}>
              <p className="w-1/3">
                {mes.mes} del {mes.anio}
              </p>

              {i == 0 ? (
                <>
                  <p className="w-1/3">pago</p>
                  {/* <p className="w-1/3"></p> */}
                  <div className="w-1/3">
                    <Button isDisabled className="w-1/3-" color="success">
                      Reembolsar mes
                    </Button>
                  </div>
                </>
              ) : verificarCoincidenciaMesAnio(dateMonth, array) ? (
                <>
                  <p className="w-1/3">Pago</p>
                  <div className="w-1/3">
                    <Button className="w-1/3-" color="success" onClick={() => reembolsarMes(mes.mesNumber, mes.anio)}>
                      Reembolsar mes
                    </Button>
                  </div>
                </>
              ) : (
                <>
                  <p className="w-1/3">No Pago</p>
                  <div className="w-1/3">
                    <Button className="disabled w-1/3-" color="success" onClick={() => handleClickPagar(dateMonth.getTime())}>
                      Pagar mes actual
                    </Button>
                  </div>
                </>
              )}
              {/* {i == 0 ? (
                <>
                  <p className="w-1/3">pago</p>
                  <p className="w-1/3"></p>
                </>
              ) : (
                <>
                  <p className="w-1/3">{res ? "Pago" : "No pago"}</p>
                  <Button className="w-1/3" color="success" onClick={res ? () => reembolsarMes(mes.mesNumber, mes.anio) : handleClickPagar(dateMonth.getTime())}>
                    Reembolsar mes
                  </Button>
                </>
              )} */}
              {/* <p>Pago</p>
            <Button color="success" onClick={() => handleClickPagar(dateMonth.getTime())}>
              Pagar mes actual
            </Button> */}
            </div>
          );

          if (verificarCoincidenciaMesAnio(dateMonth, array)) {
            console.log("El mes y el año de las fechas coinciden.");
            return (
              <div className="flex gap-5" key={i}>
                <p>
                  {mes.mes} del {mes.anio} - {mes.mesNumber}
                </p>
                <p>Pago</p>
              </div>
            );
          } else {
            console.log("El mes y el año de las fechas no coinciden.");

            return (
              <div className="flex gap-5" key={i}>
                <p>
                  {mes.mes} del {mes.anio} - {mes.mesNumber}
                </p>
                <p>No Pago</p>
                {paymentsList.length > 5 ? <p>hola 1</p> : <></>}
                <Button color="success" onClick={() => handleClickPagar(dateMonth.getTime())}>
                  Pagar mes actual
                </Button>
              </div>
            );
          }

          if (userPayments)
            userPayments.map((userPayment) => {
              console.log(userPayment);
              console.log(userPayment.paymentDate);
              if (verificarCoincidenciaMesAnio(dateMonth, new Date(userPayment.paymentDate))) {
                console.log("El mes y el año de las fechas coinciden.");
                return (
                  <div className="flex gap-5" key={i}>
                    <p>
                      {mes.mes} del {mes.anio}
                    </p>
                    <p>Pago</p>
                  </div>
                );
              } else {
                console.log("El mes y el año de las fechas no coinciden.");

                return (
                  <div className="flex gap-5" key={i}>
                    <p>
                      {mes.mes} del {mes.anio}
                    </p>
                    <p>No Pago</p>
                    {paymentsList.length > 5 ? <p>hola 1</p> : <></>}
                    <Button color="success" onClick={() => handleClickPagar(dateMonth.getTime())}>
                      Pagar mes actual
                    </Button>
                  </div>
                );
              }
            });

          // if (i == 0)
          //   return (
          //     <div className="flex gap-5" key={i}>
          //       <p>
          //         {mes.mes} del {mes.anio}
          //       </p>
          //       <p>Pago</p>
          //     </div>
          //   );

          return (
            <div className="flex gap-5" key={i}>
              <p>
                {mes.mes} del {mes.anio}
              </p>
              <p>No Pago</p>
              {paymentsList.length > 5 ? <p>hola 2</p> : <></>}
              <Button color="success" onClick={() => handleClickPagar(dateMonth.getTime())}>
                Pagar mes actual
              </Button>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default UserSelected;

const UserInfo = ({ title, content }) => {
  if (content == "") return <></>;
  return (
    <div className="flex mb-3 items-center border-b-">
      <p className="w-2/5 font-semibold">{title}</p>
      <p className="w-3/5 text-end">{content}</p>
    </div>
  );
};
