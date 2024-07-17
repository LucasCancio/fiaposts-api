import { z } from "zod";

export const searchSchema = z.object({
  title: z.string().optional(),
  content: z.string().optional(),
  // Pagination
  page: z.coerce.number().positive("A pagina deve ser válida.").optional(),
  perPage: z.coerce
    .number()
    .positive("O número por pagina deve ser válido.")
    .optional(),
  // Sort
  sortBy: z.string().optional(),
  order: z
    .enum(["asc", "desc"], { message: "A ordenação deve ser 'asc' ou 'desc'." })
    .optional(),
});

export type SearchPostDTO = z.infer<typeof searchSchema>;
