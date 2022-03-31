import { Component, Input, OnInit, ViewEncapsulation } from '@angular/core';
import { GameBoard, GameStatus } from '../game-theme-manager/game-board.model';
import { ToastDuration, ToastLogLevel } from '../game-toast/game-toast.model';
import { GameToastService } from '../game-toast/game-toast.service';
import { GameSettings } from './game-settings.model';
import { GameSettingsService } from './game-settings.service';

@Component({
  selector: 'game-settings',
  templateUrl: './game-settings.component.html',
  styleUrls: ['./game-settings.component.scss'],
  encapsulation: ViewEncapsulation.ShadowDom,
})
export class GameSettingsComponent implements OnInit {
  public gameSettings: GameSettings;

  @Input() public gameBoard!: GameBoard;

  readonly GameStatus = GameStatus;

  constructor(
    public gameSettingsService: GameSettingsService,
    public gameToastService: GameToastService
  ) {
    this.gameSettings = this.gameSettingsService.gameSettings;
    this.updateDarkModeAndPrefersColorSchemeHandler();
    this.onHighContrastModeChanges();
  }

  ngOnInit(): void {}

  public onHardModeClick(): void {
    if (
      !this.gameSettings.isHardMode &&
      this.gameBoard.gameStatus === GameStatus.IN_PROGRESS &&
      this.gameBoard.rowIndex != null &&
      this.gameBoard.rowIndex > 0
    ) {
      this.showToast('Hard Mode can only be enabled at the start of a round');
      return;
    }
    this.setGameSettingsData();
  }

  public onDarkModeChanges(updateLocalStorage: boolean = true): void {
    document.body.classList.toggle(
      'night-mode',
      this.gameSettingsService.isDarkMode
    );
    document.body.classList.toggle(
      'light-mode',
      !this.gameSettingsService.isDarkMode
    );
    if (updateLocalStorage) {
      this.setIsDarkModeData();
    }
  }

  public onHighContrastModeChanges(): void {
    document.body.classList.toggle(
      'colorblind',
      this.gameSettings.isHighContrastMode
    );
    this.setGameSettingsData();
  }

  private updateDarkModeAndPrefersColorSchemeHandler() {
    const media = window.matchMedia('(prefers-color-scheme: dark)');
    if (this.gameSettingsService.isDarkMode == null) {
      this.isDarkColorScheme(media);
    } else {
      this.onDarkModeChanges(false);
    }

    if ('addEventListener' in media) {
      // Chrome & Firefox
      media.addEventListener('change', (ev) => {
        this.isDarkColorScheme(ev);
      });
    } else if ('addListener' in media) {
      // Safari
      media.addListener((ev) => {
        this.isDarkColorScheme(ev);
      });
    }
  }

  private isDarkColorScheme(
    media: MediaQueryListEvent | MediaQueryList,
    updateLocalStorage: boolean = true
  ): void {
    const isDarkScheme = media.matches;
    const canUpdateProperty =
      this.gameSettingsService.isDarkMode != null &&
      this.gameSettingsService.isDarkMode != isDarkScheme;
    this.gameSettingsService.isDarkMode = isDarkScheme;
    if (canUpdateProperty) {
      this.onDarkModeChanges(updateLocalStorage);
    }
  }

  public setGameSettingsData() {
    this.gameSettingsService.setGameSettingsData();
  }

  public setIsDarkModeData() {
    this.gameSettingsService.setIsDarkModeData();
  }

  private showToast(
    text: string,
    duration?: ToastDuration,
    logLevel?: ToastLogLevel
  ) {
    this.gameToastService.addSystemToast(text, duration, logLevel);
  }
}
