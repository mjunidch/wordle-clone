import {
  AfterViewInit,
  Component,
  ElementRef,
  Input,
  OnInit,
  ViewEncapsulation,
} from '@angular/core';
import { GlobalConstants } from './../../constants/global-constants.model';
import { GuessTile } from './guess-tile.model';

@Component({
  selector: 'game-tile',
  templateUrl: './game-tile.component.html',
  styleUrls: ['./game-tile.component.scss'],
  encapsulation: ViewEncapsulation.ShadowDom,
})
export class GameTileComponent implements OnInit, AfterViewInit {
  @Input() tile!: GuessTile;

  constructor(private elementRef: ElementRef) {}

  ngOnInit(): void {}

  ngAfterViewInit(): void {
    const ne = this.elementRef.nativeElement;
    ne.style.setProperty(
      '--pop-in-animation-duration',
      GlobalConstants.AnimationDuration.POP_IN
    );
    ne.style.setProperty(
      '--flip-in-animation-duration',
      GlobalConstants.AnimationDuration.FLIP_IN
    );
    ne.style.setProperty(
      '--flip-out-animation-duration',
      GlobalConstants.AnimationDuration.FLIP_OUT
    );
  }
}
