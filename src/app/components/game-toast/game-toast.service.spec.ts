import { TestBed } from '@angular/core/testing';

import { GameToastService } from './game-toast.service';

describe('GameToastService', () => {
  let service: GameToastService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GameToastService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
