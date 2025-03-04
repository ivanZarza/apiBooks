import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'currency',
  standalone: true
})
export class CurrencyPipe implements PipeTransform {
  toEUR: Intl.NumberFormat;

  constructor() {
    this.toEUR = Intl.NumberFormat('es-ES', { style: 'currency', currency: 'EUR' })
  }

  transform(value: string, ...args: unknown[]): string {

    return this.toEUR.format(parseFloat(value));
  }

}
