import { Injectable } from '@angular/core';
import { Book } from '../models/book';


@Injectable({
  providedIn: 'root'
})
export class ServiceBookService {

  private url: string;
  public arrayBooks: Book[] = [];

  constructor() {
    this.url = 'http://localhost:3000';
    this.arrayBooks = null;
  }

  public async getBooks({ id_user = null, id_book = null }= {}) {
    const url = new URL(`${this.url}/books`);
    try {
      if(id_user) {
      url.searchParams.append('id_user', id_user);
    }
    if(id_book) {
      url.searchParams.append('id_book', id_book);
    }
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
    });
    if (!response.ok) {
      throw new Error('Error en la solicitud');
    }
    const data = await response.json();
    console.log(data.data[0]);
    this.arrayBooks = data.data;
    console.log(this.arrayBooks);
  }
  catch (error) {
    console.error('Error:', error);
  }
}

  public async add(book: Book) {
    try {
      const response = await fetch(`${this.url}/books`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify(book)
      });
      if (!response.ok) {
        throw new Error('Error en la solicitud');
      }
    } catch (error) {
      console.error('Error:', error);
  }
}

  public edit(book: Book) {
    try {
      const response = fetch(`${this.url}/books`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify(book)
      });
      if (!response) {
        throw new Error('Error en la solicitud');
      }
    } catch (error) {
      console.error('Error:', error);
    }

  }

  public delete(id: number) {
    try {
      const response = fetch(`${this.url}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify({ id })
      });
      if (!response) {
        throw new Error('Error en la solicitud');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  }
}
