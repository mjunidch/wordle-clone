export class DateUtils {
  public static clone(date: Date): Date {
    return new Date(date);
  }
  public static getDuration(diffInMs: number): Duration {
    let delta = diffInMs / 1000;

    let days = Math.floor(delta / 86400);
    delta -= days * 86400;

    let hours = Math.floor(delta / 3600) % 24;
    delta -= hours * 3600;

    let minutes = Math.floor(delta / 60) % 60;
    delta -= minutes * 60;

    let seconds = delta % 60;
    return {
      days,
      hours,
      minutes,
      seconds,
      milliseconds: 0,
    };
  }

  public static diff(
    date1: Date,
    date2: Date,
    unit: UnitOfTime.Diff = 'milliseconds'
  ): number {
    let diffInMs = date1.getTime() - date2.getTime();
    let result = null;
    if (unit == 'days' || unit == 'day' || unit == 'd') {
      result = diffInMs / (24 * 60 * 60 * 1000);
    } else if (unit == 'hours' || unit == 'hour' || unit == 'h') {
      result = diffInMs / (60 * 60 * 1000);
    } else if (unit == 'minutes' || unit == 'minute' || unit == 'm') {
      result = diffInMs / (60 * 1000);
    } else if (unit == 'seconds' || unit == 'second' || unit == 's') {
      result = diffInMs / 1000;
    } else if (
      unit == 'milliseconds' ||
      unit == 'millisecond' ||
      unit == 'ms'
    ) {
      result = diffInMs;
    }
    return result || 0;
  }

  public static startOf(date: Date, unit: UnitOfTime.StartOf = 'day'): Date {
    let cloneDate = this.clone(date);
    if (unit == 'days' || unit == 'day' || unit == 'd') {
      cloneDate.setHours(0, 0, 0, 0);
    } else if (unit == 'hours' || unit == 'hour' || unit == 'h') {
      cloneDate.setMinutes(0, 0, 0);
    } else if (unit == 'minutes' || unit == 'minute' || unit == 'm') {
      cloneDate.setSeconds(0, 0);
    } else if (unit == 'seconds' || unit == 'second' || unit == 's') {
      cloneDate.setMilliseconds(0);
    }
    return cloneDate;
  }

  public static endOf(date: Date, unit: UnitOfTime.StartOf = 'day'): Date {
    let cloneDate = this.clone(date);
    if (unit == 'days' || unit == 'day' || unit == 'd') {
      cloneDate.setHours(23, 59, 59, 999);
    } else if (unit == 'hours' || unit == 'hour' || unit == 'h') {
      cloneDate.setMinutes(59, 59, 999);
    } else if (unit == 'minutes' || unit == 'minute' || unit == 'm') {
      cloneDate.setSeconds(59, 999);
    } else if (unit == 'seconds' || unit == 'second' || unit == 's') {
      cloneDate.setMilliseconds(999);
    }
    return cloneDate;
  }

  public static add(
    date: Date,
    offset: number,
    unit: UnitOfTime.Duration = 'day'
  ): Date {
    return this.addSubtract(date, offset, unit, 1);
  }

  public static subtract(
    date: Date,
    offset: number,
    unit: UnitOfTime.Duration = 'day'
  ): Date {
    return this.addSubtract(date, offset, unit, -1);
  }

  private static addSubtract(
    date: Date,
    offset: number,
    unit: UnitOfTime.Duration = 'day',
    direction: 1 | -1 = 1
  ): Date {
    let cloneDate = this.clone(date);
    let offsetWithDirection = offset * direction;
    if (unit == 'days' || unit == 'day' || unit == 'd') {
      cloneDate.setDate(cloneDate.getDate() + offsetWithDirection);
    } else if (unit == 'hours' || unit == 'hour' || unit == 'h') {
      cloneDate.setHours(cloneDate.getHours() + offsetWithDirection);
    } else if (unit == 'minutes' || unit == 'minute' || unit == 'm') {
      cloneDate.setMinutes(cloneDate.getMinutes() + offsetWithDirection);
    } else if (unit == 'seconds' || unit == 'second' || unit == 's') {
      cloneDate.setSeconds(cloneDate.getSeconds() + offsetWithDirection);
    } else if (
      unit == 'milliseconds' ||
      unit == 'millisecond' ||
      unit == 'ms'
    ) {
      cloneDate.setMilliseconds(
        cloneDate.getMilliseconds() + offsetWithDirection
      );
    }
    return cloneDate;
  }
}

export interface Duration {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
  milliseconds: number;
}

export module UnitOfTime {
  type Base =
    | 'year'
    | 'years'
    | 'y'
    | 'month'
    | 'months'
    | 'M'
    | 'week'
    | 'weeks'
    | 'w'
    | 'day'
    | 'days'
    | 'd'
    | 'hour'
    | 'hours'
    | 'h'
    | 'minute'
    | 'minutes'
    | 'm'
    | 'second'
    | 'seconds'
    | 's'
    | 'millisecond'
    | 'milliseconds'
    | 'ms';

  export type StartOf = Base;
  export type Diff = Base;
  export type Duration = Base;
}
