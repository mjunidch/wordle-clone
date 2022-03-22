import { Injectable } from '@angular/core';
import { GameModalDomain } from './game-modal.model';

@Injectable({
  providedIn: 'root',
})
export class GameModalService {
  private modals: GameModalDomain[] = [];

  constructor() {}

  add(modal: GameModalDomain) {
    if (!modal.id) {
      console.error('modal must have an id');
      return;
    }

    // move element to bottom of page (just before </body>) so it can be displayed above everything else
    document.body.appendChild(modal.element);

    // close modal on background click
    modal.element.addEventListener('click', (el: any) => {
      if (el.target.className === 'overlay') {
        this.close(modal.id);
      }
    });

    // add modal to array of active modals
    this.modals.push(modal);
  }

  remove(id: string) {
    const modal = this.modals.find((x) => x.id === id) as GameModalDomain;
    if (modal == null) {
      return;
    }
    modal.remove();
    // remove modal from array of active modals
    this.modals = this.modals.filter((x) => x.id !== id);
  }

  open(id: string) {
    // open modal specified by id
    const modal = this.modals.find((x) => x.id === id) as GameModalDomain;
    if (modal == null) {
      return;
    }
    modal.open();
  }

  close(id: string): void {
    // close modal specified by id
    const modal = this.modals.find((x) => x.id === id) as GameModalDomain;
    if (modal == null) {
      return;
    }
    modal.isClosing = true;
    setTimeout(() => {
      modal.close();
      modal.isClosing = false;
    }, 200);
  }
}
