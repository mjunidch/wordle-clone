import { Injectable } from '@angular/core';
import {
  GameToast,
  ToastDuration,
  ToastLogLevel,
  ToastType,
} from './game-toast.model';

@Injectable({
  providedIn: 'root',
})
export class GameToastService {
  private _gameToasts: GameToast[] = [];

  private _systemToasts: GameToast[] = [];

  constructor() {}

  public get gameToasts() {
    return this._gameToasts;
  }

  public get systemToasts() {
    return this._systemToasts;
  }

  public addGameToast(
    text: string,
    duration?: ToastDuration,
    logLevel?: ToastLogLevel
  ) {
    this.addToast(
      new GameToast(text, duration, logLevel, ToastType.GAME),
      this._gameToasts
    );
  }

  public addSystemToast(
    text: string,
    duration?: ToastDuration,
    logLevel?: ToastLogLevel
  ) {
    this.addToast(
      new GameToast(text, duration, logLevel, ToastType.SYSTEM),
      this._systemToasts
    );
  }

  public clearToasts(): void {
    this._gameToasts = [];
    this._systemToasts = [];
  }

  private addToast(toast: GameToast, toasts: GameToast[]) {
    toasts.unshift(toast);
    if (toast.duration != ToastDuration.INFINITY) {
      setTimeout(() => {
        toast.fadeToast = true;
      }, toast.duration - 300);
      setTimeout(() => {
        const index = toasts.findIndex((ts: GameToast) => ts.id == toast.id);
        if (index != -1) {
          toasts.splice(index, 1);
        }
      }, toast.duration);
    }
  }
}
