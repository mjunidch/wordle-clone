import { GlobalConstants } from './../../constants/global-constants.model';
import { WordleService } from './../../services/wordle.service';

export enum LetterState {
  EMPTY = 'empty',
  HAS_DATA = 'tbd',
  ABSENT = 'absent',
  PRESENT = 'present',
  CORRECT = 'correct',
}

export enum TileAnimationState {
  IDLE = 'idle',
  POP = 'pop',
  FLIP_IN = 'flip-in',
  FLIP_OUT = 'flip-out',
}

export class GuessTile {
  constructor(
    public letter: string = '',
    public state: LetterState = LetterState.EMPTY,
    public animation: TileAnimationState = TileAnimationState.IDLE,
    public classList: string[] = []
  ) {}

  public setData(letter: string, state: LetterState) {
    this.letter = letter;
    this.state = state;
  }

  public clearData() {
    this.letter = '';
    this.state = LetterState.EMPTY;
    this.animation = TileAnimationState.IDLE;
    this.classList = [];
  }

  public async updateStateOnSubmit(
    solutionWord: string,
    letterCounts: { [letter: string]: number },
    position: number
  ) {
    const expected = solutionWord[position];
    const curLetter = this.letter.toLowerCase();

    let state = LetterState.ABSENT;

    if (expected === curLetter && letterCounts[curLetter] > 0) {
      letterCounts[curLetter]--;
      state = LetterState.CORRECT;
    } else if (
      solutionWord.includes(curLetter) &&
      letterCounts[curLetter] > 0
    ) {
      letterCounts[curLetter]--;
      state = LetterState.PRESENT;
    }

    this.animation = TileAnimationState.FLIP_IN;
    await WordleService.wait(GlobalConstants.AnimationDuration.FLIP_IN);
    this.state = state;
    this.animation = TileAnimationState.FLIP_OUT;
    await WordleService.wait(GlobalConstants.AnimationDuration.FLIP_OUT);
    this.animation = TileAnimationState.IDLE;
    // setTimeout(() => {
    //   this.animation = TileAnimationState.FLIP_IN;
    //   setTimeout(() => {
    //     this.state = state;
    //     this.animation = TileAnimationState.FLIP_OUT;
    //     setTimeout(() => {
    //       this.animation = TileAnimationState.IDLE;
    //     }, GlobalConstants.AnimationDuration.FLIP_OUT);
    //   }, GlobalConstants.AnimationDuration.FLIP_IN);
    // }, (position * GlobalConstants.AnimationDuration.FLIP_IN) / 0.7);
  }

  public processWin() {
    this.classList.push('win');
  }

  public isEmpty() {
    return (
      this == null || this.state == null || this.state == LetterState.EMPTY
    );
  }

  public isCorrect() {
    return (
      this != null && this.state != null && this.state == LetterState.CORRECT
    );
  }
}
