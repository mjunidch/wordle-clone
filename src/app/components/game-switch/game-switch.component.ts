import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'game-switch',
  templateUrl: './game-switch.component.html',
  styleUrls: ['./game-switch.component.scss'],
})
export class GameSwitchComponent implements OnInit {
  @Input() public inputSwitchValue: boolean = false;

  @Output() inputSwitchValueChange: EventEmitter<boolean> =
    new EventEmitter<boolean>();

  @Input() public disabled: boolean = false;

  public id: string = 'inputSwitch' + Math.floor(Math.random() * 1000000000);

  constructor() {}

  ngOnInit(): void {}

  // @HostListener('click', ['$event', '$event.target'])
  handleOnClickEvent(event: MouseEvent) {
    if (this.disabled) return;
    this.inputSwitchValueChange.emit(this.inputSwitchValue);
  }
}
