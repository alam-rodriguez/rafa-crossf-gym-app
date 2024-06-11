import { z } from "zod";

const SettingsSchema = z.object({
  nameApp: z.string().min(3, { message: "El nombre debe de por lo menos tener 3 caracteres." }),
  registrationPrice: z.number(),
  monthlyPrice: z.number(),
});

export default SettingsSchema;
