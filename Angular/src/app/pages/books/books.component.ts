import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Book } from '../../models/book';
import { CardComponent } from '../../components/card/card.component';
import { ServiceBookService } from '../../shared/books.service';
import { UsuarioService } from '../../shared/usuario.service';
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
  public arrayBooks: Book[];


  constructor(public serviceBookService: ServiceBookService, private toastr: ToastrService, public usuarioService: UsuarioService) {
    this.arrayBooks = null;
    this.libroId = null;
  }
  public async buscarLibro() {

    try {
      if (this.libroId) {
        await this.serviceBookService.getBooks({ id_book: this.libroId, id_user: this.usuarioService.user.id_user });
        console.log(this.usuarioService.user.id_user);
        this.arrayBooks = this.serviceBookService.arrayBooks;
        console.log(this.arrayBooks);

        if (this.arrayBooks.length === 0) {
          this.toastr.error('No se encontró el libro');
        }
      }  else {
        await this.serviceBookService.getBooks({ id_user: this.usuarioService.user.id_user });
        console.log(this.usuarioService.user.id_user);
        this.arrayBooks = this.serviceBookService.arrayBooks;
        console.log(this.arrayBooks);
      }
    } catch (error) {
      this.toastr.error('Error al buscar el libro');
    }
  }



  ngOnInit() {

  }
}
