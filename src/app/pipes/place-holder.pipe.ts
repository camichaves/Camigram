import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'placeHolder'
})
export class PlaceHolderPipe implements PipeTransform {

  transform(value: any, ...args: any[]): any {
    return null;
  }

}
