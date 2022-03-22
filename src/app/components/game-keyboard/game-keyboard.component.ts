import {
  Component,
  EventEmitter,
  Input,
  OnInit,
  Output,
  ViewEncapsulation,
} from '@angular/core';
import { LetterState } from '../game-tile/guess-tile.model';

@Component({
  selector: 'game-keyboard',
  templateUrl: './game-keyboard.component.html',
  styleUrls: ['./game-keyboard.component.scss'],
  encapsulation: ViewEncapsulation.ShadowDom,
})
export class GameKeyboardComponent implements OnInit {
  @Output() keyChange: EventEmitter<string> = new EventEmitter<string>();

  @Input() public keyStates!: { [key: string]: LetterState };

  readonly keyboardRows = [
    ['q', 'w', 'e', 'r', 't', 'y', 'u', 'i', 'o', 'p'],
    [null, 'a', 's', 'd', 'f', 'g', 'h', 'j', 'k', 'l', null],
    ['Enter', 'z', 'x', 'c', 'v', 'b', 'n', 'm', 'Backspace'],
  ];

  constructor() {}

  ngOnInit(): void {}

  handleKeyboardEvent(key: string) {
    this.keyChange.emit(key);
  }
}
