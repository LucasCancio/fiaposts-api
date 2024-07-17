import { z } from "zod";

export const createSchema = z.object({
  title: z.string().min(5, "O titulo deve conter no mínimo 5 caracteres."),
  content: z
    .string()
    .min(10, "O conteúdo deve conter no mínimo 10 caracteres."),
  imageUrl: z.string().url("A url da imagem deve ser válida.").optional(),
  slug: z.string().min(5, "O slug deve conter no mínimo 5 caracteres."),
  categoriesIds: z
    .array(z.coerce.number())
    .nonempty("É preciso informar pelo menos 1 categoria."),
});

export type CreatePostDTO = z.infer<typeof createSchema>;
