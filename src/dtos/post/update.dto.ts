import { z } from "zod";

export const updateSchema = z
  .object({
    title: z
      .string()
      .min(5, "O titulo deve conter no mínimo 5 caracteres.")
      .optional(),
    content: z
      .string()
      .min(20, "O conteúdo deve conter no mínimo 20 caracteres.")
      .optional(),
    imageUrl: z.string().url("A url da imagem deve ser válida.").optional(),
    slug: z
      .string()
      .min(5, "O slug deve conter no mínimo 5 caracteres.")
      .optional(),
    categoriesIds: z.array(z.coerce.number()).optional(),
  })
  .refine(
    (data) => Object.keys(data).length !== 0,
    "É preciso informar pelo menos 1 informação para atualizar."
  );

export type UpdatePostDTO = z.infer<typeof updateSchema>;
