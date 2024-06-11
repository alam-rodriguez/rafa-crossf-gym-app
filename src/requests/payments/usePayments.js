// const path = "http://localhost:8080/api/payments";
const path = "https://china-gym-5boca1m60-alamrodriguezs-projects.vercel.app/api/payments";

export const addPayment = async (payment) => {
  try {
    const res = await fetch(`${path}/add-payment`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payment),
    });
    const result = await res.json();
    console.log(result);
    if (res.status == 201) return true;
    return false;
  } catch (e) {
    console.log(e);
    return false;
  }
};

export const getPayments = async () => {
  const res = await fetch(`${path}/get-payments`);
  const result = await res.json();
  if (res.status == 302) return result;
  return false;
};

export const getPaymentsById = async (user_id) => {
  const res = await fetch(`${path}/get-payments/${user_id}`);
  console.error(res);
  const result = await res.json();
  if (res.status == 302) return result;
  return false;
};

export const deletePayment = async (id) => {
  try {
    const res = await fetch(`${path}/delete-payment/${id}`, {
      method: "DELETE",
    });
    console.log(res);
    console.log(await res.json());
    return true;
  } catch (e) {
    return false;
  }
};
