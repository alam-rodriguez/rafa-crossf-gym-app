import { z } from "zod";

const UpdateUser = z.object({
  name: z.string().min(3, { message: "El nombre debe de tener por lo menos 3 caracteres." }),
  number: z.string(),
  address: z.string(),
  email: z.string(),
  genre: z.string().min(1, { message: "Debes de indicar un genero." }),
});

export default UpdateUser;
