import { Pipe, PipeTransform } from '@angular/core';
import * as moment from 'moment'; 

@Pipe({
  name: 'parseRuntime'
})
export class PipePipe implements PipeTransform {

  transform(value: number): unknown {
    let duration = moment.duration(value, 'minutes');
    let hour = duration.hours() > 1 ? `${duration.hours()}h` : '';
    let min = duration.minutes() > 1 ? `${duration.minutes()}m`: '';
    let ss = duration.seconds() > 1 ? `${duration.seconds()}s`: '';
    return `${hour} ${min} ${ss}`;
  }

}
