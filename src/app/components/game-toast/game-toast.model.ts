export class GameToast {
  public id: number = Math.floor(Math.random() * 1000000000);
  public fadeToast: boolean = false;
  constructor(
    public text: string,
    public duration: ToastDuration = ToastDuration.MS_2000,
    public logLevel: ToastLogLevel = ToastLogLevel.INFO,
    public type: ToastType = ToastType.GAME
  ) {}
}

export enum ToastDuration {
  MS_2000 = 2000,
  INFINITY = -1,
}

export enum ToastType {
  GAME,
  SYSTEM,
}

export enum ToastLogLevel {
  INFO,
  WARNING,
  ERROR,
  SUCCESS,
}
