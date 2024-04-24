import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'customDate',
  standalone: true
})
export class CustomDatePipe implements PipeTransform {

  transform(value: any, ...args: any[]): any {
    const today = new Date();
    const date = new Date(value);

    if (date.setHours(0, 0, 0, 0) === today.setHours(0, 0, 0, 0)) {
      return 'Today';
    } else if (date.setDate(date.getDate() + 1) === today.setHours(0, 0, 0, 0)) {
      return 'Yesterday';
    } else {
      return new Date(value).toLocaleDateString();
    }
  }

}
