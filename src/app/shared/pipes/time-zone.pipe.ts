import { Pipe, PipeTransform } from '@angular/core';
import moment from 'moment-timezone';

@Pipe({
  name: 'timeZone',
  standalone: true,
})
export class TimeZonePipe implements PipeTransform {
  transform(value: string, format = 'MM/DD/YYYY hh:mm A'): string {
    return moment(value).tz('Africa/Cairo').format(format);
  }
}
