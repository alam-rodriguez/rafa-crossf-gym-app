import React, { useEffect, useState } from "react";
import { useAllUsers } from "../hooks/users/useAllUsers";
import { useUsers } from "../zustand/users/users";
import { zusPayments } from "../zustand/payments/payments";
import { Button } from "@nextui-org/react";
import { zusStatistics } from "../zustand/app/statistics";
import { usePayments } from "../hooks/payments/usePayments";

// import { DateInput } from "@nextui-org/react";
// import { DateInput } from "@nextui-org/react";
// import { CalendarDate } from "@internationalized/date";

const Statistics = () => {
  useAllUsers();
  usePayments();

  // const { hasPayments, setPayments } = zusPayments();
  const { allUsers } = useUsers();

  const { payments } = zusPayments();

  const {
    men,
    women,
    allUsersCount,
    activeUsers,
    nonActiveUsers,
    earningsWithRegistration,
    earningsWithMensRegistration,
    earningsWithWomensRegistration,
    earningsWithMonthlyPayments,
    earningsWithMensMonthlyPayments,
    earningsWithWomensMonthlyPayments,
    earnings,
    setStatistics,
  } = zusStatistics();

  useEffect(() => {
    console.log(allUsers);
  }, [allUsers]);

  useEffect(() => {
    if (allUsers.length == 0) return;
    console.log(payments);
    let men = 0;
    let women = 0;
    let earningsWithRegistration = 0;
    let earningsWithMensRegistration = 0;
    let earningsWithWomensRegistration = 0;
    let activeUsers = 0;
    let nonActiveUsers = 0;
    let earningsWithMonthlyPayments = 0;
    let earningsWithMensMonthlyPayments = 0;
    let earningsWithWomensMonthlyPayments = 0;
    let earnings = 0;
    allUsers.forEach((user) => {
      console.log(user);
      earnings += user.registrationPricePaid;
      earningsWithRegistration += user.registrationPricePaid;
      if (user.genre == "hombre") {
        men++;
        earningsWithMensRegistration += user.registrationPricePaid;
      } else {
        women++;
        earningsWithWomensRegistration += user.registrationPricePaid;
      }
      if (user.state == "Active") activeUsers++;
      else nonActiveUsers++;
    });
    payments.forEach((payment) => {
      console.log(payment);
      earnings += payment.paymentAmount;
      earningsWithMonthlyPayments += payment.paymentAmount;
      const user = allUsers.find((user) => user.id == payment.user_id);

      if (user.genre == "hombre") earningsWithMensMonthlyPayments += payment.paymentAmount;
      else earningsWithWomensMonthlyPayments += payment.paymentAmount;
      console.log(user);
    });

    console.log(allUsers);
    setStatistics({
      men: men,
      women: women,
      allUsersCount: allUsers.length,
      activeUsers: activeUsers,
      nonActiveUsers: nonActiveUsers,
      earningsWithRegistration: earningsWithRegistration,
      earningsWithMensRegistration: earningsWithMensRegistration,
      earningsWithWomensRegistration: earningsWithWomensRegistration,
      earningsWithMonthlyPayments: earningsWithMonthlyPayments,
      earningsWithMensMonthlyPayments: earningsWithMensMonthlyPayments,
      earningsWithWomensMonthlyPayments: earningsWithWomensMonthlyPayments,
      earnings: earnings,
    });

    // TODO: console.log(payments);
  }, [allUsers.length > 0, payments]);

  return (
    <div>
      {/* <div>
        <div className="flex w-full flex-wrap md:flex-nowrap gap-4">
          <DateInput label={"Birth date"} className="max-w-sm" />
        </div>
      </div> */}

      <StatisticsItem text="Usuarios inscritos" value={allUsersCount} />
      <StatisticsItem text="Hombres inscritos" value={men} />
      <StatisticsItem text="Mujeres inscritas" value={women} />
      <StatisticsItem text="usuarios activos" value={activeUsers} />
      <StatisticsItem text="usuarios no activos" value={nonActiveUsers} />
      <StatisticsItem text="ganancias de inscripciones" value={earningsWithRegistration} />
      <StatisticsItem text="Ganancias de inscripciones de hombres" value={earningsWithMensRegistration} />
      <StatisticsItem text="Ganancias de inscripciones de mujeres" value={earningsWithWomensRegistration} />
      <StatisticsItem text="Ganancias de mensualidades" value={earningsWithMonthlyPayments} />
      <StatisticsItem text="Ganancias de mensualidades de hombres" value={earningsWithMensMonthlyPayments} />
      <StatisticsItem text="Ganancias de mensualidades de mujeres" value={earningsWithWomensMonthlyPayments} lineBlack={true} />
      <StatisticsItem text="Ganancias totales" value={earnings} />
    </div>
  );
};

export default Statistics;

const StatisticsItem = ({ text, value, lineBlack = false }) => {
  return (
    <div className={`flex justify-between items-center py-3 border-b ${lineBlack ? "border-b-2 border-black" : ""}`}>
      <p className="font-semibold ">{text}</p>
      <p className="font-bold">{value}</p>
    </div>
  );
};
