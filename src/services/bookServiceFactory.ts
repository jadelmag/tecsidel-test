import { ApiBookRepository } from "@/infraestructure/ApiBookRepository";
import { BookRepositoryInterface } from "@/ports/bookRepository";
import { BookService } from "@/services/bookService";

export class BookServiceFactory {
  static getBookRepository(): BookRepositoryInterface {
    return new ApiBookRepository();
  }

  static create(): BookService {
    const bookRepository = this.getBookRepository();
    return new BookService(bookRepository);
  }
}
