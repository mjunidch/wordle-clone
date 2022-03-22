import { GuessTile } from '../game-tile/guess-tile.model';
import { GlobalConstants } from './../../constants/global-constants.model';
import { WordleService } from './../../services/wordle.service';

export class GuessRow {
  constructor(
    public tiles: GuessTile[],
    public letters: string = '',
    public animation: RowAnimationState = RowAnimationState.IDLE
  ) {}

  public async updateStateOnSubmit(
    solutionWord: string,
    letterCounts: { [letter: string]: number }
  ) {
    for (let index = 0; index < this.tiles.length; index++) {
      let tile = this.tiles[index];
      await tile.updateStateOnSubmit(solutionWord, letterCounts, index);
    }
  }

  public async processWin() {
    for (let index = 0; index < this.tiles.length; index++) {
      let tile = this.tiles[index];
      tile.processWin();
      await WordleService.wait(
        (GlobalConstants.AnimationDuration.BOUNCE /
          GlobalConstants.TILE_COUNT) *
          0.8
      );
    }
  }

  public isSomeEmpty() {
    return (
      this == null ||
      this.tiles == null ||
      this.tiles.some((tile: GuessTile) => tile.isEmpty())
    );
  }

  public isFullyCorrect() {
    return (
      this != null &&
      this.tiles != null &&
      this.tiles.every((tile: GuessTile) => tile.isCorrect())
    );
  }

  public shakeRow() {
    this.animation = RowAnimationState.SHAKE;
    setTimeout(() => {
      this.animation = RowAnimationState.IDLE;
    }, GlobalConstants.AnimationDuration.SHAKE);
  }
}

export enum RowAnimationState {
  IDLE = 'idle',
  SHAKE = 'shake',
  BOUNCE = 'bounce',
}
