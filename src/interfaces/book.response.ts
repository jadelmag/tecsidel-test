import { bookSchema } from "@/domain/book";
import { z } from "zod";

const bookResponseSchema = z.object({
  status: z.string(),
  code: z.number().int().positive(),
  locale: z.string(),
  seed: z.string().nullable(),
  total: z.number().int().positive(),
  data: z.array(bookSchema),
});

export type BookResponse = z.infer<typeof bookResponseSchema>;

export { bookResponseSchema };

