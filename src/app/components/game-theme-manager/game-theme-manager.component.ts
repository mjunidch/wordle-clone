import { DatePipe } from '@angular/common';
import {
  AfterViewInit,
  Component,
  ElementRef,
  HostListener,
  OnDestroy,
  OnInit,
} from '@angular/core';
import { interval, Subscription } from 'rxjs';
import { GuessRow } from '../game-row/game-row.model';
import { GameSettingsService } from '../game-settings/game-settings.service';
import { GameStat } from '../game-stat/game-stat.model';
import {
  GuessTile,
  LetterState,
  TileAnimationState,
} from '../game-tile/guess-tile.model';
import { ToastDuration, ToastLogLevel } from '../game-toast/game-toast.model';
import { GameToastService } from '../game-toast/game-toast.service';
import { GlobalConstants } from './../../constants/global-constants.model';
import { WordleService } from './../../services/wordle.service';
import { GameModalService } from './../game-modal/game-modal.service';
import { GameBoard, GameStatus } from './game-board.model';

@Component({
  selector: 'game-theme-manager',
  templateUrl: './game-theme-manager.component.html',
  styleUrls: ['./game-theme-manager.component.scss'],
})
export class GameThemeManagerComponent
  implements OnInit, AfterViewInit, OnDestroy
{
  public gameBoard!: GameBoard;

  public gameStat!: GameStat;

  private WORDS!: string[];

  private subscriptionNewGame!: Subscription;

  constructor(
    private elementRef: ElementRef,
    public datePipe: DatePipe,
    private modalService: GameModalService,
    private wordleService: WordleService,
    public gameSettingsService: GameSettingsService,
    public gameToastService: GameToastService
  ) {
    this.gameStat = new GameStat();
    this.getWords();
  }

  ngOnInit(): void {}

  ngAfterViewInit(): void {
    const ne = this.elementRef.nativeElement;
    ne.style.setProperty('--guess-count', GlobalConstants.GUESS_COUNT);
  }

  ngOnDestroy(): void {
    this.unSubscribeNewGame();
  }

  @HostListener('document:keydown', ['$event'])
  handleKeyboardEvent(event: KeyboardEvent) {
    this.handleClickKey(event.key);
  }

  public createNewGame(): void {
    this.gameToastService.clearToasts();
    this.closeShare();

    this.gameBoard = new GameBoard();

    this.initializeGuesses();
    this.getNewWord();

    this.subscriptionNewGame = interval(5000).subscribe((x) => {
      // const index = this.getWordIndex();
      // const word = this.WORDS[index];
      // console.log(
      //   this.datePipe.transform(this.gameBoard.gameStartTime, 'HH:mm:ss a'),
      //   this.datePipe.transform(new Date(), 'HH:mm:ss a'),
      //   this.datePipe.transform(this.gameBoard.gameEndTime, 'HH:mm:ss a'),
      //   index,
      //   word
      // );
      if (new Date() > this.gameBoard.gameEndTime) {
        this.unSubscribeNewGame();
        this.createNewGame();
      }
    });
  }

  private unSubscribeNewGame() {
    if (this.subscriptionNewGame) {
      this.subscriptionNewGame.unsubscribe();
    }
  }

  public async handleClickKey(key: string) {
    if (this.gameBoard.gameStatus != GameStatus.IN_PROGRESS) {
      return;
    }
    this.gameBoard.gameStarted = true;
    if (this.isLetter(key)) {
      if (this.gameBoard.tileIndex < GlobalConstants.TILE_COUNT) {
        const curGuess = this.gameBoard.guesses[this.gameBoard.rowIndex];
        curGuess.letters += key;

        let curTile = new GuessTile(
          key,
          LetterState.HAS_DATA,
          TileAnimationState.POP
        );
        curGuess.tiles[this.gameBoard.tileIndex] = curTile;
        setTimeout(() => {
          curTile.animation = TileAnimationState.IDLE;
        }, GlobalConstants.AnimationDuration.POP_IN);

        this.gameBoard.tileIndex++;
      }
    } else if (key === 'Backspace') {
      if (this.gameBoard.tileIndex - 1 >= 0) {
        const curGuess = this.gameBoard.guesses[this.gameBoard.rowIndex];
        curGuess.letters = curGuess.letters.slice(0, -1);

        curGuess.tiles[--this.gameBoard.tileIndex] = new GuessTile();
      }
    } else if (key === 'Enter') {
      this.checkCurrentGuess();
    }
  }

  private async checkCurrentGuess() {
    const curGuess = this.gameBoard.guesses[this.gameBoard.rowIndex];
    if (curGuess.isSomeEmpty()) {
      this.showToast('Not enough letters');

      curGuess.shakeRow();
      return;
    }

    if (!this.WORDS.includes(curGuess.letters.toUpperCase())) {
      this.showToast('Not in word list');
      curGuess.shakeRow();
      return;
    }

    if (
      this.gameSettingsService.gameSettings.isHardMode &&
      this.gameBoard.rowIndex > 0
    ) {
      const prevGuess = this.gameBoard.guesses[this.gameBoard.rowIndex - 1];
      const validGuessLetters: GuessTile[] = prevGuess.tiles.filter(
        (tile) =>
          tile.state == LetterState.PRESENT || tile.state == LetterState.CORRECT
      );
      if (validGuessLetters.length > 0) {
        for (let validGuessLetter of validGuessLetters) {
          if (
            !curGuess.tiles.some(
              (tile) => tile.letter === validGuessLetter.letter
            )
          ) {
            this.showToast(
              `Guess must contain ${validGuessLetter.letter.toUpperCase()}`
            );
            curGuess.shakeRow();
            return;
          }
        }
      }
    }

    await curGuess.updateStateOnSubmit(this.gameBoard.solutionWord, {
      ...this.gameBoard.letterCounts,
    });

    if (curGuess.isFullyCorrect()) {
      this.gameStat.processWin(this.gameBoard.rowIndex);
      if (!this.gameBoard.gameStarted) return;

      this.gameBoard.gameStatus = GameStatus.WIN;
      this.showToast('NICE!', undefined, ToastLogLevel.SUCCESS);
      await curGuess.processWin();
      if (!this.gameBoard.gameStarted) return;

      await WordleService.wait(GlobalConstants.SHARE_POPUP_DELAY);
      if (!this.gameBoard.gameStarted) return;

      this.showShare();
    } else if (this.gameBoard.rowIndex === GlobalConstants.GUESS_COUNT - 1) {
      this.gameStat.processFail();
      if (!this.gameBoard.gameStarted) return;

      this.gameBoard.gameStatus = GameStatus.FAIL;
      this.showToast(
        this.gameBoard.solutionWord.toUpperCase(),
        ToastDuration.INFINITY
      );
      await WordleService.wait(GlobalConstants.SHARE_POPUP_DELAY);
      if (!this.gameBoard.gameStarted) return;

      this.showShare();
    } else {
      this.gameBoard.rowIndex++;
      this.gameBoard.tileIndex = 0;
    }

    this.updateKeyboardStates(curGuess);
  }

  private getWords(): void {
    this.wordleService.getWords(GlobalConstants.TILE_COUNT).subscribe({
      next: (words) => {
        this.WORDS = words;

        this.createNewGame();
      },
      error: (error) => {
        console.log('Error feching word list', error);
      },
    });
  }

  private getNewWord() {
    const index = this.getWordIndex();
    const word = this.WORDS[index];
    this.gameBoard.solutionWord = word.toLowerCase();
    console.log('Solution: ', this.gameBoard.solutionWord);
    for (const letter of this.gameBoard.solutionWord) {
      const count = this.gameBoard.letterCounts[letter];
      if (count == null) {
        this.gameBoard.letterCounts[letter] = 0;
      }
      this.gameBoard.letterCounts[letter]++;
    }
  }

  private getWordIndex(): number {
    let dateDiff = GameBoard.getDateDiff(new Date());

    let dateDiffRounded = Math.round(dateDiff);

    let index =
      (dateDiffRounded * (new Date().getDay() * new Date().getFullYear())) %
      this.WORDS.length;

    return index;
  }

  private initializeGuesses() {
    for (let i = 0; i < GlobalConstants.GUESS_COUNT; i++) {
      const guess: GuessTile[] = [];
      for (let j = 0; j < GlobalConstants.TILE_COUNT; j++) {
        guess.push(new GuessTile());
      }
      this.gameBoard.guesses.push(new GuessRow(guess));
    }
  }

  public updateKeyboardStates(curGuess: GuessRow) {
    const letterStateValues = Object.values(LetterState);
    for (let index = 0; index < curGuess.tiles.length; index++) {
      let tile = curGuess.tiles[index];
      const curLetter = tile.letter.toLowerCase();
      const curStoredKeyBoardState = this.gameBoard.keyBoardStates[curLetter];
      const targetState = tile.state;
      if (
        curStoredKeyBoardState == null ||
        letterStateValues.indexOf(targetState) >
          letterStateValues.indexOf(curStoredKeyBoardState)
      ) {
        this.gameBoard.keyBoardStates[curLetter] = targetState;
      }
    }
  }

  private isLetter = (str: string) => {
    return str != null && str.length === 1 && str.match(/[a-z]/i);
  };

  public openModal(id: string) {
    this.modalService.open(id);
  }

  public closeModal(id: string) {
    this.modalService.close(id);
  }

  public async showShare() {
    this.openModal('modal-statistics');
  }

  public async closeShare() {
    this.closeModal('modal-statistics');
  }

  private showToast(
    text: string,
    duration?: ToastDuration,
    logLevel?: ToastLogLevel
  ) {
    this.gameToastService.addGameToast(text, duration, logLevel);
  }
}
