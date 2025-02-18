import { Book } from "@/domain/book";

export interface BookRepositoryInterface {
  getBooksByQuantity: (quantity: number) => Promise<Book[]>;
}
