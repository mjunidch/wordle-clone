import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { WORDS } from '../constants/words';

@Injectable({
  providedIn: 'root',
})
export class WordleService {
  constructor() {}

  getWords(length: number): Observable<string[]> {
    return of(WORDS.filter((word) => word.length == length));
  }

  static async wait(ms: number, doWait: boolean = true) {
    await new Promise<void>((resolve) => {
      if (!doWait) {
        resolve();
      }
      setTimeout(() => {
        resolve();
      }, ms);
    });
  }
}
