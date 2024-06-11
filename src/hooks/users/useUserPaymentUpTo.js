export const useUserPaymentUpTo = () => {
  const setUserPaymentUpTo = (fecha = new Date()) => {
    // const fechaAdelantada = new Date(date);
    // fechaAdelantada.setMonth(fechaAdelantada.getMonth() + 1);
    // return fechaAdelantada.getTime();
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
  };

  return { setUserPaymentUpTo };
};
