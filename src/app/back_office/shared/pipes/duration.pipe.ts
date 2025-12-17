import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'duration',
})
export class DurationPipe implements PipeTransform {
  transform(value: number, ...args: unknown[]): string {
    if (value == null || isNaN(value)) return '';

    const totalSeconds = value * 60;

    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = Math.floor(totalSeconds % 60);

    const minStr = minutes.toString().padStart(2, '0');
    const secStr = seconds.toString().padStart(2, '0');

    if (hours > 0) {
      return `${hours}h:${minStr}m:${secStr}s`;
    } else {
      return `${minutes}m:${secStr}s`;
    }
  }
}
