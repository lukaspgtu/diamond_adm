import { Pipe, PipeTransform } from '@angular/core';
import { NumberHelper } from '../helpers/NumberHelper';

@Pipe({
  name: 'money'
})
export class MoneyPipe implements PipeTransform {
  transform(value: any, ...args: any[]): any {
    return NumberHelper.formatMoney(value);
  }
}
