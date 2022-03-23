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
    this.onDarkModeChanges();
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

  public onDarkModeChanges(): void {
    document.body.classList.toggle('nightmode', this.gameSettings.isDarkMode);
    this.setGameSettingsData();
  }

  public onHighContrastModeChanges(): void {
    document.body.classList.toggle(
      'colorblind',
      this.gameSettings.isHighContrastMode
    );
    this.setGameSettingsData();
  }

  public setGameSettingsData() {
    this.gameSettingsService.setGameSettingsData();
  }

  private showToast(
    text: string,
    duration?: ToastDuration,
    logLevel?: ToastLogLevel
  ) {
    this.gameToastService.addSystemToast(text, duration, logLevel);
  }
}
