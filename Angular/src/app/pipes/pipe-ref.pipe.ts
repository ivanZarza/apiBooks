import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'pipeRef',
  standalone: true
})
export class PipeRefPipe implements PipeTransform {

  transform(value: string, ...args: unknown[]): string {

    return `Ref- ${value}`;
  }

}
