export enum GameInterval {
  YEAR = 'year',
  MONTH = 'month',
  WEEK = 'week',
  DAY = 'day',
  HOUR = 'hour',
  MINUTES_10 = 'minute|10',
  MINUTES_5 = 'minute|5',
  MINUTES_2 = 'minute|2',
  MINUTE = 'minute',
  SECONDS_30 = 'second|30',
  SECOND = 'second',
}

export class GameSettings {
  public static gameInterval: GameInterval = GameInterval.MINUTES_10;

  constructor(
    public isHardMode: boolean = false,
    public isDarkMode: boolean = true,
    public isHighContrastMode: boolean = false
  ) {}

  public static getGameIntervalUnit(): string {
    let tempArr: string[] = this.gameInterval.split('|');
    return tempArr[0];
  }

  public static getGameIntervalOffset(): number | null {
    let tempArr: string[] = this.gameInterval.split('|');
    return tempArr.length > 1 && tempArr[1] != null
      ? parseInt(tempArr[1])
      : null;
  }
}
