import { z } from "zod";

export const updateSchema = z
  .object({
    name: z
      .string()
      .min(3, "O nome deve conter no mínimo 3 caracteres.")
      .optional(),
    email: z.string().email("O email deve ser valido.").optional(),
    password: z
      .string()
      .min(6, "A senha deve conter no mínimo 6 caracteres.")
      .optional(),
  })
  .refine(
    (data) => Object.keys(data).length !== 0,
    "É preciso informar pelo menos 1 informação para atualizar."
  );

export type UpdateUserDTO = z.infer<typeof updateSchema>;
