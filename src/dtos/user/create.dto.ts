import { z } from "zod";

export const createSchema = z.object({
  name: z.string().min(3, "O nome deve conter no mínimo 3 caracteres."),
  email: z.string().email(),
  password: z.string().min(6, "A senha deve conter no mínimo 6 caracteres."),
});

export type CreateUserDTO = z.infer<typeof createSchema>;
