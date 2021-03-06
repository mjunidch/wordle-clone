import { Component, Input, OnInit, ViewEncapsulation } from '@angular/core';
import { GameBoard, GameStatus } from '../game-theme-manager/game-board.model';
import { LetterState } from '../game-tile/guess-tile.model';
import { ToastDuration, ToastLogLevel } from '../game-toast/game-toast.model';
import { GameToastService } from '../game-toast/game-toast.service';
import { GameStat } from './game-stat.model';

@Component({
  selector: 'game-stat',
  templateUrl: './game-stat.component.html',
  styleUrls: ['./game-stat.component.scss'],
  encapsulation: ViewEncapsulation.ShadowDom,
})
export class GameStatComponent implements OnInit {
  @Input() public gameStat!: GameStat;
  @Input() public gameBoard!: GameBoard;

  readonly GameStatus = GameStatus;

  constructor(private gameToastService: GameToastService) {}

  ngOnInit(): void {}

  handleClickShare() {
    // 🟩🟨⬜
    // Copy results into clipboard.
    let clipboardContent = '';
    for (let i = 0; i < this.gameBoard.guesses.length; i++) {
      const guess = this.gameBoard.guesses[i];
      for (let j = 0; j < guess.tiles.length; j++) {
        const tile = guess.tiles[j];
        switch (tile.state) {
          case LetterState.CORRECT:
            clipboardContent += '🟩';
            break;
          case LetterState.PRESENT:
            clipboardContent += '🟨';
            break;
          case LetterState.ABSENT:
            clipboardContent += '⬜';
            break;
          default:
            break;
        }
      }
      clipboardContent += '\n';
    }
    console.log(clipboardContent);
    navigator.clipboard.writeText(clipboardContent);
    this.showToast('Copied results to clipboard');
  }

  private showToast(
    text: string,
    duration?: ToastDuration,
    logLevel?: ToastLogLevel
  ) {
    this.gameToastService.addSystemToast(text, duration, logLevel);
  }
}
