import { z } from "zod";

const bookSchema = z.object({
  id: z.number().int().positive(),
  title: z.string(),
  author: z.string(),
  genre: z.string(),
  description: z.string(),
  isbn: z.string(),
  image: z.string(),
  published: z.string(),
  publisher: z.string(),
});

export type Book = z.infer<typeof bookSchema>;

const tabularBookSchema = bookSchema.omit({ id: true, image: true });

export type TabularBook = z.infer<typeof tabularBookSchema>;

export { bookSchema, tabularBookSchema };

