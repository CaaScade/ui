import { Injectable } from '@angular/core';
import * as SecureLS from 'secure-ls';

const ls = new SecureLS({encodingType: 'aes', isCompress: false});

@Injectable()
export class LocalStorageService {

  constructor() {
  }

  /**
   * set item in the localStorage
   * @param {string} key
   * @param data
   * @return {boolean}
   */
  setData(key: string, data: any) {
    if ( typeof data === 'object') {
      data = JSON.stringify(data);
    } else if (typeof data !== 'string') {
      data = data.toString();
    }

    // window.localStorage.setItem(key, data);

    ls.set(key, data);
  }

  /**
   * get item from the localStorage
   * @param key
   * @return {(string | null) & null}
   */
  getData(key) {
    // return window.localStorage.getItem(key) || null;
    return ls.get(key) || null;
  }

  clearAll() {
    // window.localStorage.clear();
    ls.removeAll();
  }
}
