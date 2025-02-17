import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Book } from '../../models/book';
import { CardComponent } from '../../components/card/card.component';
import { ServiceBookService } from '../../shared/books.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-books',
  standalone: true,
  imports: [CommonModule, FormsModule, CardComponent],
  templateUrl: './books.component.html',
  styleUrls: ['./books.component.css']
})

export class BooksComponent {

  public libroId: number;
  public arrayBooks: Book[] ;
  public libroEncontrado: Book;

  constructor(public serviceBookService: ServiceBookService, private toastr: ToastrService) {

    this.libroEncontrado = this.serviceBookService.getOne(this.libroId);
    this.arrayBooks = this.serviceBookService.getAll();
  }

  buscarLibro() {
    this.libroEncontrado = this.serviceBookService.getOne(this.libroId);
    if (this.libroEncontrado) {
      this.arrayBooks = [];
      this.arrayBooks.push(this.libroEncontrado);
      this.libroId = null;
      return
    }

    if(!this.libroId){
      this.arrayBooks = this.serviceBookService.getAll();
      this.libroEncontrado = null;
      return;
    }

    if(!this.libroEncontrado){
      this.arrayBooks = this.serviceBookService.getAll();
      this.toastr.success('Libro no encontrado', 'Fallo', {
        toastClass: 'ngx-toastr custom-toast-error',
        positionClass: 'toast-bottom-right'
      });
      return;
    }
  }


  ngOnInit() {

  }
}
