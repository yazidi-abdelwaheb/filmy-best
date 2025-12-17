import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'toCapitaleCase',
})
export class ToCapitaleCasePipe implements PipeTransform {
  transform(value: string, ...args: unknown[]): unknown {
    if (!value) return '';
    return value
      .toLowerCase()
      .split(' ')
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
  }
}
