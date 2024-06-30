// import { useState } from "react";

// export const useGetSettings = async () => {
//   const [resInfo, setResInfo] = useState({});
//   const res = await fetch("http://localhost:8080/api/settings/get-settings");
//   setResInfo(await res.json());
//   // const resInfo = await res.json();
//   if (res.status == 302) return { resInfo };
//   else return "no info";
// };

// const path = "http://localhost:8080/api/settings";
const path = "https://rafa-crossf-gym-api.vercel.app/api/settings";
export const useGetSettings = async () => {
  // const [resInfo, setResInfo] = useState({});
  console.log(`${path}/get-settings`);
  const res = await fetch(`${path}/get-settings`);
  const result = await res.json();
  console.log(result);
  return result;
  // const resInfo = await res.json();
  // if (res.status == 302) return { resInfo };
  // else return "no info";
};

export const updateSettings = async (settings) => {
  const headers = { "Content-Type": "application/json" };
  const body = {
    registrationPrice: settings.registrationPrice,
    monthlyPrice: settings.monthlyPrice,
    nameApp: settings.nameApp,
  };
  const res = await fetch(`${path}/edit-settings`, {
    method: "PUT",
    headers: headers,
    body: JSON.stringify(body),
  });
  console.log(await res.json());
  console.log(settings);
};
