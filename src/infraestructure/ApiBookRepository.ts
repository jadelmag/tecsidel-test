import { Book } from "@/domain/book";
import { BookResponse, bookResponseSchema } from "@/interfaces/book.response";
import { BookRepositoryInterface } from "@/ports/bookRepository";
import axios, { AxiosError, AxiosResponse } from "axios";
import { ZodType } from "zod";

export class ApiBookRepository implements BookRepositoryInterface {
  private apiUrl: string = "https://fakerapi.it/api/v1/books";

  private async handleError(error: AxiosError, customMessage: string = "") {
    console.error("API Error:", error.response || error.message);
    console.error(customMessage || "An error occurred with the API");
  }

  private validateResponse<T>(
    response: AxiosResponse<T>,
    schema: ZodType
  ): T | null {
    const result = schema.safeParse(response.data);
    if (result.success) {
      return result.data;
    } else {
      console.error("Validation failed:", result.error.errors);
      return null;
    }
  }

  async getBooksByQuantity(quantity: number): Promise<Book[]> {
    try {
      const fullUrl: string = `${this.apiUrl}?_quantity=${quantity}&_locale=es_ES`;
      const response: AxiosResponse<BookResponse> = await axios.get(fullUrl);
      const bookResponse: BookResponse | null = this.validateResponse(
        response,
        bookResponseSchema
      );

      if (!bookResponse) return [];
      if (Array.isArray(bookResponse.data)) {
        const books: Book[] = bookResponse.data;
        return books;
      }
      return [];
    } catch (error) {
      this.handleError(error as AxiosError, "Failed to fetch books");
      return [];
    }
  }
}
