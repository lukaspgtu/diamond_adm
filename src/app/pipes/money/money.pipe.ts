import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'money'
})
export class MoneyPipe implements PipeTransform {

  transform(value: any, ...args: any[]): any {
    if (typeof value === "string")
      value = +value;

    value =  value.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,');
    value = value.replace(',', ';');
    value = value.replace('.', ',');
    value = value.replace(';', '.');

    return value;
  }

}
