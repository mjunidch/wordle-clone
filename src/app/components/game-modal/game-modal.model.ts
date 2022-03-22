export class GameModalDomain {
  public id!: string;
  public element!: HTMLElement;
  protected _modalState: string = 'close';
  public isClosing: boolean = false;

  constructor() {}

  // @HostBinding('class')
  public get modalState(): string {
    return this._modalState;
  }

  public set modalState(value: string) {
    this._modalState = value;
  }

  // open modal
  open(): void {
    this.modalState = 'open';
  }

  // close modal
  close(): void {
    this.modalState = 'close';
  }

  remove() {
    this.element.remove();
  }
}
