import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filter'
})

export class FilterPipe implements PipeTransform {

  transform<T>(valuesArray: T[], filterFunction: { (someArg: T): boolean; }): T[] {
    return valuesArray.filter(filterFunction);
  }

}
