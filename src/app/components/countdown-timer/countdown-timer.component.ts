import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { interval, Subscription } from 'rxjs';
import { DateUtils } from './../../utils/date.utils';

@Component({
  selector: 'countdown-timer',
  templateUrl: './countdown-timer.component.html',
  styleUrls: ['./countdown-timer.component.scss'],
})
export class CountdownTimerComponent implements OnInit, OnDestroy {
  @Input() public dDay!: Date;

  private subscription!: Subscription;

  public timeDifference!: number;
  public daysToDday!: number;
  public hoursToDday!: number;
  public minutesToDday!: number;
  public secondsToDday!: number;

  private getTimeDifference() {
    this.timeDifference = this.dDay.getTime() - new Date().getTime();
    this.allocateTimeUnits(this.timeDifference);
  }

  private allocateTimeUnits(timeDifference: number) {
    if (timeDifference <= 0) {
      this.daysToDday = 0;
      this.hoursToDday = 0;
      this.minutesToDday = 0;
      this.secondsToDday = 0;
      return;
    }

    const tempTime = DateUtils.getDuration(timeDifference);

    this.daysToDday = tempTime.days;
    this.hoursToDday = tempTime.hours;
    this.minutesToDday = tempTime.minutes;
    this.secondsToDday = tempTime.seconds;
  }

  constructor() {}

  ngOnInit(): void {
    this.subscription = interval(1000).subscribe((x) => {
      this.getTimeDifference();
    });
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
