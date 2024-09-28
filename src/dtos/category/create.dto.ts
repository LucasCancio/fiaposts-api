import { z } from "zod";

export const createSchema = z.object({
  name: z.string().min(5, "O nome deve conter no mínimo 5 caracteres."),
  color: z.string().min(4, "A cor deve conter no mínimo 4 caracteres."),
});

export type CreateCategoryDTO = z.infer<typeof createSchema>;
