import {
  Component,
  ElementRef,
  Input,
  OnDestroy,
  OnInit,
  ViewEncapsulation,
} from '@angular/core';
import { GameModalDomain } from './game-modal.model';
import { GameModalService } from './game-modal.service';

@Component({
  selector: 'game-modal',
  templateUrl: './game-modal.component.html',
  styleUrls: ['./game-modal.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class GameModalComponent
  extends GameModalDomain
  implements OnInit, OnDestroy
{
  @Input() public override id!: string;

  constructor(private modalService: GameModalService, private el: ElementRef) {
    super();
    this.element = el.nativeElement as HTMLElement;
  }

  ngOnInit(): void {
    // add self (this modal instance) to the modal service so it's accessible from controllers
    this.modalService.add(this);
  }

  // remove self from modal service when component is destroyed
  ngOnDestroy(): void {
    this.modalService.remove(this.id);
  }
}
