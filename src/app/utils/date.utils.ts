export class DateUtils {
  public static MS_PER_SECOND = 1000;
  public static MS_PER_MINUTE = 60 * this.MS_PER_SECOND;
  public static MS_PER_HOUR = 60 * this.MS_PER_MINUTE;
  public static MS_PER_DAY = 24 * this.MS_PER_HOUR;

  public static clone(date: Date): Date {
    return new Date(date);
  }

  public static getDuration(diffInMs: number): Duration {
    let delta = parseInt(diffInMs.toString());

    let days = Math.floor(delta / this.MS_PER_DAY);
    delta -= days * this.MS_PER_DAY;

    let hours = Math.floor(delta / this.MS_PER_HOUR) % 24;
    delta -= hours * this.MS_PER_HOUR;

    let minutes = Math.floor(delta / this.MS_PER_MINUTE) % 60;
    delta -= minutes * this.MS_PER_MINUTE;

    let seconds = Math.floor(delta / this.MS_PER_SECOND) % 60;
    delta -= seconds * this.MS_PER_SECOND;

    let milliseconds = delta;

    return {
      days,
      hours,
      minutes,
      seconds,
      milliseconds,
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
      result = diffInMs / this.MS_PER_DAY;
    } else if (unit == 'hours' || unit == 'hour' || unit == 'h') {
      result = diffInMs / this.MS_PER_HOUR;
    } else if (unit == 'minutes' || unit == 'minute' || unit == 'm') {
      result = diffInMs / this.MS_PER_MINUTE;
    } else if (unit == 'seconds' || unit == 'second' || unit == 's') {
      result = diffInMs / this.MS_PER_SECOND;
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
    if (unit == 'years' || unit == 'year' || unit == 'y') {
      cloneDate.setMonth(1 - 1);
      cloneDate.setDate(1);
      cloneDate.setHours(0, 0, 0, 0);
    } else if (unit == 'months' || unit == 'month' || unit == 'M') {
      cloneDate.setDate(1);
      cloneDate.setHours(0, 0, 0, 0);
    }
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
    if (unit == 'years' || unit == 'year' || unit == 'y') {
      cloneDate.setMonth(12 - 1);
      cloneDate.setDate(31);
      cloneDate.setHours(23, 59, 59, 999);
    } else if (unit == 'months' || unit == 'month' || unit == 'M') {
      cloneDate.setMonth(cloneDate.getMonth() + 1);
      cloneDate.setDate(0);
      cloneDate.setHours(23, 59, 59, 999);
    }
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
    if (unit == 'years' || unit == 'year' || unit == 'y') {
      cloneDate.setFullYear(cloneDate.getFullYear() + offsetWithDirection);
    } else if (unit == 'months' || unit == 'month' || unit == 'M') {
      cloneDate.setMonth(cloneDate.getMonth() + offsetWithDirection);
    } else if (unit == 'weeks' || unit == 'week' || unit == 'w') {
      cloneDate.setDate(cloneDate.getDate() + offsetWithDirection * 7);
    } else if (unit == 'days' || unit == 'day' || unit == 'd') {
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
