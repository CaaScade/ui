import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
  name: 'textSearch'
})
export class TextSearchPipe implements PipeTransform {
  public transform(value, keys: string, term: string) {

    if (!term) { return value;}
    return (value || []).filter((item) => keys.split(',').some(key => item.metadata.hasOwnProperty(key) && new RegExp(term, 'gi').test(item.metadata[key])));

  }
}
