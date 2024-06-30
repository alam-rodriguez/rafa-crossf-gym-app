// const path = "http://localhost:8080/api/users";
const path = "https://rafa-crossf-gym-api.vercel.app/api/users";

export const createUser = async (user) => {
  const headers = { "Content-Type": "application/json" };
  const res = await fetch(`${path}/create-user`, {
    method: "POST",
    headers: headers,
    body: JSON.stringify(user),
  });
  console.log(await res.json());
  if (res.status == 201) return true;
  return false;
};

export const getUserActives = async () => {
  try {
    const res = await fetch(`${path}/get-users-actives`);
    const result = await res.json();
    if (res.status == 302) return result;
    return false;
  } catch (e) {
    console.error("Error");
    return false;
  }
};

export const getAllUsers = async () => {
  const res = await fetch(`${path}/get-users`);
  const result = await res.json();
  if (res.status == 302) return result;
  return false;
};

export const setUserState = async (id, state) => {
  const res = await fetch(`${path}/set-user-status/${id}`, {
    method: "PATCH",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ state: state }),
  });
  if (res.status == 200) return true;
  return false;
};

export const getUserById = async (id) => {
  try {
    const res = await fetch(`${path}/get-users/${id}`);
    console.log(res);
    const result = await res.json();
    console.log(result);
    if (res.status == 302) return result;
    return false;
  } catch (e) {
    console.log(e);
    return false;
  }
};

export const changeUserPaymentUpTo = async (id, paymentUpTo) => {
  try {
    const res = await fetch(`${path}/change-user-payment-up-to/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ paymentUpTo }),
    });
    if (res.status == 200) return true;
    return false;
  } catch (e) {
    return false;
  }
};

export const updateInfoUser = async (id, userInfoUpdate) => {
  console.log(userInfoUpdate);
  console.log(userInfoUpdate.id);
  try {
    const res = await fetch(`${path}/update-user/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(userInfoUpdate),
    });
    console.log(res);
    if (res.status == 200) return true;
    console.log(await res.json());

    return false;
  } catch (e) {
    console.log(e);
    return false;
  }
};
