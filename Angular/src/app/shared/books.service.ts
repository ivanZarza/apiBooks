import { Injectable } from '@angular/core';
import { Book } from '../models/book';


@Injectable({
  providedIn: 'root'
})
export class ServiceBookService {

  private book: Book;
  private book2: Book;
  private book3: Book;
  private book4: Book;
  private arrayBooks: Book[] = [];

  constructor() { 
    this.book = new Book(1, 1, 'El Señor de los Anillos', 'Fantasia', 'J.R.R. Tolkien', 20, 'https://m.media-amazon.com/images/I/81Hx32a745L._SL1500_.jpg');
    this.book2 = new Book(2, 1, 'El Hobbit', 'Fantasia', 'J.R.R. Tolkien', 15, 'https://m.media-amazon.com/images/I/81dJWKg3LUL._SL1500_.jpg');
    this.book3 = new Book(3, 1, 'El Señor de los Anillos', 'Fantasia', 'J.R.R. Tolkien', 20, 'https://m.media-amazon.com/images/I/81Hx32a745L._SL1500_.jpg');
    this.book4 = new Book(4, 1, 'El Hobbit', 'Fantasia', 'J.R.R. Tolkien', 15, 'https://m.media-amazon.com/images/I/81dJWKg3LUL._SL1500_.jpg');
    this.arrayBooks.push(this.book, this.book2, this.book3, this.book4);
  }

  public getAll(): Book[] {
    return this.arrayBooks;
  }

  public getOne(id: number): Book {
    return this.arrayBooks.find(book => book.id_book === id);
  }

  public add(book: Book): void {
    this.arrayBooks.push(book);
  }

  public edit(libro: Book): boolean {
    const libroEncontrado = this.arrayBooks.find(element => element.id_book === libro.id_book);
    if (libroEncontrado) {
      libroEncontrado.id_user = libro.id_user !== undefined ? libro.id_user : libroEncontrado.id_user;
      libroEncontrado.title = libro.title !== undefined  ? libro.title : libroEncontrado.title;
      libroEncontrado.type = libro.type !== undefined  ? libro.type : libroEncontrado.type;
      libroEncontrado.author = libro.author !== undefined ? libro.author : libroEncontrado.author;
      libroEncontrado.price = libro.price !== undefined ? libro.price : libroEncontrado.price;
      libroEncontrado.photo = libro.photo !== undefined ? libro.photo : libroEncontrado.photo;
      return true;
    } else {
      return false;
    }
  }

  public delete(id: number): boolean {
    const libroEncontrado = this.arrayBooks.find(book => book.id_book === id);
    if (libroEncontrado) {
      this.arrayBooks = this.arrayBooks.filter(book => book.id_book !== id);
      return true;
    } else {
      return false;
    }
  }
}
