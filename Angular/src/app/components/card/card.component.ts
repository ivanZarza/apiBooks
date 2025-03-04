import { Component, Input, } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Book } from '../../models/book';
import { ServiceBookService } from '../../shared/books.service'; 
import { PipeRefPipe } from '../../pipes/pipe-ref.pipe';
import { CurrencyPipe } from '../../pipes/currency.pipe';

@Component({
  selector: 'app-card',
  standalone: true,
  imports: [CommonModule, PipeRefPipe, CurrencyPipe],
  templateUrl: './card.component.html',
  styleUrl: './card.component.css'
})
export class CardComponent {

  @Input() bookDesdePadre: Book;
  @Input() isEven: boolean;

  constructor( public serviceBookService: ServiceBookService) { 

  }

  borrarLibro(id: number) {
    console.log('Borrando libro con id: ', id);
    this.serviceBookService.delete(id);
  }
  
  ngOnInit() {
  }
}

