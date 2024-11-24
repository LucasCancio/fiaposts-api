import { optional, z } from "zod";

export const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6, "A senha deve conter no mínimo 6 caracteres."),
  isTeacher: z.boolean().default(true).optional(),
});

export type LoginDTO = z.infer<typeof loginSchema>;
