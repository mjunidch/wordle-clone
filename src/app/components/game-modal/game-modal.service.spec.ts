import { TestBed } from '@angular/core/testing';

import { GameModalService } from './game-modal.service';

describe('GameModalService', () => {
  let service: GameModalService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GameModalService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
