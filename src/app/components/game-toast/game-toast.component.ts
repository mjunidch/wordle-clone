import {
  Component,
  Input,
  OnDestroy,
  OnInit,
  ViewEncapsulation,
} from '@angular/core';
import { GameToast, ToastLogLevel, ToastType } from './game-toast.model';

@Component({
  selector: 'game-toast',
  templateUrl: './game-toast.component.html',
  styleUrls: ['./game-toast.component.scss'],
  encapsulation: ViewEncapsulation.ShadowDom,
})
export class GameToastComponent implements OnInit, OnDestroy {
  @Input() public toast!: GameToast;

  @Input() public type!: ToastType;

  readonly ToastLogLevel = ToastLogLevel;

  constructor() {}

  ngOnInit(): void {}

  ngOnDestroy(): void {}
}
