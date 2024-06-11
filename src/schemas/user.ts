import { z } from "zod";
import { v4 as uuidv4 } from "uuid";

const setDate = () => new Date().getTime();

const User = z.object({
  id: z.string().uuid().default(uuidv4()),
  name: z.string().min(3, { message: "El nombre debe de tener por lo menos 3 caracteres." }),
  number: z.string(),
  address: z.string(),
  email: z.string(),
  genre: z.string().min(1, { message: "Debes de indicar un genero." }),
  state: z.string().default("Active"),
  userCreatedDate: z.number().default(setDate()),
});

export default User;
