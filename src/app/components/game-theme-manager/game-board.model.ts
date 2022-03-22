import { GlobalConstants } from 'src/app/constants/global-constants.model';
import { GuessRow } from '../game-row/game-row.model';
import { LetterState } from '../game-tile/guess-tile.model';

export enum GameInterval {
  YEAR = 'year',
  MONTH = 'month',
  WEEK = 'week',
  DAY = 'day',
  HOUR = 'hour',
  MINUTES_5 = 'minute|5',
  MINUTES_2 = 'minute|2',
  MINUTE = 'minute',
  SECONDS_30 = 'second|30',
  SECOND = 'second',
}

export class DateUnitValue {
  public static map: any = {
    day: 24 * 60 * 60 * 1000,
    hour: 60 * 60 * 1000,
    minute: 60 * 1000,
    second: 1000,
  };
}

export class GameBoard {
  public static gameInterval: GameInterval = GameInterval.MINUTES_2;

  private _gameStartTime!: Date;
  private _gameEndTime!: Date;

  constructor(
    public guesses: GuessRow[] = [],
    public gameStatus: GameStatus = GameStatus.IN_PROGRESS,
    public solutionWord: string = '',
    public rowIndex: number = 0,
    public tileIndex: number = 0,
    public letterCounts: { [letter: string]: number } = {},
    public keyBoardStates: { [key: string]: LetterState } = {},
    private _currentTime: Date = new Date()
  ) {
    this.gameStartTime = new Date(_currentTime);
    this.gameEndTime = new Date(_currentTime);
  }

  public static getGameIntervalUnit(): string {
    let tempArr: string[] = this.gameInterval.split('|');
    return tempArr[0];
  }

  public static getGameIntervalUnitValue(): number {
    let unit = this.getGameIntervalUnit();
    return DateUnitValue.map[unit] as number;
  }

  public static getGameIntervalOffset(): number | null {
    let tempArr: string[] = this.gameInterval.split('|');
    return tempArr.length > 1 && tempArr[1] != null
      ? parseInt(tempArr[1])
      : null;
  }

  public get gameStartTime(): Date {
    return this._gameStartTime;
  }

  public set gameStartTime(value: Date) {
    this._gameStartTime = GameBoard.getGameStartTime(new Date(value));
  }

  public get gameEndTime(): Date {
    return this._gameEndTime;
  }

  public set gameEndTime(value: Date) {
    let gameIntervalUnit = GameBoard.getGameIntervalUnit();
    let gameIntervalOffset = GameBoard.getGameIntervalOffset();

    value = GameBoard.getGameStartTime(new Date(value));

    let cloneDate = new Date(value);
    if (gameIntervalOffset != null) {
      // value = value.add(
      //   gameIntervalOffset,
      //   gameIntervalUnit as moment.DurationInputArg2
      // );
      if (gameIntervalUnit == GameInterval.DAY) {
        cloneDate.setDate(cloneDate.getDate() + gameIntervalOffset);
      } else if (gameIntervalUnit == GameInterval.HOUR) {
        cloneDate.setHours(cloneDate.getHours() + gameIntervalOffset);
      } else if (gameIntervalUnit == GameInterval.MINUTE) {
        cloneDate.setMinutes(cloneDate.getMinutes() + gameIntervalOffset);
      } else if (gameIntervalUnit == GameInterval.SECOND) {
        cloneDate.setSeconds(cloneDate.getSeconds() + gameIntervalOffset);
      }
    } else {
      // value = value.endOf(gameIntervalUnit as moment.unitOfTime.StartOf);
      if (gameIntervalUnit == GameInterval.DAY) {
        cloneDate.setUTCHours(23, 59, 59, 999);
      } else if (gameIntervalUnit == GameInterval.HOUR) {
        cloneDate.setUTCHours(cloneDate.getUTCHours(), 59, 59, 999);
      } else if (gameIntervalUnit == GameInterval.MINUTE) {
        cloneDate.setUTCHours(
          cloneDate.getUTCHours(),
          cloneDate.getUTCMinutes(),
          59,
          999
        );
      } else if (gameIntervalUnit == GameInterval.SECOND) {
        cloneDate.setUTCHours(
          cloneDate.getUTCHours(),
          cloneDate.getUTCMinutes(),
          cloneDate.getUTCSeconds(),
          999
        );
      }
    }

    this._gameEndTime = cloneDate;
  }

  public static getGameStartTime(value: Date) {
    let gameIntervalUnit = GameBoard.getGameIntervalUnit();

    let dateDiff = GameBoard.getDateDiff(value);

    let cloneDate = new Date(GlobalConstants.TEMP_DATE);
    if (gameIntervalUnit == GameInterval.DAY) {
      cloneDate.setDate(cloneDate.getDate() + dateDiff);
    } else if (gameIntervalUnit == GameInterval.HOUR) {
      cloneDate.setHours(cloneDate.getHours() + dateDiff);
    } else if (gameIntervalUnit == GameInterval.MINUTE) {
      cloneDate.setMinutes(cloneDate.getMinutes() + dateDiff);
    } else if (gameIntervalUnit == GameInterval.SECOND) {
      cloneDate.setSeconds(cloneDate.getSeconds() + dateDiff);
    }

    if (gameIntervalUnit == GameInterval.DAY) {
      cloneDate.setUTCHours(0, 0, 0, 0);
    } else if (gameIntervalUnit == GameInterval.HOUR) {
      cloneDate.setUTCHours(cloneDate.getUTCHours(), 0, 0, 0);
    } else if (gameIntervalUnit == GameInterval.MINUTE) {
      cloneDate.setUTCHours(
        cloneDate.getUTCHours(),
        cloneDate.getUTCMinutes(),
        0,
        0
      );
    } else if (gameIntervalUnit == GameInterval.SECOND) {
      cloneDate.setUTCHours(
        cloneDate.getUTCHours(),
        cloneDate.getUTCMinutes(),
        cloneDate.getUTCSeconds(),
        0
      );
    }

    return cloneDate;
  }

  public static getDateDiff(value: Date) {
    let gameIntervalUnit = GameBoard.getGameIntervalUnit();
    let gameIntervalUnitValue = GameBoard.getGameIntervalUnitValue();
    let gameIntervalOffset = GameBoard.getGameIntervalOffset();

    let diffWithTempDate: number =
      (value.getTime() - GlobalConstants.TEMP_DATE.getTime()) /
      gameIntervalUnitValue;

    // let diffWithTempDate: number = value.diff(
    //   GlobalConstants.TEMP_DATE,
    //   gameIntervalUnit as moment.unitOfTime.Diff
    // );

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
