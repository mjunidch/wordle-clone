import {
  AfterViewInit,
  Component,
  ElementRef,
  HostBinding,
  Input,
  OnInit,
  ViewEncapsulation,
} from '@angular/core';
import { GlobalConstants } from './../../constants/global-constants.model';
import { GuessRow, RowAnimationState } from './game-row.model';

@Component({
  selector: 'game-row',
  templateUrl: './game-row.component.html',
  styleUrls: ['./game-row.component.scss'],
  encapsulation: ViewEncapsulation.ShadowDom,
})
export class GameRowComponent implements OnInit, AfterViewInit {
  @Input() data!: GuessRow;

  @HostBinding('attr.data-animation')
  public get animation(): RowAnimationState {
    return this.data.animation;
  }

  @HostBinding('attr.letters')
  public get letters(): string {
    return this.data.letters;
  }

  constructor(private elementRef: ElementRef) {}

  ngOnInit(): void {}

  ngAfterViewInit(): void {
    const ne = this.elementRef.nativeElement;
    ne.style.setProperty('--tile-count', GlobalConstants.TILE_COUNT);
    ne.style.setProperty(
      '--shake-animation-duration',
      GlobalConstants.AnimationDuration.SHAKE
    );
    ne.style.setProperty(
      '--bounce-animation-duration',
      GlobalConstants.AnimationDuration.BOUNCE
    );
  }
}
