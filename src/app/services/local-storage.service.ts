import { Injectable } from '@angular/core';
import { instanceToPlain, plainToInstance } from 'class-transformer';

@Injectable({
  providedIn: 'root',
})
export class LocalStorageService {
  constructor() {}

  public setItem(key: string, data: string): void {
    localStorage.setItem(key, data);
  }

  public getItem(key: string): string | null {
    return localStorage.getItem(key);
  }

  public removeItem(key: string) {
    localStorage.removeItem(key);
  }

  public clear(): void {
    localStorage.clear();
  }

  public getValue<T>(
    key: string,
    value: T,
    type: { new (): T },
    isSet: boolean = false
  ): T {
    if (isSet) {
      return this.setValue(key, value);
    }

    let existingDataAsString = this.getItem(key);
    if (existingDataAsString != null) {
      try {
        let existingData: T = JSON.parse(existingDataAsString);
        return plainToInstance(type, existingData, {});
      } catch (error) {
        console.error('Unable to parse local storage data', error);
      }
    } else {
      return this.setValue(key, value);
    }
    return value;
  }

  public setValue<T>(key: string, value: T): T {
    let tempValue = instanceToPlain(value, {});
    try {
      let dataAsString: string = JSON.stringify(tempValue);
      this.setItem(key, dataAsString);
    } catch (error) {
      console.error('Unable to stringify data for local storage', error);
    }
    return value;
  }
}
