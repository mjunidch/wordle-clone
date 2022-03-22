import { GuessRow } from '../game-row/game-row.model';
import { GameSettings } from '../game-settings/game-settings.model';
import { LetterState } from '../game-tile/guess-tile.model';
import { GlobalConstants } from './../../constants/global-constants.model';
import { DateUtils, UnitOfTime } from './../../utils/date.utils';
export class GameBoard {
  private _gameStartTime!: Date;
  private _gameEndTime!: Date;

  constructor(
    public gameStarted: boolean = false,
    public guesses: GuessRow[] = [],
    public gameStatus: GameStatus = GameStatus.IN_PROGRESS,
    public solutionWord: string = '',
    public rowIndex: number = 0,
    public tileIndex: number = 0,
    public letterCounts: { [letter: string]: number } = {},
    public keyBoardStates: { [key: string]: LetterState } = {},
    private _currentTime: Date = new Date()
  ) {
    this.gameStartTime = DateUtils.clone(_currentTime);
    this.gameEndTime = DateUtils.clone(_currentTime);
  }

  public get gameStartTime(): Date {
    return this._gameStartTime;
  }

  public set gameStartTime(value: Date) {
    this._gameStartTime = GameBoard.getGameStartTime(DateUtils.clone(value));
  }

  public get gameEndTime(): Date {
    return this._gameEndTime;
  }

  public set gameEndTime(value: Date) {
    let gameIntervalUnit = GameSettings.getGameIntervalUnit();
    let gameIntervalOffset = GameSettings.getGameIntervalOffset();

    value = GameBoard.getGameStartTime(DateUtils.clone(value));

    if (gameIntervalOffset != null) {
      value = DateUtils.add(
        value,
        gameIntervalOffset,
        gameIntervalUnit as UnitOfTime.Duration
      );
    } else {
      value = DateUtils.endOf(value, gameIntervalUnit as UnitOfTime.StartOf);
    }

    this._gameEndTime = value;
  }

  public static getGameStartTime(value: Date) {
    let gameIntervalUnit = GameSettings.getGameIntervalUnit();

    let dateDiff = this.getDateDiff(value);

    // return GlobalConstants.TEMP_DATE.clone()
    //   .add(dateDiff, gameIntervalUnit as moment.unitOfTime.Diff)
    //   .startOf(gameIntervalUnit as moment.unitOfTime.StartOf);

    let cloneDate = DateUtils.clone(GlobalConstants.TEMP_DATE);
    cloneDate = DateUtils.add(
      cloneDate,
      dateDiff,
      gameIntervalUnit as UnitOfTime.Diff
    );
    cloneDate = DateUtils.startOf(
      cloneDate,
      gameIntervalUnit as UnitOfTime.StartOf
    );
    return cloneDate;
  }

  public static getDateDiff(value: Date) {
    let gameIntervalUnit = GameSettings.getGameIntervalUnit();
    let gameIntervalOffset = GameSettings.getGameIntervalOffset();

    // let diffWithTempDate: number = value.diff(
    //   GlobalConstants.TEMP_DATE,
    //   gameIntervalUnit as moment.unitOfTime.Diff
    // );

    let diffWithTempDate: number = DateUtils.diff(
      value,
      GlobalConstants.TEMP_DATE,
      gameIntervalUnit as UnitOfTime.Diff
    );

    let intervalOffsetDiff =
      gameIntervalOffset != null ? diffWithTempDate % gameIntervalOffset : 0;

    let dateDiff = diffWithTempDate - intervalOffsetDiff;

    return dateDiff;
  }
}

export enum GameStatus {
  IN_PROGRESS,
  WIN,
  FAIL,
}
