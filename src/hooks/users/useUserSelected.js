import { useEffect, useState } from "react";

// React-router
import { useParams } from "react-router-dom";

// Requests
import { getUserById } from "../../requests/users/useUsers";
import { getPaymentsById } from "../../requests/payments/usePayments";

// Zustans
import { userSelectedInfo } from "../../zustand/users/users";
import { zusPayments } from "../../zustand/payments/payments";

export const useUserSelected = () => {
  let { id } = useParams();

  // For get user information
  const { userSelected, setUserSelected } = userSelectedInfo();
  useEffect(() => {
    if (userSelected.id != undefined) return;
    const f = async () => {
      console.log(id);
      const user = await getUserById(id);
      console.log(user);
      if (user) setUserSelected(user);
    };
    f();
  }, [userSelected]);

  // For get user payments
  const { hasPayments, payments, paymentsUserSelected, setPaymentsUserSelected, addPaymentUserSelected } = zusPayments();
  useEffect(() => {
    if (hasPayments) {
      const paymentsUser = payments.filter((payment) => payment.user_id == id);
      setPaymentsUserSelected(paymentsUser);
      return;
    }
    const f = async () => {
      const res = await getPaymentsById(id);
      if (res) setPaymentsUserSelected(res);
    };
    f();
  }, []);

  // function mesesYAniosEntreFechas(fechaInicio, fechaFin) {
  //   var mesesYAnios = [];
  //   var fechaInicioObj = new Date(fechaInicio);
  //   var fechaFinObj = new Date(fechaFin);

  //   // Iterar desde la fecha de inicio hasta la fecha de fin
  //   var iterador = new Date(fechaInicioObj);
  //   while (iterador <= fechaFinObj) {
  //     var mesNumber = iterador.getMonth();
  //     var mes = iterador.toLocaleDateString("default", { month: "long" }); // Obtener el nombre del mes
  //     var anio = iterador.getFullYear(); // Obtener el año
  //     mesesYAnios.push({ mes: mes, anio: anio, mesNumber: mesNumber });
  //     iterador.setMonth(iterador.getMonth() + 1); // Avanzar al siguiente mes
  //   }

  //   return mesesYAnios;
  // }
  function obtenerMesesYAnos(fechaInicio, fechaFin) {
    const meses = ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"];

    const resultado = [];
    let fechaActual = new Date(fechaInicio);

    // Iterar mientras la fecha actual sea menor o igual a la fecha final
    while (fechaActual <= fechaFin) {
      const mesIndex = fechaActual.getMonth(); // Índice del mes de 0 a 11
      console.log(fechaActual.getMonth());
      resultado.push({
        // mesNumber: mesIndex + 1, // getMonth() devuelve el mes de 0 a 11, así que sumamos 1
        mesNumber: mesIndex,

        mes: meses[mesIndex],
        anio: fechaActual.getFullYear(),
      });

      // Incrementar el mes
      fechaActual.setMonth(fechaActual.getMonth() + 1);
    }

    return resultado;
  }

  // For get months to render
  const [meses, setMeses] = useState([]);

  const calcMeses = (paymentUpTo) => {
    const fechaInicio = new Date(userSelected.userCreatedDate);
    const fechaActual = new Date().getTime();
    const fechaFin = new Date(fechaActual > paymentUpTo ? fechaActual : paymentUpTo);

    // Obtener los meses y años entre las dos fechas
    const mesesYAnos = obtenerMesesYAnos(fechaInicio, fechaFin);
    console.log(mesesYAnos);
    setMeses(mesesYAnos);
  };

  const [userCreatedDate, setUserCreatedDate] = useState(null);
  const [userLastPaymentDate, setUserLastPaymentDate] = useState(null);
  useEffect(() => {
    if (userSelected.id == undefined) return;

    // var fechaInicioMilisegundos = userSelected.userCreatedDate; // Milisegundos correspondientes a 01/01/2022
    // var fechaFinMilisegundos = new Date().getTime(); // Milisegundos correspondientes a 06/05/2024

    // console.log(paymentsUserSelected);

    // const paymensDate = paymentsUserSelected.map((payment) => payment.paymentDate);
    // console.log("---------");
    // console.log(paymensDate);
    // console.log(fechaFinMilisegundos);
    // const maxDate = Math.max(...paymensDate, fechaFinMilisegundos);
    // console.log(maxDate);

    // console.log(userSelected);
    // var listaMesesYAnios = mesesYAniosEntreFechas(userSelected.userCreatedDate, userSelected.paymentUpTo);
    // console.log(listaMesesYAnios);
    // setMeses(listaMesesYAnios);

    // Crear dos fechas
    // console.log(userSelected.userCreatedDate);
    // console.log(userSelected.paymentUpTo);
    // console.log(new Date(userSelected.paymentUpTo));
    // const fechaInicio = new Date(userSelected.userCreatedDate);
    // const fechaActual = new Date().getTime();
    // const fechaFin = new Date(fechaActual > fechaActual ? fechaActual : userSelected.paymentUpTo);

    // // Obtener los meses y años entre las dos fechas
    // const mesesYAnos = obtenerMesesYAnos(fechaInicio, fechaFin);
    // setMeses(mesesYAnos);
    calcMeses(userSelected.paymentUpTo);

    // console.log(mesesYAnos);
  }, [userSelected]);

  const sonDelMismoMes = (fecha1, fecha2) => {
    const date1 = new Date(fecha1);
    const date2 = new Date(fecha2);

    const anio1 = date1.getFullYear();
    const mes1 = date1.getMonth();

    const anio2 = date2.getFullYear();
    const mes2 = date2.getMonth();

    console.log(mes1);
    console.log(mes2);

    return anio1 === anio2 && mes1 === mes2;
  };

  function obtenerPrimerDiaProximoMes(fecha = new Date()) {
    // Convertir la entrada a un objeto Date
    const date = new Date(fecha);

    // Obtener el mes y el año actuales
    const day = date.getDate();
    const month = date.getMonth();
    const year = date.getFullYear();

    // Crear una nueva fecha para el primer día del próximo mes
    const primerDiaProximoMes = new Date(year, month + 1, day);

    if (primerDiaProximoMes.getMonth() !== (month + 1) % 12) {
      primerDiaProximoMes.setDate(0); // Esto ajusta la fecha al último día del mes anterior
    }

    return primerDiaProximoMes.getTime();
  }

  function verificarCoincidenciaMesAnio(fecha1, fecha2) {
    // Obtener el mes y el año de la primera fecha
    var mesFecha1 = fecha1.getMonth();
    var anioFecha1 = fecha1.getFullYear();

    let itsPaid = false;

    console.log(fecha2);

    fecha2.forEach((fecha) => {
      // Obtener el mes y el año de la segunda fecha
      // var mesFecha2 = fecha.getMonth() + 1;
      var mesFecha2 = fecha.getMonth();

      var anioFecha2 = fecha.getFullYear();

      console.log(mesFecha1);
      console.log(mesFecha2);

      console.log(anioFecha1);
      console.log(anioFecha2);

      // Verificar si el mes y el año coinciden
      if (mesFecha1 === mesFecha2 && anioFecha1 === anioFecha2) itsPaid = true;
    });

    console.log(itsPaid);
    return itsPaid;
  }

  return { meses, setMeses, sonDelMismoMes, obtenerPrimerDiaProximoMes, verificarCoincidenciaMesAnio, calcMeses };
};
