import { Injectable } from '@angular/core';
import { GameSettings } from './game-settings.model';

@Injectable({
  providedIn: 'root',
})
export class GameSettingsService {
  public gameSettings: GameSettings = new GameSettings();

  public modalState: string = 'close';

  constructor() {}

  public openSettings(): void {
    this.modalState = 'open';
  }

  public closeSettings(): void {
    this.modalState = 'close';
  }
}
