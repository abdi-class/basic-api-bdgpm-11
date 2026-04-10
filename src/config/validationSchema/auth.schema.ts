import { z } from "zod";

export const regisSchema = z.object({
  username: z.string(),
  email: z.email(),
  password: z
    .string()
    .min(6, "Password must be at least 6 character")
    .regex(/A-Z/, "Contain at least one uppercase")
    .regex(/a-z/, "Contain at least one lowercase")
    .regex(/0-9/, "Contain at least one number"),
});
