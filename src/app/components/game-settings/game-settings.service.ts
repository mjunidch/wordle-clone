import { Injectable } from '@angular/core';
import { LocalStorageService } from './../../services/local-storage.service';
import { GameSettings } from './game-settings.model';

@Injectable({
  providedIn: 'root',
})
export class GameSettingsService {
  public gameSettings!: GameSettings;
  public isDarkMode?: boolean;

  public modalState: string = 'close';

  constructor(private localStorageService: LocalStorageService) {
    this.getGameSettingsData();
    this.getIsDarkModeData();
  }

  private getOrSetGameSettingsData(
    value: GameSettings,
    isSet: boolean = false
  ) {
    this.gameSettings = this.localStorageService.getValue(
      'gameSettings',
      value,
      GameSettings,
      isSet
    );
  }
  public getGameSettingsData(value: GameSettings = new GameSettings()) {
    return this.getOrSetGameSettingsData(value);
  }
  public setGameSettingsData(value: GameSettings = this.gameSettings) {
    return this.getOrSetGameSettingsData(value, true);
  }

  private getOrSetIsDarkModeData(value: any, isSet: boolean = false) {
    this.isDarkMode = this.localStorageService.getValue(
      'isDarkMode',
      value,
      Boolean,
      isSet
    );
  }
  public getIsDarkModeData(value?: any) {
    return this.getOrSetIsDarkModeData(value);
  }
  public setIsDarkModeData(value: any = this.isDarkMode) {
    return this.getOrSetIsDarkModeData(value, true);
  }

  public openSettings(): void {
    this.modalState = 'open';
  }

  public closeSettings(): void {
    this.modalState = 'close';
  }
}
