import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'orderBy'
})
export class OrderByPipe implements PipeTransform {

  transform<T extends Record<string, any>>(valuesArray: T[], orderByField: string, transformValueFn?: {(item: T, fieldName: keyof T): any}): T[] {
    return valuesArray.sort((a, b) => {
      if (transformValueFn) {
        return transformValueFn(a, orderByField) - transformValueFn(b, orderByField)
      } else {
        return a[orderByField] - b[orderByField]
      }
    });
  }

}
