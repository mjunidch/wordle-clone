import { Type } from 'class-transformer';
import { GuessTile } from '../game-tile/guess-tile.model';
import { GlobalConstants } from './../../constants/global-constants.model';

export class GuessRow {
  @Type(() => GuessTile)
  public tiles: GuessTile[];

  constructor(
    tiles: GuessTile[],
    public letters: string = '',
    public animation: RowAnimationState = RowAnimationState.IDLE
  ) {
    this.tiles = tiles;
  }

  public async updateStateOnSubmit(
    solutionWord: string,
    letterCounts: { [letter: string]: number }
  ) {
    for (let index = 0; index < this.tiles.length; index++) {
      let tile = this.tiles[index];
      await tile.updateStateOnSubmit(solutionWord, letterCounts, index);
    }
  }

  public processWin() {
    for (let index = 0; index < this.tiles.length; index++) {
      let tile = this.tiles[index];
      tile.processWin();
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
