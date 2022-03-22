import { GlobalConstants } from './../../constants/global-constants.model';

export class GameStat {
  constructor(
    public played: number = 0,
    public totalWin: number = 0,
    public currentStreak: number = 0,
    public maxStreak: number = 0,
    public gameDistribution: { [key: number]: number } = {}
  ) {
    for (let index = 0; index < GlobalConstants.GUESS_COUNT; index++) {
      this.gameDistribution[index + 1] = 0;
    }
  }

  public get winPercentage(): number {
    if (
      this.played == null ||
      this.played == 0 ||
      this.totalWin == null ||
      this.totalWin == 0
    ) {
      return 0;
    }
    return (this.totalWin / this.played) * 100;
  }

  public processWin(rowIndex: number): void {
    this.played++;
    this.totalWin++;
    this.currentStreak++;
    if (this.maxStreak < this.currentStreak) {
      this.maxStreak = this.currentStreak.valueOf();
    }
    this.gameDistribution[rowIndex + 1]++;
  }

  public processFail(): void {
    this.played++;
    this.currentStreak = 0;
  }
}
