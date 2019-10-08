import { Pipe, PipeTransform } from '@angular/core';
import { formatDate } from 'src/app/helpers/UtilsHelper';

@Pipe({
  name: 'date2'
})
export class Date2Pipe implements PipeTransform {

  transform(value: any, ...args: any[]): any {
    value = new Date(value);
    return formatDate(value);
  }

}
