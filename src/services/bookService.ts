import { Book } from "@/domain/book";
import { BookRepositoryInterface } from "@/ports/bookRepository";

export class BookService implements BookRepositoryInterface {
  constructor(private readonly bookRepository: BookRepositoryInterface) {}

  async getBooksByQuantity(quantity: number): Promise<Book[]> {
    return this.bookRepository.getBooksByQuantity(quantity);
  }
}
